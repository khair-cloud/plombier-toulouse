# Landing Page Plomberie d'Urgence Toulouse

Landing page simple pour un service de plomberie d'urgence à Toulouse.

## Stack technique

- React 18 + Vite
- Tailwind CSS

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Déploiement sur Vercel

1. Pousser le code sur GitHub/GitLab/Bitbucket
2. Connecter le repository à Vercel
3. Vercel détectera automatiquement Vite
4. Le déploiement se fera automatiquement à chaque push

### Configuration Vercel

- Build command : `npm run build`
- Output directory : `dist`
- Framework preset : Vite (auto-détecté)

## Configuration PostgreSQL

- Variable d'environnement : `DATABASE_URL`
- Format : `postgres://user:password@host:port/dbname`
- Exemple : `postgres://user:pass@localhost:5432/plomberie`
- Sur Vercel : configurer `DATABASE_URL` dans les variables d'environnement du projet

## Configuration Twilio WhatsApp

Variables d'environnement requises :
- `TWILIO_ACCOUNT_SID` : Identifiant du compte Twilio
- `TWILIO_AUTH_TOKEN` : Token d'authentification Twilio
- `TWILIO_WHATSAPP_FROM` : Numéro WhatsApp Twilio (format: `whatsapp:+14155238886`)

Sur Vercel : configurer ces variables dans les paramètres du projet.

## Configuration Cron Job

**Option A - Secret en dur dans l'URL :**

1. Choisir un secret LONG et UNIQUE (ex: `abc123xyz789secret`)

2. Dans `vercel.json`, configurer le cron avec le secret en dur :
   ```json
   {
     "crons": [
       {
         "path": "/api/whatsapp-retry?secret=abc123xyz789secret",
         "schedule": "* * * * *"
       }
     ]
   }
   ```

3. Dans les variables d'environnement Vercel, configurer :
   - `CRON_SECRET` = `abc123xyz789secret` (exactement le même secret)

Le cron job Vercel s'exécute toutes les minutes pour traiter les retries WhatsApp.

## Notes

- Le numéro de téléphone est défini dans `src/constants/phone.js` (05 25 68 03 95). Modifiez ce fichier pour changer le numéro partout sur le site.
- Le formulaire est prêt pour l'intégration avec l'API Node.js

