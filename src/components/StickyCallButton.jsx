function StickyCallButton() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-2xl border-t border-gray-200">
      <a
        href="tel:0612345678"
        className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-4 px-6 rounded-lg text-lg transition-colors"
      >
        📞 Appeler maintenant – 24/7
      </a>
    </div>
  )
}

export default StickyCallButton


