#!/bin/bash

# Script pour générer un favicon.ico optimisé multi-tailles
# Source : logo-plomberie.png dans src/assets/
# Destination : public/favicon.ico

SOURCE="src/assets/logo-plomberie.png"
OUTPUT_DIR="public/temp_favicons"
OUTPUT_ICO="public/favicon.ico"

# Créer le dossier temporaire
mkdir -p "$OUTPUT_DIR"

# Tailles à générer (en pixels)
SIZES=(16 32 48 64 128 256)

echo "Génération des favicons optimisées..."

# Vérifier si sips est disponible (macOS)
if command -v sips &> /dev/null; then
    echo "Utilisation de sips (macOS)..."
    for size in "${SIZES[@]}"; do
        # Calculer le padding (10% de chaque côté = 20% total)
        # Le logo occupera 80% de l'espace disponible
        logo_size=$(echo "$size * 0.8" | bc | cut -d. -f1)
        padding=$(( (size - logo_size) / 2 ))
        
        # Créer une image avec fond transparent
        sips -s format png \
             -z "$size" "$size" \
             --padToHeightWidth "$size" "$size" \
             --padColor FFFFFF00 \
             "$SOURCE" \
             --out "$OUTPUT_DIR/favicon-${size}x${size}.png" 2>/dev/null || \
        sips -s format png \
             -Z "$logo_size" \
             "$SOURCE" \
             --out "$OUTPUT_DIR/logo-${size}.png" && \
        sips -s format png \
             -z "$size" "$size" \
             --padToHeightWidth "$size" "$size" \
             --padColor FFFFFF00 \
             "$OUTPUT_DIR/logo-${size}.png" \
             --out "$OUTPUT_DIR/favicon-${size}x${size}.png"
    done
elif command -v convert &> /dev/null; then
    echo "Utilisation de ImageMagick..."
    for size in "${SIZES[@]}"; do
        logo_size=$(echo "$size * 0.8" | bc | cut -d. -f1)
        convert "$SOURCE" \
                -resize "${logo_size}x${logo_size}" \
                -background transparent \
                -gravity center \
                -extent "${size}x${size}" \
                "$OUTPUT_DIR/favicon-${size}x${size}.png"
    done
else
    echo "Erreur : Aucun outil de conversion d'image trouvé."
    echo "Installez ImageMagick ou utilisez un outil en ligne :"
    echo "https://realfavicongenerator.net/"
    exit 1
fi

# Générer le fichier ICO multi-tailles
if command -v convert &> /dev/null; then
    echo "Création du fichier ICO multi-tailles..."
    convert "$OUTPUT_DIR"/favicon-*.png "$OUTPUT_ICO"
elif command -v magick &> /dev/null; then
    echo "Création du fichier ICO multi-tailles..."
    magick "$OUTPUT_DIR"/favicon-*.png "$OUTPUT_ICO"
else
    echo "ImageMagick requis pour créer le fichier ICO."
    echo "Les fichiers PNG sont dans $OUTPUT_DIR"
    echo "Utilisez un outil en ligne pour créer le .ico :"
    echo "https://www.icoconverter.com/"
    exit 1
fi

# Nettoyer
rm -rf "$OUTPUT_DIR"

echo "✅ Favicon générée : $OUTPUT_ICO"
echo "Tailles incluses : ${SIZES[@]}"

