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
    },
    {
      name: "Caroline",
      location: "",
      text: "Très professionnel et très gentil. Intervention en début de soirée. Je recommande vivement. Merci beaucoup."
    }
  ]

  const StarIcon = () => (
    <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
    </svg>
  )

  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-900">
                    {testimonial.name}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

