function Services() {
  const scrollToContact = (e) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const services = [
    {
      icon: "💧",
      title: "Fuite d'eau urgente",
      description: "Intervention rapide – Devis immédiat"
    },
    {
      icon: "🚽",
      title: "WC bouché",
      description: "Intervention rapide – Devis immédiat"
    },
    {
      icon: "🔥",
      title: "Chauffe-eau en panne",
      description: "Intervention rapide – Devis immédiat"
    },
    {
      icon: "🚿",
      title: "Canalisation bouchée",
      description: "Intervention rapide – Devis immédiat"
    }
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="md:hidden mb-6 text-center">
          <button
            onClick={scrollToContact}
            className="w-full btn-primary-md"
          >
            Être rappelé en 5 minutes
          </button>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Nos Services d'Urgence
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-base text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

