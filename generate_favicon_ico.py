#!/usr/bin/env python3
"""
Script pour générer un favicon.ico optimisé multi-tailles
Source : src/assets/logo-plomberie.png
Destination : public/favicon.ico
"""

import sys
from PIL import Image
import os

SOURCE = "src/assets/logo-plomberie.png"
OUTPUT = "public/favicon.ico"
SIZES = [16, 32, 48, 64, 128, 256]
LOGO_RATIO = 0.8  # Le logo occupe 80% de l'espace (10% de marge de chaque côté)

def generate_favicon():
    """Génère un fichier ICO multi-tailles optimisé"""
    
    if not os.path.exists(SOURCE):
        print(f"❌ Erreur : {SOURCE} introuvable")
        sys.exit(1)
    
    print(f"📖 Lecture de {SOURCE}...")
    logo = Image.open(SOURCE)
    
    # Convertir en RGBA si nécessaire
    if logo.mode != 'RGBA':
        logo = logo.convert('RGBA')
    
    # Créer les images pour chaque taille
    icons = []
    
    for size in SIZES:
        # Calculer la taille du logo (80% de l'espace disponible)
        logo_size = int(size * LOGO_RATIO)
        padding = (size - logo_size) // 2
        
        # Redimensionner le logo proportionnellement
        logo_resized = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
        
        # Créer une image transparente de la taille finale
        icon = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        
        # Coller le logo centré
        icon.paste(logo_resized, (padding, padding), logo_resized if logo_resized.mode == 'RGBA' else None)
        
        icons.append(icon)
        print(f"✅ Généré {size}×{size}px (logo: {logo_size}×{logo_size}px, padding: {padding}px)")
    
    # Sauvegarder en ICO
    print(f"\n💾 Création de {OUTPUT}...")
    icons[0].save(
        OUTPUT,
        format='ICO',
        sizes=[(s, s) for s in SIZES],
        append_images=icons[1:] if len(icons) > 1 else []
    )
    
    file_size = os.path.getsize(OUTPUT) / 1024
    print(f"✅ Favicon générée : {OUTPUT} ({file_size:.1f} KB)")
    print(f"📦 Tailles incluses : {', '.join([f'{s}×{s}' for s in SIZES])}")

if __name__ == "__main__":
    try:
        generate_favicon()
    except ImportError:
        print("❌ Erreur : PIL (Pillow) n'est pas installé")
        print("📦 Installation : pip3 install Pillow")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Erreur : {e}")
        sys.exit(1)

