import twilio from 'twilio'

// Initialiser le client Twilio
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

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
    // Formater le numéro de destination (ajouter préfixe whatsapp:)
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`
    
    // Envoyer le message
    const result = await client.messages.create({
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

