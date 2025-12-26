import { useEffect, useState } from 'react'

const locations = [
  { id: 1, city: 'San Francisco', x: 10, y: 50, message: 'Looking for React developer!' },
  { id: 2, city: 'New York', x: 45, y: 70, message: 'Anyone hitting the club later?' },
  { id: 3, city: 'Houston', x: 80, y: 50, message: 'I need a running buddy!' },
]

export default function Feature2() {
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'activating' | 'active' | 'fading'>('idle')
  const [visibleLocations, setVisibleLocations] = useState<number[]>([])
  const [connectionLines, setConnectionLines] = useState<{from: number, to: number}[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [showNetworkIcon, setShowNetworkIcon] = useState(true)
  const [iconAnimationPhase, setIconAnimationPhase] = useState<'idle' | 'iconFadeOut' | 'iconFadeIn'>('idle')

  const startNetworkAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);


    setIconAnimationPhase('iconFadeOut');

    setTimeout(() => {
      setShowNetworkIcon(false);
      setIconAnimationPhase('idle');


      setAnimationPhase('activating');
      setVisibleLocations([]);
      setConnectionLines([]);


      setTimeout(() => {
        setVisibleLocations([1]);


        setTimeout(() => {
          setVisibleLocations([1, 2]);
          setConnectionLines([{from: 1, to: 2}]);


          setTimeout(() => {
            setVisibleLocations([1, 2, 3]);
            setConnectionLines([
              {from: 1, to: 2},
              {from: 2, to: 3},
              {from: 1, to: 3}
            ]);

 
            setTimeout(() => {
              setAnimationPhase('active');


              setTimeout(() => {
                setAnimationPhase('fading');

  
                setTimeout(() => {
                  setVisibleLocations([]);
                  setTimeout(() => {
                    setConnectionLines([]);
                    setAnimationPhase('idle');


                    setTimeout(() => {
                      setIconAnimationPhase('iconFadeIn');
                      setShowNetworkIcon(true);

                      setTimeout(() => {
                        setIconAnimationPhase('idle');
                        setIsAnimating(false);
                      }, 700);
                    }, 400);
                  }, 400);
                }, 600);
              }, 3000);
            }, 400);
          }, 600);
        }, 600);
      }, 300);
    }, 500); 
  }

  useEffect(() => {
    const timer = setTimeout(() => startNetworkAnimation(), 2000)
    const interval = setInterval(() => startNetworkAnimation(), 11000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <div className="space-y-4 order-2 md:order-1 animate-fadeInLeft">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-700 animate-fadeInUp pb-4">
          Activate your Network
        </h2>
        <p className="text-gray-400 leading-relaxed animate-fadeInUp delay-100">
          Connect with people globally through a network. <br/>
          Meet people from around the world.
        </p>
      </div>

      <div className="order-1 md:order-2">

        <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-200/50 backdrop-blur-sm min-h-[340px] flex flex-col">
          <div className="relative z-10 h-full w-full">
            <div className="flex justify-between items-center mb-8 animate-fadeInUp">
              <h3 className="text-lg font-medium text-gray-900">Network Map</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 transition-all duration-500 font-medium">
                  {animationPhase === 'idle' ? 'Ready' :
                   animationPhase === 'activating' ? 'Activating...' :
                   animationPhase === 'active' ? 'Network Active' :
                   'Syncing...'}
                </span>
              </div>
            </div>

            {(animationPhase === 'idle' && showNetworkIcon) && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                iconAnimationPhase === 'iconFadeOut' ? 'opacity-0 scale-90' :
                iconAnimationPhase === 'iconFadeIn' ? 'animate-iconFadeIn' : 'opacity-100'
              }`} style={{ zIndex: 20 }}>
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="7" cy="7" r="2" strokeWidth="1.5" fill="currentColor" />
                    <circle cx="17" cy="7" r="2" strokeWidth="1.5" fill="currentColor" />
                    <circle cx="12" cy="17" r="2" strokeWidth="1.5" fill="currentColor" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M7 7L12 17M17 7L12 17M7 7L17 7" />
                  </svg>
                </div>
                <p className="text-gray-400 font-medium">Ready to connect</p>
              </div>
            )}

            <div className="relative w-full h-56 mb-2">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connectionLines.map((line, index) => {
                  const fromLoc = locations.find(l => l.id === line.from);
                  const toLoc = locations.find(l => l.id === line.to);
                  if (!fromLoc || !toLoc) return null;

                  return (
                    <path
                      key={`line-${index}`}
                      d={`M ${fromLoc.x}% ${fromLoc.y}% L ${toLoc.x}% ${toLoc.y}%`}
                      stroke="url(#connection-gradient)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="200"
                      className={`transition-all duration-[1200ms] ease-in-out ${
                        animationPhase === 'fading' ? 'opacity-0 stroke-dashoffset-[200]' : 'opacity-100 stroke-dashoffset-0'
                      }`}
                      style={{
                        strokeDashoffset: animationPhase === 'active' || animationPhase === 'activating' ? 0 : 200,
                        transitionDelay: `${index * 150}ms`
                      }}
                    />
                  );
                })}

                <defs>
                  <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>


              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                    visibleLocations.includes(location.id) && animationPhase !== 'fading'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'
                  }`}
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                  }}
                >
                  <div className={`relative ${animationPhase === 'active' ? 'animate-float-subtle' : ''}`}>
                    <div className={`absolute inset-0 w-12 h-12 -m-3 rounded-full transition-all duration-700 ${
                      animationPhase === 'active'
                        ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-pulse-subtle'
                        : 'opacity-0'
                    }`}></div>

                    <div className="relative w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-lg
                                  flex items-center justify-center ring-2 ring-white/50">
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/40 rounded-full"></div>

                      <div className="w-2 h-2 bg-white/90 rounded-full"></div>

                      <span className="absolute text-xs font-bold text-white opacity-90">
                        {location.city.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {locations.map((location) => (
                <div
                  key={`msg-${location.id}`}
                  className={`absolute transform transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${
                    visibleLocations.includes(location.id) && animationPhase !== 'fading'
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-4 scale-95 blur-sm'
                  }`}
                  style={{
                    left: `${location.x - 10}%`,
                    top: `${location.y - 30}%`,
                    transitionDelay: visibleLocations.includes(location.id) ? '200ms' : '0ms'
                  }}
                >
                  <div className="bg-gradient-to-br from-white to-blue-50/90 rounded-xl p-3 border border-blue-100
                                shadow-[0_8px_20px_rgba(59,130,246,0.08)] backdrop-blur-sm max-w-[140px]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                      <span className="text-xs font-bold text-blue-700 tracking-tight">{location.city}</span>
                    </div>
                    <p className="text-[11px] leading-tight text-gray-700 font-medium opacity-90">{location.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatGentle { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes floatSubtle { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-4px) scale(1.02); } }
        @keyframes pulseGentle { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.04); opacity: 0.9; } }
        @keyframes pulseSubtle { 0%, 100% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.1); opacity: 0.1; } }
        @keyframes pop { 0% { transform: scale(0.8); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes bulletIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes iconFadeIn { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }

        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-float-gentle { animation: floatGentle 3s ease-in-out infinite; }
        .animate-float-subtle { animation: floatSubtle 3.5s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulseGentle 2s ease-in-out infinite; }
        .animate-pulse-subtle { animation: pulseSubtle 3s ease-in-out infinite; }
        .animate-pop { animation: pop 0.4s ease-out forwards; }
        .animate-bulletIn { animation: bulletIn 0.5s ease-out forwards; }
        .animate-iconFadeIn { animation: iconFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .stroke-dashoffset-0 { stroke-dashoffset: 0; }
        .stroke-dashoffset-\[200\] { stroke-dashoffset: 200; }
      `}</style>
    </div>
  )
}
