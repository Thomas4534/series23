import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

const allHeadlines = [
  {
    id: 1,
    title: "Yale Juniors Raise $3.1M In 14 Days For Their AI Social Network",
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
    }, 400)
  }

  const goToPrev = () => {
    if (isTransitioning) return
    setDirection('prev')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + allHeadlines.length) % allHeadlines.length)
      setIsTransitioning(false)
    }, 400)
  }

  const goToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setDirection(index > currentIndex ? 'next' : 'prev')
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 400)
  }

  useEffect(() => {
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex gap-3 justify-center items-center mb-20">
          {allHeadlines.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className="relative focus:outline-none"
            >
              <div className={`transition-all duration-300 ease-out rounded-full ${
                currentIndex === index
                  ? 'h-1.5 w-12 bg-gray-800'
                  : 'h-1.5 w-4 bg-gray-300 hover:bg-gray-400'
              }`} />
            </button>
          ))}
        </div>


        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-10">
            <button
              onClick={goToPrev}
              disabled={isTransitioning}
              className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg disabled:opacity-30 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              className={`transition-all duration-500 ease-out ${
                isTransitioning
                  ? direction === 'next'
                    ? 'opacity-0 translate-x-12'
                    : 'opacity-0 -translate-x-12'
                  : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                <div className="lg:w-1/2">
                  <div className="relative aspect-[5/4] lg:aspect-[4/3] overflow-hidden">
                    <img
                      src={currentHeadline.image}
                      alt={currentHeadline.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-gray-300"></div>
                      <span className="text-base text-gray-500">{currentHeadline.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={getLogoPath(currentHeadline.publication)}
                        alt={currentHeadline.publication}
                        className="h-6 w-auto opacity-90"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-medium text-black leading-tight tracking-tight mb-6">
                        {currentHeadline.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Featured in {currentHeadline.publication} for groundbreaking work in AI and social networking innovation.
                      </p>
                    </div>

                    <div className="pt-8 border-t border-gray-200">
                      <a
                        href="#"
                        className="inline-flex items-center gap-3 text-base text-gray-600 hover:text-black transition-colors group"
                      >
                        <span>Read story</span>
                        <ArrowUpRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <span className="text-sm text-gray-500">
              {currentIndex + 1} / {allHeadlines.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default News
