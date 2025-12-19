function Services() {
  const services = [
    {
      icon: "💧",
      title: "Fuite d'eau",
      description: "Réparation rapide de toutes les fuites, robinets, joints, canalisations"
    },
    {
      icon: "🚿",
      title: "Canalisation bouchée",
      description: "Débouchage efficace des canalisations, éviers, douches, WC"
    },
    {
      icon: "🔥",
      title: "Chauffe-eau",
      description: "Réparation et remplacement de chauffe-eau, ballon d'eau chaude"
    },
    {
      icon: "🚽",
      title: "WC bouché",
      description: "Débouchage urgent de WC, intervention rapide garantie"
    },
    {
      icon: "🔧",
      title: "Rénovation",
      description: "Installation et rénovation de plomberie, salles de bain, cuisines"
    },
    {
      icon: "⚡",
      title: "Intervention rapide",
      description: "Disponible 24h/24 et 7j/7, intervention sous 30 minutes"
    }
  ]

  const avantages = [
    "✅ Intervention rapide sous 30 minutes",
    "✅ Plombiers certifiés et assurés",
    "✅ Devis gratuit et transparent",
    "✅ Disponible 24h/24 et 7j/7",
    "✅ Prix compétitifs",
    "✅ Garantie sur toutes les interventions"
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Nos Services d'Urgence
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-900 text-white p-8 rounded-lg max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Pourquoi nous choisir ?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {avantages.map((avantage, index) => (
              <div key={index} className="text-lg">
                {avantage}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">
            Zone d'intervention
          </h3>
          <p className="text-lg text-gray-600">
            Toulouse et ses environs • Blagnac • Colomiers • Tournefeuille • Muret
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services

