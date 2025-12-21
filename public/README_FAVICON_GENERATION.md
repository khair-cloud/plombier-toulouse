# Génération des Favicons Optimisées

## Objectif
Générer toutes les tailles de favicon recommandées pour une lisibilité maximale dans :
- Les onglets de navigateur
- Les résultats de recherche Google
- Les favoris
- Les applications mobiles (PWA)

## Tailles requises

Les fichiers suivants doivent être générés à partir de `logo-plomberie.png` :

1. **favicon-16x16.png** - Onglets navigateur (petite taille)
2. **favicon-32x32.png** - Onglets navigateur (taille standard)
3. **favicon-48x48.png** - Windows, favoris
4. **favicon-96x96.png** - Android Chrome
5. **favicon-180x180.png** - Apple Touch Icon (iOS)
6. **favicon-192x192.png** - Android (PWA)
7. **favicon-512x512.png** - Android (PWA, splash screen)

## Instructions de génération

### Option 1 : Outil en ligne (Recommandé)
1. Allez sur https://realfavicongenerator.net/
2. Uploadez `src/assets/logo-plomberie.png`
3. Configurez :
   - **Padding** : 10-15% pour centrer le logo
   - **Background** : Transparent
   - **Scaling** : "Fit to canvas" pour ne pas rogner
4. Téléchargez et placez tous les fichiers dans `/public/`

### Option 2 : ImageMagick (Ligne de commande)
```bash
# Depuis le répertoire src/assets
convert logo-plomberie.png -resize 16x16 -background transparent -gravity center -extent 16x16 ../public/favicon-16x16.png
convert logo-plomberie.png -resize 32x32 -background transparent -gravity center -extent 32x32 ../public/favicon-32x32.png
convert logo-plomberie.png -resize 48x48 -background transparent -gravity center -extent 48x48 ../public/favicon-48x48.png
convert logo-plomberie.png -resize 96x96 -background transparent -gravity center -extent 96x96 ../public/favicon-96x96.png
convert logo-plomberie.png -resize 180x180 -background transparent -gravity center -extent 180x180 ../public/favicon-180x180.png
convert logo-plomberie.png -resize 192x192 -background transparent -gravity center -extent 192x192 ../public/favicon-192x192.png
convert logo-plomberie.png -resize 512x512 -background transparent -gravity center -extent 512x512 ../public/favicon-512x512.png
```

### Option 3 : Inkscape (Graphique)
1. Ouvrez `logo-plomberie.png` dans Inkscape
2. Pour chaque taille :
   - File > Export PNG Image
   - Définir la taille (ex: 32x32)
   - Cocher "Use saved size"
   - Exporter vers `/public/favicon-[taille]x[taille].png`

## Points importants

✅ **Ne pas rogner** : Utiliser "Fit to canvas" ou "gravity center" avec padding
✅ **Respecter les proportions** : Maintenir le ratio largeur/hauteur
✅ **Fond transparent** : Pour une meilleure intégration
✅ **Centrer le logo** : Marges égales de tous les côtés
✅ **Qualité maximale** : Utiliser le logo source en haute résolution

## Vérification

Après génération, vérifiez que :
- Tous les fichiers sont dans `/public/`
- Les tailles sont correctes
- Le logo est centré et visible
- Le fond est transparent
- Les balises dans `index.html` pointent vers les bons fichiers

## Fichier SVG

Le fichier `favicon.svg` est déjà créé et peut être utilisé directement par les navigateurs modernes. Il s'adapte automatiquement à toutes les tailles.

