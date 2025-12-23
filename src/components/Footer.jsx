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
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>06 12 34 56 78</span>
              </span>
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

