import { useEffect, useState } from 'react'

export default function Feature3() {
  const [timeSavingState, setTimeSavingState] = useState<'initial' | 'searching' | 'found'>('initial')
  const [progress, setProgress] = useState(0)
  const [foundConnections, setFoundConnections] = useState<number[]>([])
  const [exitingState, setExitingState] = useState<'searching' | 'found' | 'initial' | null>(null)
  const [showSearchIcon, setShowSearchIcon] = useState(true)
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'searchIconFadeOut' | 'messageSlideIn' | 'searchingAppear' | 'connectionsAppear' | 'connectionsDisappear' | 'searchIconFadeIn'>('idle')

  // Start time saving search animation
  const startTimeSavingSearch = () => {
    setAnimationPhase('searchIconFadeOut')

    setTimeout(() => {
      setShowSearchIcon(false)
      setTimeSavingState('searching')
      setAnimationPhase('messageSlideIn')
      setProgress(0)
      setFoundConnections([])

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setTimeSavingState('found')
              setAnimationPhase('connectionsAppear')
              // Staggered appearance of connections with slightly longer gaps for smoothness
              setTimeout(() => setFoundConnections([1]), 100)
              setTimeout(() => setFoundConnections([1, 2]), 250)
              setTimeout(() => setFoundConnections([1, 2, 3]), 400)
            }, 400)
            return 100
          }
          return prev + 2
        })
      }, 30)
    }, 500)
  }

  const resetConversation = () => {
    if (timeSavingState === 'found') {
      setAnimationPhase('connectionsDisappear')
      setExitingState('found')
    } else {
      setExitingState('searching')
    }

    setTimeout(() => {
      setTimeSavingState('initial')
      setExitingState(null)
      setFoundConnections([])
      setProgress(0)
      setAnimationPhase('searchIconFadeIn')
      setShowSearchIcon(true)

      setTimeout(() => {
        setAnimationPhase('idle')
      }, 700)
    }, 800)
  }

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      startTimeSavingSearch()
    }, 2000)

    const animationLoop = setInterval(() => {
      resetConversation()
      setTimeout(() => {
        startTimeSavingSearch()
      }, 3000)
    }, 12000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(animationLoop)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center pb-48">
      <div>
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-200/50 backdrop-blur-sm h-[480px]">
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-gray-200/10 to-transparent rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-gray-200/10 to-transparent rounded-full"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Search</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">
                  {timeSavingState === 'initial' ? 'Ready' :
                   timeSavingState === 'searching' ? 'Searching' :
                   'Results Found'}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
              {(timeSavingState !== 'initial' || exitingState) && (
                <div className={`flex justify-end mb-6 transition-all duration-700 ${
                  exitingState ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
                } ${animationPhase === 'messageSlideIn' ? 'animate-messageSlideIn' : ''}`}>
                  <div className="max-w-[70%]">
                    <img
                      src="/images/blue1.svg"
                      alt="Request"
                      className="w-full h-auto rounded-2xl shadow-sm"
                    />
                  </div>
                </div>
              )}

              {(timeSavingState === 'searching' && !exitingState) && (
                <div className="h-48 flex flex-col items-center justify-center animate-searchAppear">
                  <div className="w-full max-w-xs space-y-6">
                    <div className="flex justify-center space-x-2">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-smoothPulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-gray-800 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {(timeSavingState === 'found' || exitingState === 'found') && (
                <div className={`space-y-3 transition-all duration-500 ${
                  exitingState === 'found' ? 'opacity-0 -translate-y-4' : 'opacity-100'
                }`}>
                  {[1, 2, 3].map((id) => (
                    <div
                      key={id}
                      className={`flex items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-700 ease-out ${
                        foundConnections.includes(id)
                          ? 'opacity-100 translate-y-0 scale-100 blur-0'
                          : 'opacity-0 translate-y-8 scale-95 blur-sm'
                      }`}
                      style={{
                        transitionDelay: `${id * 50}ms`,
                        // Use a specific bounce class only when they first appear
                        animation: foundConnections.includes(id) && animationPhase === 'connectionsAppear'
                          ? 'connectionBounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                          : 'none'
                      }}
                    >
                      <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold mr-4">
                        {id === 1 ? 'JD' : id === 2 ? 'SJ' : 'MR'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {id === 1 ? 'Thomas Small' : id === 2 ? 'Sarah Johnson' : 'Mike Rodriguez'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {id === 1 ? 'Senior React Developer' : id === 2 ? 'Full Stack Engineer' : 'Backend Specialist'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(timeSavingState === 'initial' && showSearchIcon) && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  animationPhase === 'searchIconFadeOut' ? 'opacity-0 scale-90' :
                  animationPhase === 'searchIconFadeIn' ? 'animate-searchIconFadeIn' : 'opacity-100'
                }`}>
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 font-medium">Ready to assist</p>
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            @keyframes smoothPulse {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            .animate-smoothPulse { animation: smoothPulse 1.5s infinite ease-in-out; }

            @keyframes messageSlideIn {
              0% { opacity: 0; transform: translateX(30px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            .animate-messageSlideIn { animation: messageSlideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

            @keyframes searchAppear {
              0% { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-searchAppear { animation: searchAppear 0.5s ease-out forwards; }

            @keyframes connectionBounceIn {
              0% { opacity: 0; transform: translateY(25px) scale(0.9); filter: blur(4px); }
              100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
            }

            @keyframes searchIconFadeIn {
              0% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-searchIconFadeIn { animation: searchIconFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          `}</style>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-700 pb-4">Save Time</h2>
        <p className="text-gray-600 leading-relaxed">Get access to qualified connections without searching. <br/> Get matched with people that matter. </p>
      </div>
    </div>
  )
}