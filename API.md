# API Backend - Documentation

## Structure

```
/api
  ├─ lead.js          POST /api/lead - Réception des demandes
  ├─ confirm.js       GET /api/confirm - Validation par token
/lib
  ├─ db.js            Gestion PostgreSQL
  └─ token.js         Génération et validation de tokens
```

## Endpoints

### POST /api/lead

Reçoit une demande d'urgence plomberie et génère un token de confirmation.

**Body (JSON):**
```json
{
  "phone": "0612345678",
  "postal_code": "31000",
  "emergency_type": "fuite"
}
```

**Réponses:**
- `200 OK`: `{ "success": true }`
- `400 Bad Request`: `{ "success": false, "error": "message d'erreur" }`
- `500 Internal Server Error`: `{ "success": false, "error": "message d'erreur" }`

**Validation:**
- `phone`: 10 chiffres uniquement
- `postal_code`: 5 chiffres
- `emergency_type`: 
  - Format court accepté: `"fuite"`, `"bouchon"`, `"panne"`
  - Format complet accepté: `"Fuite d'eau"`, `"Bouchon (WC / canalisation)"`, `"Panne (Chauffe-eau / robinet)"`
  - Mapping automatique vers format normalisé

**Exemple avec curl:**
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "0612345678",
    "postal_code": "31000",
    "emergency_type": "fuite"
  }'
```

### GET /api/confirm

Valide un lead via un token de confirmation.

**Query Parameters:**
- `token`: Token de confirmation (UUID)

**Réponses:**
- `200 OK`: Page HTML de confirmation
- `400 Bad Request`: Page HTML d'erreur (token expiré, manquant, etc.)
- `404 Not Found`: Page HTML (token introuvable)
- `500 Internal Server Error`: Page HTML d'erreur serveur

**Exemple avec curl:**
```bash
curl "http://localhost:3000/api/confirm?token=YOUR_TOKEN_HERE"
```

## Base de données

**Table: `leads` (PostgreSQL)**

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | SERIAL | ID auto-incrémenté |
| `phone` | VARCHAR(20) | Numéro de téléphone (10 chiffres) |
| `postal_code` | VARCHAR(10) | Code postal (5 chiffres) |
| `emergency_type` | TEXT | Type d'urgence normalisé |
| `status` | VARCHAR(20) | Statut: `pending`, `confirmed`, `sent` |
| `confirmation_token` | TEXT | Token unique (UUID) |
| `token_expires_at` | TIMESTAMP | Date d'expiration |
| `created_at` | TIMESTAMP | Date de création (par défaut: NOW()) |

**Configuration:**
- Utilisation de `DATABASE_URL` (variable d'environnement)
- Format: `postgres://user:password@host:port/dbname`
- La table est créée automatiquement au premier appel via `initDatabase()`
- Persistance durable avec PostgreSQL

## Développement local

Pour tester l'API localement avec Vercel:

```bash
npm run dev:api
```

L'API sera accessible sur `http://localhost:3000/api/lead` et `http://localhost:3000/api/confirm`.

## Déploiement Vercel

Les fonctions serverless dans `/api` sont automatiquement détectées par Vercel.

**Configuration PostgreSQL:**
- Configurer `DATABASE_URL` dans les variables d'environnement Vercel
- Format: `postgres://user:password@host:port/dbname`
- Compatible avec les fonctions serverless Vercel
- Persistance durable avec PostgreSQL

## TODO

- [ ] Intégrer Twilio pour l'envoi de SMS avec lien de confirmation
- [ ] Intégrer Twilio pour l'envoi WhatsApp au plombier après confirmation
- [ ] Ajouter gestion d'erreurs plus robuste
- [ ] Ajouter logging structuré
- [ ] Ajouter rate limiting

