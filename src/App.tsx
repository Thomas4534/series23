import { useEffect, useRef, useState } from 'react'
import Footer from './Footer'
import News from './News'
import Timeline from './Timeline'
import Try from './Try'
import Features from './Features'

// Updated words array to include dates, people, and relationship types
const words = ['founders', 'investors', 'a date', 'friends', 'cofounders', 'mentors', 'clients', 'partners']

function App() {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [nextWord, setNextWord] = useState(words[1])
  const [isAnimating, setIsAnimating] = useState(false)
  const [width, setWidth] = useState<number | null>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const wordIndexRef = useRef(0)

  // Animation interval for word cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      // Start fade out current word
      setTimeout(() => {
        // Update to next word
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        setCurrentWord(words[wordIndexRef.current])

        // Set the word after next for smooth preparation
        const nextIndex = (wordIndexRef.current + 1) % words.length
        setNextWord(words[nextIndex])

        // Reset width measurement
        if (measureRef.current) {
          setWidth(measureRef.current.offsetWidth)
        }

        // Complete animation
        setTimeout(() => {
          setIsAnimating(false)
        }, 200)
      }, 400)
    }, 3000) // Change word every 3 seconds

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

  const handleTryItOutClick = () => {
    console.log('Try it out clicked')
  }

  const handleMakeAccountClick = () => {
    console.log('Make account clicked')
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-poppins">

      {/* Series Logo - Top Left */}
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

        {/* Floating Autoplay Video - FIXED FOR BORDER ISSUE */}
        <section className="w-full flex justify-center -mt-1">
          <div className="w-full max-w-4xl px-6">
            <div className="relative overflow-hidden bg-white">
              {/* Main video container with negative margins to prevent edge artifacts */}
              <div className="relative overflow-hidden -mx-[2px] -my-[2px]">
                <video
                  src="/videos/NewLandingPageAssets.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-auto block"
                  style={{
                    display: 'block',
                    lineHeight: 0,
                    // Ensure no sub-pixel edges
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                    MozTransform: 'translateZ(0)',
                    // Force pixel snapping
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    MozBackfaceVisibility: 'hidden',
                    // Hide any potential edges
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                  }}
                />
              </div>

              {/* Single white overlay on all sides to hide any remaining edges */}
              <div className="absolute inset-0 border-[2px] border-white pointer-events-none z-10"></div>
            </div>
          </div>
        </section>

        {/* Animated Headline with CTA Buttons */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center">
            {/* Headline */}
            <h1 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[55px] xl:text-[80px] font-semibold tracking-tight leading-tight whitespace-nowrap pb-10 text-gray-700 pt-24">
              Smarter way to connect with{' '}
              <span
                className="inline-block relative mx-3"
                style={{
                  width: width ? `${width}px` : 'auto',
                  transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* Main container with smooth opacity transition */}
                <span className="relative inline-block">
                  {/* Current word with fade out */}
                  <span
                    className="text-gray-500 inline-block transition-all duration-500 ease-out"
                    style={{
                      opacity: isAnimating ? 0 : 1,
                      transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)',
                    }}
                  >
                    {currentWord}
                  </span>

                  {/* Next word with fade in */}
                  <span
                    className="text-gray-500 absolute top-0 left-0 inline-block transition-all duration-500 ease-out"
                    style={{
                      opacity: isAnimating ? 1 : 0,
                      transform: isAnimating ? 'translateY(0)' : 'translateY(10px)',
                    }}
                  >
                    {nextWord}
                  </span>
                </span>

                {/* Invisible span for width measurement */}
                <span ref={measureRef} className="invisible absolute whitespace-nowrap">
                  {currentWord}
                </span>
              </span>
            </h1>

            {/* Try it out Button */}
            <button
              onClick={handleTryItOutClick}
              className="px-10 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-lg mb-4"
            >
              Try it out
            </button>

            {/* Account Text */}
            <div className="text-center">
              <span className="text-gray-400 text-sm">
                Don't have an account yet?{' '}
                <button
                  onClick={handleMakeAccountClick}
                  className="text-gray-600 hover:text-black font-medium underline transition-colors duration-200"
                >
                  Make one now
                </button>
              </span>
            </div>
          </div>
        </section>

        {/* Features Section - Imported from Features.tsx */}
        <Features />

        <div className="mt-24">
        <Try />
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default App