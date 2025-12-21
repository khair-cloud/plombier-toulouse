import logoImage from '../assets/logo-plomberie.png'

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
              className="h-10 md:h-12 w-auto flex-shrink-0"
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
              📞 06 12 34 56 78
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

