# Génération des fichiers Favicon

Les fichiers favicon SVG sont créés. Pour une compatibilité optimale, convertissez-les en PNG et ICO :

## Fichiers à générer

1. **favicon.ico** : Format ICO standard (16x16, 32x32, 48x48)
2. **favicon-32x32.png** : PNG 32x32 pixels
3. **favicon-16x16.png** : PNG 16x16 pixels

## Outils recommandés

- **En ligne** : https://realfavicongenerator.net/
- **ImageMagick** : `convert favicon.svg -resize 32x32 favicon-32x32.png`
- **Inkscape** : Export SVG vers PNG

## Design

- Fond : Orange (#F97316) - même couleur que les CTA
- Icône : Clé à molette blanche
- Forme : Carré avec coins arrondis

Le fichier `favicon.svg` fonctionne déjà avec les navigateurs modernes.

