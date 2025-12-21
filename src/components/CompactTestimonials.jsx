import { useState } from 'react'

function CompactTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      text: "Intervenu pour installer un réducteur de pression. Travail soigné et propre, intervention rapide et prix très raisonnable. Je recommande.",
      author: "Alain"
    },
    {
      text: "Très bien, je l'ai appelé pour une urgence car mes toilettes étaient bouchées et il est venu le jour même. Je recommande.",
      author: "Heni"
    },
    {
      text: "Intervention rapide, travail sérieux et propre. Sympathique et ponctuel. Je recommande sans hésiter.",
      author: "Paul"
    },
    {
      text: "Réactif, communicatif, fiable et débrouillard. Avec un suivi post-intervention, prêt à redépanner si besoin. Impeccable.",
      author: "Elise"
    }
  ]

  const StarIcon = () => (
    <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
    </svg>
  )

  const ArrowLeft = () => (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )

  const ArrowRight = () => (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-6 md:py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Desktop : Grille avec 4 avis */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-900">{testimonial.author}</span>
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

          {/* Mobile : Slider horizontal */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="min-w-full px-2 snap-start"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-900">{testimonial.author}</span>
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
                  </div>
                ))}
              </div>
            </div>
            
            {/* Flèches de navigation mobile */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors z-10"
              aria-label="Avis précédent"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors z-10"
              aria-label="Avis suivant"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompactTestimonials

