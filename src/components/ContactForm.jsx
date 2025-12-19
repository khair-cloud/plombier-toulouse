import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    urgency: '',
    message: ''
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
    if (!formData.email.trim()) {
      setErrorMessage('L\'email est requis')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('L\'email n\'est pas valide')
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
          email: '',
          urgency: '',
          message: ''
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
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Demande d'intervention
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Remplissez le formulaire ci-dessous ou appelez-nous directement au{' '}
            <a href="tel:+33612345678" className="text-blue-600 font-semibold hover:underline">
              06 12 34 56 78
            </a>
          </p>

          {status === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-semibold">✅ Message envoyé avec succès !</p>
              <p className="mt-2">Nous vous contacterons dans les plus brefs délais.</p>
            </div>
          )}

          {status === 'error' && errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-semibold">❌ Erreur</p>
              <p className="mt-2">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="urgency" className="block text-gray-700 font-semibold mb-2">
                Type d'urgence *
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez un type</option>
                <option value="fuite">Fuite d'eau</option>
                <option value="canalisation">Canalisation bouchée</option>
                <option value="chauffe-eau">Problème chauffe-eau</option>
                <option value="wc">WC bouché</option>
                <option value="autre">Autre urgence</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Description du problème
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Décrivez brièvement votre problème..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer la demande'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

