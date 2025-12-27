/**
 * Endpoint GET /api/health
 * Endpoint simple de test pour valider le bon fonctionnement de l'API Vercel
 */
export default async function handler(req, res) {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    platform: 'vercel'
  })
}

