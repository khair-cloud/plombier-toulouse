import banniereImage from '../assets/Banniere_plombier.jpeg'

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
            🚨 Plombier d'urgence à Toulouse
          </h1>
          <p className="text-base md:text-2xl mb-4 md:mb-6 font-semibold drop-shadow-lg">
            Intervention immédiate 24h/24 – 7j/7
          </p>
          <p className="text-sm md:text-xl mb-6 md:mb-8 text-white/95 leading-relaxed drop-shadow-lg">
            Fuite d'eau, WC bouché, chauffe-eau en panne ?<br className="hidden md:block" />
            <span className="md:hidden"> </span>Un plombier certifié intervient en moins de 30 minutes.
          </p>
          <div className="flex justify-center">
            <a 
              href="tel:0612345678"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:py-4 rounded-lg text-base md:text-xl font-bold inline-block transition-colors shadow-xl w-full md:w-auto"
            >
              📞 Appeler maintenant – Intervention immédiate
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

