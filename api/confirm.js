import {
  initDatabase,
  findLeadByToken,
  confirmLead,
  getEligiblePlumbers,
  assignLeadToPlumberAtomically,
  updateNotification
} from '../lib/db.js'

import { isTokenExpired } from '../lib/token.js'

import { sendWhatsAppMessage } from '../lib/whatsapp.js'

/**
 * Endpoint GET /api/confirm
 * Valide un lead via un token de confirmation
 */
export default async function handler(req, res) {
  // Vérifier que c'est une requête GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    })
  }

  try {
    // Initialiser la base de données
    await initDatabase()

    // Récupérer le token depuis les query parameters
    const { token } = req.query

    // Vérifier que le token est fourni
    if (!token || typeof token !== 'string') {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Erreur de confirmation</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
            }
            .error {
              color: #dc2626;
              font-size: 1.25rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p class="error">❌ Token de confirmation manquant ou invalide.</p>
          </div>
        </body>
        </html>
      `)
    }

    // Trouver le lead correspondant au token
    const lead = await findLeadByToken(token)

    // Vérifier que le lead existe
    if (!lead) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Token introuvable</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
            }
            .error {
              color: #dc2626;
              font-size: 1.25rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p class="error">❌ Token de confirmation introuvable.</p>
          </div>
        </body>
        </html>
      `)
    }

    // Vérifier que le token n'est pas expiré
    if (isTokenExpired(lead.token_expires_at)) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Token expiré</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
            }
            .error {
              color: #dc2626;
              font-size: 1.25rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p class="error">❌ Le lien de confirmation a expiré. Veuillez refaire une demande.</p>
          </div>
        </body>
        </html>
      `)
    }

    // Vérifier que le statut est encore 'pending'
    if (lead.status !== 'pending') {
      // Si déjà confirmé, afficher un message différent
      if (lead.status === 'confirmed') {
        return res.status(200).send(`
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Déjà confirmé</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background-color: #f5f5f5;
              }
              .container {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 500px;
              }
              .info {
                color: #2563eb;
                font-size: 1.25rem;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <p class="info">ℹ️ Cette demande a déjà été confirmée.</p>
            </div>
          </body>
          </html>
        `)
      }
      
      // Autre statut (ex: 'sent')
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Erreur</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
            }
            .error {
              color: #dc2626;
              font-size: 1.25rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p class="error">❌ Cette demande ne peut plus être confirmée.</p>
          </div>
        </body>
        </html>
      `)
    }

    // Confirmer le lead (changer le statut de 'pending' à 'confirmed')
    const confirmed = await confirmLead(token)
    
    if (!confirmed) {
      return res.status(500).send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Erreur serveur</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
            }
            .error {
              color: #dc2626;
              font-size: 1.25rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <p class="error">❌ Erreur lors de la confirmation. Veuillez réessayer.</p>
          </div>
        </body>
        </html>
      `)
    }

    // Distribuer le lead à un plombier éligible
    try {
      const plumbers = await getEligiblePlumbers()
      
      if (plumbers.length === 0) {
        console.warn('⚠️ Aucun plombier disponible pour le lead', lead.id)
        // Le lead reste en 'confirmed', sera distribué plus tard si des plombiers deviennent disponibles
      } else {
        // Sélectionner le premier plombier (le moins servi grâce au ORDER BY)
        const selectedPlumber = plumbers[0]
        
        // Attribuer le lead de façon atomique (transaction)
        const assigned = await assignLeadToPlumberAtomically(lead.id, selectedPlumber.id)
        
        if (assigned) {
          console.log('✅ Lead', lead.id, 'attribué au plombier', selectedPlumber.id)
          
          // Envoyer WhatsApp au plombier avec les détails du lead (tentative 1)
          try {
            const whatsappMessage = `🚨 Nouveau client – Urgence plomberie

📞 Téléphone : ${lead.phone}
📍 Code postal : ${lead.postal_code}
🔧 Type d'urgence : ${lead.emergency_type}

Merci de rappeler le client immédiatement.`
            
            await sendWhatsAppMessage({
              to: selectedPlumber.phone,
              message: whatsappMessage
            })
            
            // Succès tentative 1
            await updateNotification(lead.id, 'whatsapp_sent', 1, null)
            console.log('✅ WhatsApp envoyé (tentative 1) - Lead', lead.id)
          } catch (whatsappError) {
            // Échec tentative 1 - programmer le retry
            const retryAt = new Date(Date.now() + 30000).toISOString()
            await updateNotification(lead.id, 'pending', 1, retryAt)
            console.error('⚠️ Échec WhatsApp tentative 1 - Lead', lead.id, '- Retry programmé')
            // Le lead reste attribué même si WhatsApp échoue
          }
        } else {
          console.error('❌ Erreur lors de l\'attribution du lead', lead.id, 'au plombier', selectedPlumber.id)
          // Le lead reste en 'confirmed'
        }
      }
    } catch (distributionError) {
      // Ne pas faire échouer la confirmation si la distribution échoue
      console.error('❌ Erreur lors de la distribution du lead', lead.id, ':', distributionError)
      // Le lead reste en 'confirmed', pourra être distribué plus tard
    }

    // Retourner la page de confirmation
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demande confirmée</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
          }
          .success {
            color: #16a34a;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          .message {
            color: #374151;
            font-size: 1.125rem;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p class="success">✅ Demande bien prise en compte.</p>
          <p class="message">Un plombier vous rappellera dans moins de 5 minutes.<br>Merci de rester joignable.</p>
        </div>
      </body>
      </html>
    `)

  } catch (error) {
    console.error('Erreur dans /api/confirm:', error)
    return res.status(500).send(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur serveur</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
          }
          .error {
            color: #dc2626;
            font-size: 1.25rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p class="error">❌ Erreur serveur interne. Veuillez réessayer plus tard.</p>
        </div>
      </body>
      </html>
    `)
  }
}

