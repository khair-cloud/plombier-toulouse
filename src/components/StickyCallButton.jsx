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
        📞 Appeler maintenant
      </a>
    </div>
  )
}

export default StickyCallButton


