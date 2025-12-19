function Testimonials() {
  const testimonials = [
    {
      name: "Marie D.",
      location: "Toulouse Centre",
      rating: 5,
      text: "Intervention très rapide pour une fuite d'eau urgente. Plombier professionnel et efficace. Je recommande !"
    },
    {
      name: "Jean-Pierre L.",
      location: "Blagnac",
      rating: 5,
      text: "Service impeccable, canalisation débouchée en moins d'une heure. Prix correct et travail soigné."
    },
    {
      name: "Sophie M.",
      location: "Colomiers",
      rating: 5,
      text: "Disponible même le dimanche ! Problème de chauffe-eau résolu rapidement. Très satisfaite."
    }
  ]

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Ce que disent nos clients
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

