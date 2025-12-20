function TrustSection() {
  const points = [
    {
      icon: "⚡",
      text: "Intervention en moins de 30 minutes"
    },
    {
      icon: "✅",
      text: "Plombiers certifiés & assurés"
    },
    {
      icon: "💰",
      text: "Prix annoncés avant intervention"
    },
    {
      icon: "🕐",
      text: "Disponible 24h/24 – 7j/7"
    },
    {
      icon: "👍",
      text: "Satisfaction client garantie"
    }
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Pourquoi nous appeler maintenant ?
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {points.map((point, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg"
              >
                <span className="text-3xl flex-shrink-0">{point.icon}</span>
                <p className="text-base md:text-lg text-gray-800 font-medium">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection


