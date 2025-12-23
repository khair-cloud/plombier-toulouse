import Header from './components/Header'
import Hero from './components/Hero'
import TrustLogos from './components/TrustLogos'
import CompactTestimonials from './components/CompactTestimonials'
import ContactForm from './components/ContactForm'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import StickyCallButton from './components/StickyCallButton'

function App() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />
      <Hero />
      <TrustLogos />
      <CompactTestimonials />
      <ContactForm />
      <Services />
      <Testimonials />
      <Footer />
      <StickyCallButton />
    </div>
  )
}

export default App

