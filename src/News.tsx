import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

const allHeadlines = [
  {
    id: 1,
    title: "Yale Juniors Raise $3.1M In 14 Days For Their New AI Social",
    image: '/images/headline2.jpg',
    publication: 'Forbes',
    date: 'Feb 28, 2024'
  },
  {
    id: 2,
    title: 'Two Yale juniors raise $3.1M to redefine social networking',
    image: '/images/headline3.jpg',
    publication: 'Business Insider',
    date: 'Mar 2, 2024'
  },
  {
    id: 3,
    title: "How Two Yale Juniors Just Raised $3.1 Million For Their Social Network",
    image: '/images/headline4.jpg',
    publication: 'Entrepreneur',
    date: 'Mar 8, 2024'
  }
]

// helper to convert publication name to file path
const getLogoPath = (name: string) =>
  `/images/${name.toLowerCase().replace(/\s+/g, '')}.svg`

function News() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState('next')

  const currentHeadline = allHeadlines[currentIndex]

  const goToNext = () => {
    if (isTransitioning) return
    setDirection('next')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % allHeadlines.length)
      setIsTransitioning(false)
    }, 600)
  }

  const goToPrev = () => {
    if (isTransitioning) return
    setDirection('prev')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + allHeadlines.length) % allHeadlines.length)
      setIsTransitioning(false)
    }, 600)
  }

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setDirection(index > currentIndex ? 'next' : 'prev')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 600)
  }

  useEffect(() => {
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 px-6 bg-white font-mono text-gray-900 ">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12 text-center">
          <h2 className="text-[32px] sm:text-[38px] md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 pt-28">
            Featured
          </h2>

          <div className="flex gap-3 mt-8 justify-center items-center">
            {allHeadlines.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`relative rounded-full transition-all duration-500 ease-out ${
                  currentIndex === index
                    ? 'w-12 h-1.5 bg-gray-800'
                    : 'w-4 h-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-gray-800 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-12 h-12 bg-white/90 backdrop-blur-xl border border-gray-300/80 rounded-xl flex items-center justify-center hover:bg-white hover:border-gray-400 transition-all duration-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-12 h-12 bg-white/90 backdrop-blur-xl border border-gray-300/80 rounded-xl flex items-center justify-center hover:bg-white hover:border-gray-400 transition-all duration-300 disabled:opacity-50"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>

          {/* Article Container with smooth slide animation */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-300/80">
            <div
              className={`transition-all duration-600 ease-out ${
                isTransitioning
                  ? direction === 'next'
                    ? 'opacity-0 -translate-x-8'
                    : 'opacity-0 translate-x-8'
                  : 'opacity-100 translate-x-0'
              }`}
            >
              <article className="group flex flex-col lg:flex-row min-h-[450px]">

                {/* IMAGE */}
                <div className="lg:w-1/2 relative overflow-hidden bg-gray-100">
                  <img
                    src={currentHeadline.image}
                    alt={currentHeadline.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />

                  {/* LOGO BADGE */}
                  <div className="absolute top-6 left-6">
                    <div className="px-4 py-3 bg-white/95 backdrop-blur-xl border border-gray-300/80 rounded-xl flex items-center justify-center">
                      <img
                        src={getLogoPath(currentHeadline.publication)}
                        alt={currentHeadline.publication}
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* DATE */}
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1.5 bg-black/80 text-white rounded-xl text-sm font-medium font-mono tracking-wide">
                      {currentHeadline.date}
                    </span>
                  </div>
                </div>

                {/* TEXT */}
                <div className="lg:w-1/2 flex flex-col p-6 lg:p-10">
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-mono font-medium leading-tight text-gray-800 mb-4 tracking-tight">
                      {currentHeadline.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed font-mono">
                      Featured in {currentHeadline.publication} for groundbreaking work in AI and social networking innovation.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-300/80">
                    <a
                      href="#"
                      className="inline-flex items-center gap-3 text-base font-medium text-gray-700 hover:text-gray-900 transition-all group/link font-mono tracking-tight"
                    >
                      READ FULL STORY
                      <ArrowUpRight
                        size={18}
                        className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                      />
                    </a>
                  </div>
                </div>

              </article>
            </div>
          </div>

          <div className="text-center mt-6">
            <span className="text-sm font-medium text-gray-600 font-mono tracking-wide">
              [{currentIndex + 1}/{allHeadlines.length}]
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default News
