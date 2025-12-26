import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => { if (ref.current) observer.unobserve(ref.current) }
  }, [])

  return { ref, visible }
}

const timeline = [
  {
    year: '2021',
    title: 'Pre Seed Round',
    description: 'Series raises 3.1M to build the first AI social network.',
  },
  {
    year: '2022',
    title: 'Public Launch',
    description: 'Series first prototype is launched to the public.',
  },
  {
    year: '2023',
    title: 'The Series First Edition',
    description: 'Series launches its own reality tv show with 100k on the line.',
  },
  {
    year: '2025',
    title: 'First Series Hackathon',
    description: 'Series launches its first hackathon with a full time offer on the line.',
  }
]

export default function CompactTimeline() {
  return (
    <section className="relative w-full py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            Series
          </h2>
          <div className="w-20 h-px bg-gray-300 mx-auto" />
        </div>

 
        <div className="relative">

          <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300" />


          <div className="space-y-6">
            {timeline.map((item, index) => {
              const reveal = useScrollReveal()
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  ref={reveal.ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={reveal.visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                >


                  <div className="absolute left-1/2 -translate-x-1/2 top-6 z-20">
                    <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-900" />
                  </div>

                  <div className={`w-full md:w-[46%] px-4 ${isLeft ? 'pr-12' : 'pl-12'}`}>

                    <motion.div
                      whileHover={{ y: -2 }}
                      className="
                        bg-white
                        border border-gray-200
                        rounded-xl
                        p-6
                        shadow-sm
                        hover:shadow-md
                        transition-all
                        duration-300
                      "
                    >

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-lg font-medium text-gray-900">
                          {item.year}
                        </span>
                        <div className="w-8 h-px bg-gray-300"></div>
                      </div>


                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-800 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
