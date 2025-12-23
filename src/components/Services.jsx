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
    <section className="py-6 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-gray-900">
          Nos Services d'Urgence
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl lg:max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-3 md:p-4 rounded text-left shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-px transition-[box-shadow,transform] duration-200 ease-in-out"
            >
              <div className="flex items-center gap-2 mb-1 md:mb-1.5">
                <span className="text-xl md:text-2xl">{service.icon}</span>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>
              <p className="text-sm text-gray-500 leading-tight">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 md:mt-12 text-center">
          <button
            onClick={scrollToContact}
            className="btn-primary-md"
          >
            Rappel en 5 min – Gratuit
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services

