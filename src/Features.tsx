import { useEffect, useRef, useState } from 'react'
import Feature1 from './Feature1'
import Feature2 from './Feature2'
import Feature3 from './Feature3'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return { ref, visible }
}

export default function Features() {
  const feature2 = useScrollReveal()
  const feature3 = useScrollReveal()

  return (
    <section className="max-w-6xl mx-auto px-6 space-y-48 mt-48">
      <Feature1 />

      <div
        ref={feature2.ref}
        className={`transition-all duration-700 ease-out ${
          feature2.visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Feature2 />
      </div>

      <div
        ref={feature3.ref}
        className={`transition-all duration-700 ease-out ${
          feature3.visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Feature3 />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes cleanBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
