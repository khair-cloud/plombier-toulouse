function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-900 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div>
            <a 
              href="tel:0612345678" 
              className="btn-primary-lg inline-block mb-4"
            >
              📞 06 12 34 56 78
            </a>
            <p className="text-base md:text-lg text-gray-600">
              Du lundi au dimanche – 7h à 22h
            </p>
          </div>
          <div className="pt-4">
            <p className="text-base text-gray-600">
              Zone d'intervention : Toulouse
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

