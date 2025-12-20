function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div>
            <a 
              href="tel:0612345678" 
              className="text-2xl md:text-3xl font-bold text-blue-400 hover:text-blue-300 block mb-2"
            >
              📞 06 12 34 56 78
            </a>
            <p className="text-base md:text-lg text-gray-400">
              Disponible 24h/24 – 7j/7
            </p>
          </div>
          <div className="pt-4">
            <p className="text-base text-gray-400">
              Zone d'intervention : Toulouse et environs
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

