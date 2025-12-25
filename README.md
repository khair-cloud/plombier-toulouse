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

## Notes

- Le numéro de téléphone est défini dans `src/constants/phone.js` (05 25 68 03 95). Modifiez ce fichier pour changer le numéro partout sur le site.
- Le formulaire est prêt pour l'intégration avec l'API Node.js

