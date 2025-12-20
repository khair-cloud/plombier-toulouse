function Testimonials() {
  const testimonials = [
    {
      name: "Marc D.",
      location: "Toulouse",
      text: "Intervention rapide pour une fuite un dimanche soir. Très professionnel."
    },
    {
      name: "Sophie M.",
      location: "Blagnac",
      text: "WC bouché résolu en 20 minutes. Service impeccable et prix correct."
    },
    {
      name: "Jean-Pierre L.",
      location: "Colomiers",
      text: "Chauffe-eau en panne, réparé rapidement. Disponible même le week-end."
    }
  ]

  return (
    <section className="py-12 md:py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          Avis clients
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex mb-3 text-xl">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
              </div>
              <p className="text-base text-gray-700 mb-4">
                "{testimonial.text}"
              </p>
              <p className="text-sm text-gray-600">
                — {testimonial.name}, {testimonial.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

