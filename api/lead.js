import { initDatabase, createLead } from '../lib/db.js'
import { generateToken, generateExpiration } from '../lib/token.js'

// Mapping des valeurs emergency_type (format court → format complet)
const EMERGENCY_TYPE_MAP = {
  'fuite': 'Fuite d\'eau',
  'bouchon': 'Bouchon (WC / canalisation)',
  'panne': 'Panne (Chauffe-eau / robinet)'
}

// Valeurs autorisées pour emergency_type (format complet)
const ALLOWED_EMERGENCY_TYPES = [
  'Fuite d\'eau',
  'Bouchon (WC / canalisation)',
  'Panne (Chauffe-eau / robinet)'
]

/**
 * Normalise le type d'urgence (mapping format court → format complet)
 * @param {string} emergencyType - Type d'urgence (court ou complet)
 * @returns {string|null} Type normalisé ou null si invalide
 */
function normalizeEmergencyType(emergencyType) {
  if (!emergencyType || typeof emergencyType !== 'string') {
    return null
  }
  
  const trimmed = emergencyType.trim()
  
  // Si c'est déjà le format complet, le retourner tel quel
  if (ALLOWED_EMERGENCY_TYPES.includes(trimmed)) {
    return trimmed
  }
  
  // Sinon, essayer le mapping depuis le format court
  const normalized = EMERGENCY_TYPE_MAP[trimmed.toLowerCase()]
  return normalized || null
}

/**
 * Valide le numéro de téléphone
 * @param {string} phone - Numéro de téléphone
 * @returns {boolean} true si valide
 */
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return false
  }
  // Supprimer les espaces et vérifier 10 chiffres
  const cleaned = phone.replace(/\s/g, '')
  return /^[0-9]{10}$/.test(cleaned)
}

/**
 * Valide le code postal
 * @param {string} postalCode - Code postal
 * @returns {boolean} true si valide
 */
function validatePostalCode(postalCode) {
  if (!postalCode || typeof postalCode !== 'string') {
    return false
  }
  // Vérifier 5 chiffres
  return /^[0-9]{5}$/.test(postalCode.trim())
}

/**
 * Endpoint POST /api/lead
 * Reçoit une demande d'urgence plomberie et génère un token de confirmation
 */
export default async function handler(req, res) {
  // Vérifier que c'est une requête POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    })
  }

  try {
    // Initialiser la base de données
    await initDatabase()

    // Récupérer les données du body
    const { phone, postal_code, emergency_type } = req.body

    // Validation du téléphone
    if (!phone || !validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Le numéro de téléphone est requis et doit contenir 10 chiffres'
      })
    }

    // Validation du code postal
    if (!postal_code || !validatePostalCode(postal_code)) {
      return res.status(400).json({
        success: false,
        error: 'Le code postal est requis et doit contenir 5 chiffres'
      })
    }

    // Validation et normalisation du type d'urgence
    const normalizedEmergencyType = normalizeEmergencyType(emergency_type)
    if (!normalizedEmergencyType) {
      return res.status(400).json({
        success: false,
        error: 'Type d\'urgence invalide. Valeurs autorisées: Fuite d\'eau, Bouchon (WC / canalisation), Panne (Chauffe-eau / robinet)'
      })
    }

    // Générer un token unique et sécurisé
    const token = generateToken()
    const expiresAt = generateExpiration(10) // Expiration dans 10 minutes

    // Nettoyer le numéro de téléphone (supprimer les espaces)
    const cleanedPhone = phone.replace(/\s/g, '')

    // Enregistrer le lead dans la base de données
    try {
      await createLead({
        phone: cleanedPhone,
        postal_code: postal_code.trim(),
        emergency_type: normalizedEmergencyType,
        confirmation_token: token,
        token_expires_at: expiresAt
      })
    } catch (dbError) {
      console.error('Erreur lors de l\'enregistrement en base:', dbError)
      return res.status(500).json({
        success: false,
        error: 'Erreur serveur lors de l\'enregistrement'
      })
    }

    // TODO: envoyer SMS Twilio avec lien de confirmation
    // Exemple: https://votredomaine.com/api/confirm?token=${token}

    // Retourner le succès
    return res.status(200).json({
      success: true
    })

  } catch (error) {
    console.error('Erreur dans /api/lead:', error)
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur interne'
    })
  }
}

