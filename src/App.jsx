import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import ContactForm from './components/ContactForm'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <ContactForm />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App

