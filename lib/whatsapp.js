import twilio from 'twilio'

// Client Twilio lazy (initialisé uniquement quand nécessaire)
let client = null

/**
 * Obtient ou initialise le client Twilio
 * @returns {twilio.Twilio} Client Twilio initialisé
 */
function getTwilioClient() {
  if (!client) {
    // Vérifier les variables d'environnement avant d'initialiser
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new Error('Variables Twilio manquantes dans les variables d\'environnement')
    }
    client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )
  }
  return client
}

/**
 * Envoie un message WhatsApp via Twilio
 * @param {object} params - Paramètres d'envoi
 * @param {string} params.to - Numéro de téléphone du destinataire (format: +33XXXXXXXXX)
 * @param {string} params.message - Contenu du message
 * @returns {Promise<string>} SID du message envoyé
 * @throws {Error} Si l'envoi échoue
 */
export async function sendWhatsAppMessage({ to, message }) {
  // Vérifier les variables d'environnement
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_WHATSAPP_FROM) {
    throw new Error('Variables Twilio manquantes dans les variables d\'environnement')
  }

  try {
    // Obtenir le client Twilio (initialisation lazy)
    const twilioClient = getTwilioClient()
    
    // Formater le numéro de destination (ajouter préfixe whatsapp:)
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`
    
    // Envoyer le message
    const result = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: formattedTo,
      body: message
    })
    
    console.log('✅ Message WhatsApp envoyé avec succès. SID:', result.sid)
    return result.sid
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi du message WhatsApp:', error)
    throw error
  }
}

