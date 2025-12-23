import axaLogo from '../assets/axa.png'
import maafLogo from '../assets/maaf.png'
import groupamaLogo from '../assets/groupama.png'

function TrustLogos() {
  return (
    <section className="pt-6 pb-2 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          <img 
            src={axaLogo} 
            alt="AXA" 
            className="h-10 sm:h-10 md:h-12 lg:h-16 opacity-80"
          />
          <img 
            src={maafLogo} 
            alt="MAAF" 
            className="h-10 sm:h-10 md:h-12 lg:h-16 opacity-80"
          />
          <img 
            src={groupamaLogo} 
            alt="Groupama" 
            className="h-10 sm:h-10 md:h-12 lg:h-16 opacity-80"
          />
        </div>
      </div>
    </section>
  )
}

export default TrustLogos

