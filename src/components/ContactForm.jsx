import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    urgency: ''
  })
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('')

  // Remplacez cette URL par votre endpoint Formspree après création du compte
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjanokr'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Le nom est requis')
      return false
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Le téléphone est requis')
      return false
    }
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setErrorMessage('Le numéro de téléphone doit contenir 10 chiffres')
      return false
    }
    if (!formData.urgency) {
      setErrorMessage('Veuillez sélectionner un type d\'urgence')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) {
      return
    }

    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          phone: '',
          urgency: ''
        })
      } else {
        setStatus('error')
        setErrorMessage('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.')
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-900">
            Être rappelé immédiatement
          </h2>

          {status === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-base">
              <p className="font-semibold">✅ Demande envoyée avec succès !</p>
              <p className="mt-2">Nous vous rappelons dans les 5 minutes.</p>
            </div>
          )}

          {status === 'error' && errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-base">
              <p className="font-semibold">❌ Erreur</p>
              <p className="mt-2">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-md">
            <div className="mb-5">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-base">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2 text-base">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="06 12 34 56 78"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="urgency" className="block text-gray-700 font-semibold mb-2 text-base">
                Type d'urgence *
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez un type</option>
                <option value="fuite">Fuite d'eau</option>
                <option value="canalisation">Canalisation bouchée</option>
                <option value="chauffe-eau">Chauffe-eau en panne</option>
                <option value="wc">WC bouché</option>
                <option value="autre">Autre urgence</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full btn-primary-lg disabled:btn-primary-disabled"
            >
              {status === 'sending' ? 'Envoi en cours...' : '📞 Rappel immédiat – Gratuit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

