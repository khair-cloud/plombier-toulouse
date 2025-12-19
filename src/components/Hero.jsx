function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Plomberie d'urgence 24/7 à Toulouse
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Intervention rapide • Plombiers certifiés • Devis gratuit
          </p>
          <div className="mb-8">
            <a 
              href="tel:+33612345678"
              className="text-4xl md:text-5xl font-bold hover:text-orange-300 transition-colors block mb-6"
            >
              📞 06 12 34 56 78
            </a>
          </div>
          <a 
            href="#contact"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-xl font-semibold inline-block transition-colors shadow-lg"
          >
            Demander une intervention
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero

