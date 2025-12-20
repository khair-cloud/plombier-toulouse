import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import TrustSection from './components/TrustSection'
import ContactForm from './components/ContactForm'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import StickyCallButton from './components/StickyCallButton'

function App() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />
      <Hero />
      <Services />
      <TrustSection />
      <ContactForm />
      <Testimonials />
      <Footer />
      <StickyCallButton />
    </div>
  )
}

export default App

