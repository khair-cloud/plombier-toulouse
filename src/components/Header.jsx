function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <div className="text-xl md:text-2xl font-bold">🔧 Plomberie Urgence Toulouse</div>
          <div className="flex items-center">
            <a 
              href="tel:0612345678" 
              className="text-lg md:text-xl font-semibold hover:text-blue-200 transition-colors"
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

