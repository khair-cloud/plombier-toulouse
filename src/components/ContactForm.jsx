import { useState } from 'react'
import { PHONE_DISPLAY } from '../constants/phone'

function ContactForm() {
  const [formData, setFormData] = useState({
    phone: '',
    urgency: '',
    postalCode: ''
  })
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('')
  const [postalCodeError, setPostalCodeError] = useState('')

  // Fonction placeholder pour l'API Node.js future
  // TODO: connecter à l'API Node.js /api/lead
  const submitLead = async (data) => {
    // TODO: Implémenter l'appel API
    // const response = await fetch('/api/lead', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    // return response.ok
    return Promise.resolve(true) // Placeholder
  }

  // Liste des codes postaux autorisés
  const ALLOWED_POSTAL_CODES = [
    '31000', '31100', '31200', '31300', '31400', '31500',
    '31120', '31130', '31140', '31150', '31170', '31240', '31270', '31280',
    '31470', '31490', '31520', '31530',
    '31600', '31650', '31670',
    '31700', '31770', '31780', '31790',
    '31820', '31830', '31840', '31850'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Pour le code postal, n'accepter que les chiffres
    if (name === 'postalCode') {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length <= 5) {
        setFormData(prev => ({
          ...prev,
          [name]: digitsOnly
        }))
        // Réinitialiser l'erreur lors de la saisie
        setPostalCodeError('')
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const validateForm = () => {
    setErrorMessage('')
    setPostalCodeError('')
    
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
    // Validation du code postal
    if (!formData.postalCode.trim()) {
      setPostalCodeError('Le code postal est requis')
      return false
    }
    if (formData.postalCode.length !== 5) {
      setPostalCodeError('Le code postal doit contenir 5 chiffres')
      return false
    }
    if (!ALLOWED_POSTAL_CODES.includes(formData.postalCode)) {
      setPostalCodeError('Nous ne desservons pas ce code postal.')
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
    
    // Message temporaire pendant la connexion
    // TODO: Appeler submitLead(formData) une fois l'API prête
    setTimeout(() => {
      setStatus('idle')
      setFormData({
        phone: '',
        urgency: '',
        postalCode: ''
      })
      setPostalCodeError('')
    }, 2000)
  }

  return (
    <section id="contact" className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-900">
            Être rappelé en 5min
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

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl border border-[#2C3667] shadow-sm">
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
                placeholder={PHONE_DISPLAY}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="postalCode" className="block text-gray-700 font-semibold mb-2 text-base">
                Code postal (zone d'intervention) *
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                maxLength="5"
                placeholder="31000"
                className={`w-full px-4 py-3 text-base border rounded-lg focus:outline-none focus:ring-2 ${
                  postalCodeError 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {postalCodeError && (
                <p className="mt-2 text-sm text-red-600">{postalCodeError}</p>
              )}
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
                <option value="fuite">💧 Fuite d'eau</option>
                <option value="bouchon">🚽 Bouchon (WC / canalisation)</option>
                <option value="panne">🚱 Panne (chauffe-eau / robinet)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 md:py-5 px-8 md:px-10 text-lg md:text-xl font-bold text-white bg-[#2C3667] hover:bg-[#1F274D] rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2C3667] focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Formulaire en cours de connexion' : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Rappel en 5min – Gratuit</span>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm

