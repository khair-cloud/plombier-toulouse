import {
  initDatabase,
  getLeadsToRetry,
  updateNotification
} from '../lib/db.js'

import { sendWhatsAppMessage } from '../lib/whatsapp.js'

/**
 * Endpoint GET/POST /api/whatsapp-retry
 * Traite les retries WhatsApp pour les leads dont la tentative 1 a échoué
 * Sécurisé via secret dans l'URL (Option A)
 */
export default async function handler(req, res) {
  // Vérifier le secret (GET ou POST)
  const secret = req.query.secret || req.headers['x-cron-secret']
  if (!secret || secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  try {
    await initDatabase()
    
    // Récupérer les leads à retenter (avec plumber_phone inclus)
    const leads = await getLeadsToRetry()
    
    if (leads.length === 0) {
      return res.status(200).json({ success: true, processed: 0 })
    }
    
    let successCount = 0
    let failureCount = 0
    
    // Traiter chaque lead
    for (const lead of leads) {
      try {
        const whatsappMessage = `🚨 Nouveau client – Urgence plomberie

📞 Téléphone : ${lead.phone}
📍 Code postal : ${lead.postal_code}
🔧 Type d'urgence : ${lead.emergency_type}

Merci de rappeler le client immédiatement.`
        
        // Envoyer WhatsApp (tentative 2) avec plumber_phone de la jointure
        await sendWhatsAppMessage({
          to: lead.plumber_phone,
          message: whatsappMessage
        })
        
        // Succès tentative 2
        await updateNotification(lead.id, 'whatsapp_sent', 2, null)
        console.log('✅ WhatsApp envoyé (tentative 2) - Lead', lead.id)
        successCount++
      } catch (retryError) {
        // Échec définitif
        await updateNotification(lead.id, 'whatsapp_failed', 2, null)
        console.error('❌ Échec définitif WhatsApp - Lead', lead.id, ':', retryError.message)
        failureCount++
      }
    }
    
    return res.status(200).json({
      success: true,
      processed: leads.length,
      successCount,
      failureCount
    })
  } catch (error) {
    console.error('❌ Erreur dans /api/whatsapp-retry:', error)
    return res.status(500).json({ success: false, error: 'Erreur serveur' })
  }
}

