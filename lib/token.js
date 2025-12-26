import { randomUUID } from 'crypto'

/**
 * Génère un token unique et sécurisé (UUID v4)
 * @returns {string} Token unique
 */
export function generateToken() {
  return randomUUID()
}

/**
 * Génère une date d'expiration pour un token
 * @param {number} minutes - Nombre de minutes avant expiration (défaut: 10)
 * @returns {string} Timestamp ISO string
 */
export function generateExpiration(minutes = 10) {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + minutes * 60 * 1000)
  return expiresAt.toISOString()
}

/**
 * Vérifie si un token est expiré
 * @param {string} expiresAt - Timestamp ISO string
 * @returns {boolean} true si expiré, false sinon
 */
export function isTokenExpired(expiresAt) {
  if (!expiresAt) return true
  const expirationDate = new Date(expiresAt)
  const now = new Date()
  return now > expirationDate
}

