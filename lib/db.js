import { Pool } from 'pg'

// Pool PostgreSQL lazy (initialisé uniquement quand nécessaire)
let pool = null

/**
 * Obtient ou initialise le pool PostgreSQL
 * @returns {Pool} Pool PostgreSQL initialisé
 */
function getPool() {
  if (!pool) {
    // Vérifier DATABASE_URL avant d'initialiser
    if (!process.env.DATABASE_URL) {
      console.error("⚠️ DATABASE_URL manquant dans les variables d'environnement")
      throw new Error('DATABASE_URL manquant dans les variables d\'environnement')
    }
    
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 2,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000
    })
  }
  return pool
}

// Flag pour éviter les initialisations multiples
let initialized = false

/**
 * Initialise la base de données en créant la table si elle n'existe pas
 * @throws {Error} Si l'initialisation échoue
 */
export async function initDatabase() {
  if (initialized) {
    return
  }

  try {
    const dbPool = getPool()
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        postal_code VARCHAR(10) NOT NULL,
        emergency_type TEXT NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        confirmation_token TEXT UNIQUE NOT NULL,
        token_expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS plumbers (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) NOT NULL,
        pack_size INTEGER NOT NULL CHECK (pack_size IN (5, 10, 15, 20, 25, 30)),
        leads_received INTEGER NOT NULL DEFAULT 0,
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)
    
    // Ajouter les colonnes de notification à la table leads (idempotent)
    await dbPool.query(`
      ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS notification_status VARCHAR(30) DEFAULT 'pending'
    `)
    
    await dbPool.query(`
      ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS notification_attempts INTEGER DEFAULT 0
    `)
    
    await dbPool.query(`
      ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS notification_retry_at TIMESTAMP
    `)
    
    await dbPool.query(`
      ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS plumber_id INTEGER REFERENCES plumbers(id)
    `)
    
    initialized = true
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error)
    throw error
  }
}

/**
 * Crée un nouveau lead dans la base de données
 * @param {object} data - Données du lead
 * @param {string} data.phone - Numéro de téléphone
 * @param {string} data.postal_code - Code postal
 * @param {string} data.emergency_type - Type d'urgence
 * @param {string} data.confirmation_token - Token de confirmation
 * @param {string} data.token_expires_at - Date d'expiration (ISO string)
 * @returns {Promise<number>} ID du lead créé
 * @throws {Error} Si l'insertion échoue (ex: token dupliqué)
 */
export async function createLead({ phone, postal_code, emergency_type, confirmation_token, token_expires_at }) {
  try {
    const dbPool = getPool()
    const result = await dbPool.query(
      `INSERT INTO leads (phone, postal_code, emergency_type, status, confirmation_token, token_expires_at)
       VALUES ($1, $2, $3, 'pending', $4, $5)
       RETURNING id`,
      [phone, postal_code, emergency_type, confirmation_token, token_expires_at]
    )
    return result.rows[0].id
  } catch (error) {
    if (error.code === '23505') { // Violation de contrainte unique (token dupliqué)
      console.error('❌ Token de confirmation déjà existant:', confirmation_token)
    } else {
      console.error('❌ Erreur lors de la création du lead:', error)
    }
    throw error
  }
}

/**
 * Trouve un lead par son token de confirmation
 * @param {string} token - Token de confirmation
 * @returns {Promise<object|null>} Lead trouvé ou null
 * @throws {Error} Si la requête échoue
 */
export async function findLeadByToken(token) {
  try {
    const dbPool = getPool()
    const result = await dbPool.query(
      `SELECT * FROM leads WHERE confirmation_token = $1 LIMIT 1`,
      [token]
    )
    return result.rows[0] || null
  } catch (error) {
    console.error('❌ Erreur lors de la recherche du lead:', error)
    throw error
  }
}

/**
 * Confirme un lead (change le statut de 'pending' à 'confirmed')
 * @param {string} token - Token de confirmation
 * @returns {Promise<boolean>} true si confirmé avec succès, false sinon
 * @throws {Error} Si la requête échoue
 */
export async function confirmLead(token) {
  try {
    const dbPool = getPool()
    const result = await dbPool.query(
      `UPDATE leads 
       SET status = 'confirmed' 
       WHERE confirmation_token = $1 AND status = 'pending'
       RETURNING id`,
      [token]
    )
    return result.rowCount > 0
  } catch (error) {
    console.error('❌ Erreur lors de la confirmation du lead:', error)
    throw error
  }
}

/**
 * Récupère les plombiers éligibles (actifs et avec quota disponible)
 * @returns {Promise<Array>} Liste des plombiers éligibles, triés par priorité
 * @throws {Error} Si la requête échoue
 */
export async function getEligiblePlumbers() {
  try {
    const dbPool = getPool()
    const result = await dbPool.query(
      `SELECT * FROM plumbers
       WHERE status = 'active' AND leads_received < pack_size
       ORDER BY leads_received ASC, created_at ASC`,
      []
    )
    return result.rows
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des plombiers éligibles:', error)
    throw error
  }
}

