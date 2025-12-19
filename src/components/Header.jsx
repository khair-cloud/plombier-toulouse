function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold">🔧 Plomberie Urgence Toulouse</div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+33612345678" 
              className="text-xl font-semibold hover:text-blue-200 transition-colors"
            >
              📞 06 12 34 56 78
            </a>
            <a 
              href="tel:+33612345678"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Appeler maintenant
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

