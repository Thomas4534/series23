import { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import News from './News'
import Convo from './Convo'
import Timeline from './Timeline'


const words = ['founders', 'investors', 'lovers', 'friends']

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

function App() {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [width, setWidth] = useState<number | null>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % words.length
      setCurrentWord(words[index])
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth)
    }
  }, [currentWord])

  const handleSeriesButtonClick = () => {
    window.open('https://tv.series.so/', '_blank')
  }

  const feature1 = useScrollReveal()
  const feature2 = useScrollReveal()
  const feature3 = useScrollReveal()

  return (
    <div className="min-h-screen bg-white text-gray-900 font-mono">

      {/* ✅ Series Logo - Top Left */}
      <div className="fixed top-5 left-6 z-50">
        <div className="relative p-2 hover:scale-110 transition-transform duration-200 ease-out">
          <img
            src="/images/serieslogo.jpeg"
            alt="Series Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        </div>
      </div>

      {/* Series Button - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={handleSeriesButtonClick}
          className="relative p-2 hover:scale-110 transition-transform duration-200 ease-out"
        >
          <img
            src="/images/theseries.svg"
            alt="Series TV"
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      </div>

      <div className="sticky top-0 z-40 bg-white">
        <Header />
      </div>

      <main className="pt-20 pb-40">

        {/* Featured In */}
        <section className="max-w-5xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {[
              'businessinsider.svg',
              'complex.svg',
              'entrepreneur.svg',
              'forbes.svg',
              'foxnews.svg',
              'nbc.svg',
            ].map((logo) => (
              <img
                key={logo}
                src={`/images/${logo}`}
                alt={logo}
                className="h-6 md:h-8 object-contain opacity-80 grayscale-[30%] hover:opacity-100 hover:grayscale-0 hover:scale-105 transition-all duration-300 ease-out"
              />
            ))}
          </div>
        </section>

        <Convo />

        {/* Animated Headline */}
        <section className="max-w-5xl mx-auto px-6 flex justify-center">
          <h1 className="text-[32px] sm:text-[38px] md:text-[50px] lg:text-[65px] xl:text-[80px] font-semibold tracking-tight leading-tight whitespace-nowrap pb-40">
            Connect with{' '}
            <span
              className="inline-block relative text-gray-500 align-bottom"
              style={{
                width: width ? `${width}px` : 'auto',
                transition: 'width 0.6s ease'
              }}
            >
              <span className="absolute inset-0 flex justify-center transition-opacity duration-300 ease-in-out">
                {currentWord}
              </span>
              <span ref={measureRef} className="invisible whitespace-nowrap">
                {currentWord}
              </span>
            </span>{' '}
            instantly.
          </h1>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-6 space-y-24">

          {/* Feature 1 */}
          <div
            ref={feature1.ref}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out transform
            ${feature1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <img
                  src="/images/iphone.jpg"
                  alt="Series app on iPhone"
                  className="w-full object-contain hover:scale-105 transition-transform duration-500 ease-out"
                />
                <img
                  src="/images/chat.png"
                  alt="Chat interface"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 object-contain"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-[32px] sm:text-[38px] md:text-[50px] font-semibold tracking-tight leading-tight text-black">
                Intelligent Matching
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Series uses artificial intelligence to connect you with the right person at the right time.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            ref={feature2.ref}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out transform
            ${feature2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="space-y-6 md:pr-10">
              <h2 className="text-[32px] sm:text-[38px] md:text-[50px] font-semibold tracking-tight leading-tight text-black">
                Activate your Network
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Series strengthens your reach by activating the most valuable connections in your ecosystem.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <img
                  src="/images/iphone.jpg"
                  alt="Series app on iPhone"
                  className="w-full object-contain hover:scale-105 transition-transform duration-500 ease-out"
                />
                <img
                  src="/images/serieslogo.jpeg"
                  alt="Series Logo"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            ref={feature3.ref}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-700 ease-out transform
            ${feature3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <img
                  src="/images/iphone.jpg"
                  alt="Time saving"
                  className="w-full object-contain hover:scale-105 transition-transform duration-500 ease-out"
                />
                <img
                  src="/images/clock.jpg"
                  alt="Time visual"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 object-contain"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-[32px] sm:text-[38px] md:text-[50px] font-semibold tracking-tight leading-tight text-black">
                Stop Wasting Your Time
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Series saves you time by connecting you directly with the right person at the right time.
              </p>
            </div>
          </div>

        </section>

        <Timeline />

        <News />

      </main>

      <Footer />
    </div>
  )
}

export default App
