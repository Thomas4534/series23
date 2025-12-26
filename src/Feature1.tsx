import { useEffect, useRef, useState } from 'react'

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

const profiles = [
  { id: 1, name: 'Brian', role: 'Tech Entrepreneur', compatibility: 92 },
  { id: 2, name: 'Katie', role: 'Runner', compatibility: 87 },
  { id: 3, name: 'Daniel', role: 'Editor', compatibility: 95 },
  { id: 4, name: 'Britany', role: 'Artist', compatibility: 89 },
]

export default function Feature1() {
  const [matchingState, setMatchingState] = useState<'idle' | 'matching' | 'matched'>('idle')
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null)
  const [matchResult, setMatchResult] = useState<{ profileId: number; compatibility: number } | null>(null)
  const [showMatchPopup, setShowMatchPopup] = useState(false)

  const runMatchCycle = () => {
    setMatchingState('matching')
    setMatchResult(null)
    setSelectedProfile(null)
    setShowMatchPopup(false)

    setTimeout(() => {
      const targetProfile = Math.floor(Math.random() * 3) + 2;
      setSelectedProfile(targetProfile)
      setMatchingState('matched')
      setMatchResult({
        profileId: targetProfile,
        compatibility: profiles[targetProfile - 1].compatibility
      })

      setTimeout(() => {
        setShowMatchPopup(true)
      }, 400)

      setTimeout(() => {
        setShowMatchPopup(false)
        setMatchingState('idle')
        setTimeout(() => {
          setSelectedProfile(null)
          setMatchResult(null)
        }, 600)
      }, 3500)
    }, 1200)
  }

  useEffect(() => {
    const startTimeout = setTimeout(() => runMatchCycle(), 1500)
    const loopInterval = setInterval(() => runMatchCycle(), 7500)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(loopInterval)
    }
  }, [])

  const feature1 = useScrollReveal()

  return (
    <div
      ref={feature1.ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-32 items-center transition-all duration-[1000ms] cubic-bezier(0.23, 1, 0.32, 1) ${
        feature1.visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="flex flex-col items-center justify-center transform scale-115">
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl px-8 py-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-200/40">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-12">
              <div className="animate-fadeInUp">
                <h3 className="text-base font-medium text-gray-800">Match Analytics</h3>
              </div>
              <div className="flex items-center space-x-2 px-1 py-1.5 transition-all duration-500">
                <span className="text-xs font-medium text-gray-700">
                  {matchingState === 'idle' ? 'Calculating' :
                   matchingState === 'matching' ? 'Scanning...' :
                   'Verified Match'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 relative h-[160px] items-center">
              {/* Profile 1 (You) */}
              <div className={`relative transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${
                matchingState === 'matched' ? 'z-10 scale-105' : ''
              }`}>
                <div className="bg-white rounded-xl p-3 border border-gray-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="relative aspect-square mb-2 overflow-hidden rounded-lg bg-gray-100">
                    <img src="/images/profile1.jpg" alt="You" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xs font-medium text-gray-800">Brian</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">Engineer</p>
                  </div>
                </div>
              </div>

              {/* Profiles 2, 3, 4 */}
              {[2, 3, 4].map((id) => {
                const isSelected = selectedProfile === id;
                const isMatching = matchingState === 'matching';
                const isMatched = matchingState === 'matched';

                return (
                  <div
                    key={id}
                    className={`relative transition-all duration-[800ms] cubic-bezier(0.34, 1.56, 0.64, 1) ${
                      (isMatching || isMatched) && !isSelected
                        ? 'opacity-0 scale-75 translate-y-4 pointer-events-none absolute'
                        : 'opacity-100 scale-100 translate-y-0'
                    } ${isMatched && isSelected ? 'col-start-4 z-20 scale-105' : ''}`}
                    style={{ transitionDelay: isSelected ? '0ms' : `${(id - 1) * 50}ms` }}
                  >
                    <div className="bg-white rounded-xl p-3 border border-gray-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-700">
                      <div className="relative aspect-square mb-2 overflow-hidden rounded-lg bg-gray-100">
                        <img src={`/images/profile${id}.jpg`} alt={`Profile ${id}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-center">
                        <h4 className="text-xs font-medium text-gray-800 truncate">{profiles[id-1].name}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5 truncate">{profiles[id-1].role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Compatibility Popup */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-48 z-40 transition-all duration-700 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${
                showMatchPopup ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none blur-sm'
              }`}>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-blue-200 animate-bounce-slow">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-xl font-bold text-gray-800 tracking-tight">
                      {matchResult?.compatibility}%
                    </div>
                    <p className="text-[10px] font-medium text-gray-500 mt-1 tracking-wider">
                      Match Score
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-5xl font-medium text-gray-800 animate-fadeInLeft pb-4">
            Intelligent Matching
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-md animate-fadeInLeft delay-100">
            Discover meaningful connections through our sophisticated compatibility algorithms.
          </p>
        </div>
      </div>

      <style jsx>{`
        .scale-115 { transform: scale(1.15); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes pop { 0% { transform: scale(0.8); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes bulletIn { from { transform: scale(0); } to { transform: scale(1); } }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-pop { animation: pop 0.4s ease-out forwards; }
        .animate-bulletIn { animation: bulletIn 0.5s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; }
      `}</style>
    </div>
  )
}