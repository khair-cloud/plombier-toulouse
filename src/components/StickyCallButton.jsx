function StickyCallButton() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-2xl border-t border-gray-200">
      <a
        href="tel:0612345678"
        className="block w-full btn-primary-lg text-center"
      >
        📞 Appeler maintenant – 24/7
      </a>
    </div>
  )
}

export default StickyCallButton


