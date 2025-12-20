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
          <p className="text-base md:text-2xl mb-6 md:mb-8 font-semibold drop-shadow-lg">
            Intervention immédiate – 24/7
          </p>
          <div className="flex justify-center">
            <a 
              href="tel:0612345678"
              className="btn-primary-lg inline-block shadow-xl w-full md:w-auto text-center"
            >
              📞 Appeler maintenant
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

