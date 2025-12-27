import banniereImage from '../assets/Banniere_plombier.jpeg'
import { PHONE_TEL } from '../constants/phone'

function Hero() {
  return (
    <section 
      className="relative text-white py-12 md:py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${banniereImage})`
      }}
    >
      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Contenu au-dessus de l'overlay */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight drop-shadow-lg">
            Plombier d'urgence à Toulouse, 24h/24 & 7j/7
          </h1>
          <p className="text-base md:text-2xl mb-3 md:mb-4 font-semibold drop-shadow-lg">
            Intervention en moins de 30 min
          </p>
          <p className="text-sm md:text-base mb-6 md:mb-8 text-white/80 drop-shadow-md">
            Devis gratuit • Sans engagement • Artisan partenaire local • Intervention rapide
          </p>
          <div className="flex justify-center">
            <a 
              href={`tel:${PHONE_TEL}`}
              className="btn-primary-lg inline-block shadow-xl w-full md:w-auto text-center"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Appeler maintenant</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

