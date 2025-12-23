import { useState, useEffect } from 'react'

function StickyCallButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollY)
      
      // Seuil minimal pour éviter les micro-mouvements
      if (scrollDifference < 10) return
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll vers le bas et dépassé 100px
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY) {
        // Scroll vers le haut
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-2xl border-t border-gray-200 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <a
        href="tel:0612345678"
        className="block w-full btn-primary-lg text-center"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>Appeler maintenant</span>
        </span>
      </a>
    </div>
  )
}

export default StickyCallButton


