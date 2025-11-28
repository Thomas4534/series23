import { useEffect, useRef, useState } from 'react'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2, rootMargin: '-50px 0px -50px 0px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return { ref, visible }
}

export default function Invitation() {
  const reveal = useScrollReveal()

  return (
    <section className="py-16 px-6 bg-white font-mono text-gray-900">
      <div className="max-w-6xl mx-auto">

        <div className="relative max-w-4xl mx-auto">
          <div
            ref={reveal.ref}
            className={`transition-all duration-700 ease-out transform
            ${reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="rounded-2xl border border-gray-300/80 p-10 md:p-14 text-center bg-white">

              <h2 className="text-[32px] sm:text-[38px] md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-6">
                Your time is valuable.
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto mb-10">
                Series connects you directly with the right people.
              </p>

              <div className="flex gap-4 justify-center">
                <button className="px-10 py-4 bg-gray-900 text-white text-sm tracking-wider hover:scale-[1.03] transition-all duration-300 ease-out">
                  SIGN IN
                </button>
                <button className="px-10 py-4 bg-white text-gray-900 text-sm tracking-wider border border-gray-300 hover:bg-gray-50 transition-all duration-300 ease-out">
                  SIGN UP
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}