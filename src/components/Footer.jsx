function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Plomberie Urgence Toulouse</h3>
            <p className="text-gray-400">
              Votre partenaire de confiance pour tous vos besoins en plomberie d'urgence à Toulouse.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="mb-2">
              <a href="tel:+33612345678" className="text-blue-400 hover:text-blue-300">
                📞 06 12 34 56 78
              </a>
            </p>
            <p className="text-gray-400">
              Disponible 24h/24 et 7j/7
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Zone d'intervention</h3>
            <p className="text-gray-400">
              Toulouse et environs<br />
              Blagnac • Colomiers<br />
              Tournefeuille • Muret
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Plomberie Urgence Toulouse. Tous droits réservés.</p>
          <p className="mt-2 text-sm">
            <a href="#" className="hover:text-white">Mentions légales</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