/**
 * Attribue un lead à un plombier (incrémente leads_received et met à jour le statut si nécessaire)
 * @param {number} plumber_id - ID du plombier
 * @returns {Promise<boolean>} true si l'attribution a réussi, false sinon
 * @throws {Error} Si la requête échoue
 */
export async function assignLeadToPlumber(plumber_id) {
  try {
    const dbPool = getPool()
    const result = await dbPool.query(
      `UPDATE plumbers
       SET leads_received = leads_received + 1,
           status = CASE
             WHEN leads_received + 1 >= pack_size THEN 'exhausted'
             ELSE 'active'
           END
       WHERE id = $1`,
      [plumber_id]
    )
    return result.rowCount > 0
  } catch (error) {
    console.error('❌ Erreur lors de l\'attribution du lead au plombier:', error)
    throw error
  }
}

/**
 * Lie un lead à un plombier (change le statut du lead à 'sent')
 * @param {number} lead_id - ID du lead
 * @param {number} plumber_id - ID du plombier (pour référence future)
 * @returns {Promise<boolean>} true si la liaison a réussi, false sinon
 * @throws {Error} Si la requête échoue
 */
export async function linkLeadToPlumber(lead_id, plumber_id) {
  try {
    const dbPool = getPool()
    const result = await dbPool.query(
      `UPDATE leads
       SET status = 'sent'
       WHERE id = $1`,
      [lead_id]
    )
    return result.rowCount > 0
  } catch (error) {
    console.error('❌ Erreur lors de la liaison du lead au plombier:', error)
    throw error
  }
}

/**
 * Attribue un lead à un plombier de façon atomique (transaction)
 * @param {number} lead_id - ID du lead
 * @param {number} plumber_id - ID du plombier
 * @returns {Promise<boolean>} true si l'attribution a réussi, false sinon
 * @throws {Error} Si la transaction échoue
 */
export async function assignLeadToPlumberAtomically(lead_id, plumber_id) {
  const dbPool = getPool()
  const client = await dbPool.connect()
  try {

    await client.query('BEGIN')
    
    // Attribuer le lead au plombier (incrémenter leads_received et mettre à jour status)
    const result1 = await client.query(
      `UPDATE plumbers
       SET leads_received = leads_received + 1,
           status = CASE
             WHEN leads_received + 1 >= pack_size THEN 'exhausted'
             ELSE 'active'
           END
       WHERE id = $1`,
      [plumber_id]
    )
    
    if (result1.rowCount === 0) {
      await client.query('ROLLBACK')
      return false
    }
    
    // Marquer le lead comme envoyé et stocker plumber_id
    const result2 = await client.query(
      `UPDATE leads
       SET status = 'sent', plumber_id = $2
       WHERE id = $1`,
      [lead_id, plumber_id]
    )
    
    if (result2.rowCount === 0) {
      await client.query('ROLLBACK')
      return false
    }
    
    await client.query('COMMIT')
    return true
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('❌ Erreur lors de l\'attribution atomique du lead:', error)
    throw error
  } finally {
    client.release()
  }
}

/**
 * Met à jour le statut de notification d'un lead
 * @param {number} lead_id - ID du lead
 * @param {string} status - Statut de notification ('pending', 'whatsapp_sent', 'whatsapp_failed')
 * @param {number} attempts - Nombre de tentatives
 * @param {string|null} retryAt - Date de retry (ISO string) ou null
 * @returns {Promise<boolean>} true si la mise à jour a réussi, false sinon
 * @throws {Error} Si la requête échoue
 */
export async function updateNotification(lead_id, status, attempts, retryAt = null) {
  try {
    const dbPool = getPool()
    const result = await dbPool.query(
      `UPDATE leads
       SET notification_status = $1,
           notification_attempts = $2,
           notification_retry_at = $3
       WHERE id = $4`,
      [status, attempts, retryAt, lead_id]
    )
    return result.rowCount > 0
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de la notification:', error)
    throw error
  }
}

/**
 * Récupère les leads à retenter (tentative 2 de notification WhatsApp)
 * @returns {Promise<Array>} Liste des leads à retenter avec plumber_phone inclus
 * @throws {Error} Si la requête échoue
 */
export async function getLeadsToRetry() {
  try {
    const dbPool = getPool()
    const result = await dbPool.query(
      `SELECT l.*, p.phone AS plumber_phone
       FROM leads l
       INNER JOIN plumbers p ON l.plumber_id = p.id
       WHERE l.notification_status = 'pending'
         AND l.notification_attempts = 1
         AND l.notification_retry_at IS NOT NULL
         AND l.notification_retry_at <= NOW()`,
      []
    )
    return result.rows
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des leads à retenter:', error)
    throw error
  }
}
