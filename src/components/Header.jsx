import logoImage from '../assets/logo_urgence.png'

function Header() {
  return (
    <header className="bg-white text-gray-900 shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <a 
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Retour à l'accueil"
          >
            <img 
              src={logoImage} 
              alt="Logo Plombier Urgence Toulouse"
              className="h-11 md:h-14 w-auto flex-shrink-0"
            />
            <span className="text-lg md:text-xl font-bold text-gray-900">
              Plombier Urgence Toulouse
            </span>
          </a>
          <div className="flex flex-col items-center">
            <p className="text-[10px] text-gray-400 mb-0.5 text-center">
              Appel non surtaxé
            </p>
            <a 
              href="tel:0612345678" 
              className="btn-primary text-sm md:text-base py-2 md:py-2.5 px-4 md:px-5"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>06 12 34 56 78</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

