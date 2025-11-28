import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => { if (ref.current) observer.unobserve(ref.current) }
  }, [])

  return { ref, visible }
}

const OFFSET = "translate-x-10" // <-- EDIT THIS to move cards farther from or closer to the line

const timeline = [
  {
    year: '2021',
    title: 'Pre Seed Round',
    description: 'Series raises 3.1M to build the AI social network.',
    accent: 'from-black/5 to-black/10'
  },
  {
    year: '2022',
    title: 'Public Launch',
    description: 'Series first prototype is launched.',
    accent: 'from-black/5 to-black/10'
  },
  {
    year: '2023',
    title: 'The Series First Edition',
    description: 'The first series is ever launched with 100k on the line.',
    accent: 'from-black/5 to-black/10'
  },
  {
    year: '2025',
    title: 'First Series Hackathon',
    description: 'Series launches its first hackathon with a full time offer on the line.',
    accent: 'from-black/5 to-black/10'
  }
]

export default function FuturisticTimeline() {
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-gray-50 to-gray-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="text-[40px] md:text-[64px] font-semibold tracking-tight text-black mb-6">
            The Series Timeline
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300/30 via-gray-300/20 to-gray-300/10 blur-sm" />

            {/* Floating indicators */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-black to-transparent rounded-full"
            />
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-3/4 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-black to-transparent rounded-full"
            />
          </div>

          <div className="space-y-32">
            {timeline.map((item, index) => {
              const reveal = useScrollReveal()
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  ref={reveal.ref}
                  initial={{ opacity: 0, y: 60 }}
                  animate={reveal.visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                >

                  {/* Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-6 z-20">
                    <motion.div whileHover={{ scale: 1.2 }} className="relative">
                      <div className="w-5 h-5 rounded-full bg-white border-2 border-black shadow-lg" />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 w-5 h-5 rounded-full bg-black/10 border border-black/20"
                      />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-[45%] px-6 relative group ${OFFSET}`}>
                    <div className={`absolute top-6 ${isLeft ? 'right-0' : 'left-0'} w-6 h-0.5 bg-black/10`} />
                    <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b ${item.accent} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    <motion.div
                      whileHover={{ y: -5 }}
                      className="
                        bg-white/90
                        backdrop-blur-xl
                        border border-black/5
                        rounded-2xl
                        p-8
                        shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                        hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                        transition-all
                        duration-500
                        relative
                        overflow-hidden
                      "
                    >
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.accent} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-xs tracking-widest text-gray-400 uppercase font-medium">
                            {item.year}
                          </span>
                          <div className="w-8 h-0.5 bg-gray-300 rounded-full" />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-semibold text-black mb-4 leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed text-lg">
                          {item.description}
                        </p>
                      </div>
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
