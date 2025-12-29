import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle, User, Users, Clock, MessageCircle, TrendingUp, Check } from "lucide-react"

export default function AuthSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [counter, setCounter] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [visibleMessages, setVisibleMessages] = useState<number[]>([])
  const isInView = useRef(false)
  const animationRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)


  const messages = [

    {
      id: 1,
      type: 'sent', 
      size: 'medium',
      horizontalOffset: '-250px', 
      verticalOffset: '-100px',
      rotation: -3,
      delay: 0.2,
      width: 'w-48',
      content: 'Just joined Series - finding connections instantly',
      time: '2 min'
    },
    {
      id: 2,
      type: 'received', 
      size: 'large',
      horizontalOffset: '-420px', 
      verticalOffset: '-130px',
      rotation: -3,
      delay: 0.4,
      width: 'w-56',
      content: 'Found 3 perfect matches in my network already',
      time: '5 min'
    },
    {
      id: 3,
      type: 'sent', 
      size: 'small',
      horizontalOffset: '-350px', 
      verticalOffset: '20px',
      rotation: 2,
      delay: 0.6,
      width: 'w-44',
      content: 'No more endless searching',
      time: '10 min'
    },

    {
      id: 4,
      type: 'received', 
      size: 'medium',
      horizontalOffset: '150px', 
      verticalOffset: '-100px',
      rotation: 3,
      delay: 0.8,
      width: 'w-48',
      content: 'Going on a hike with a new friend !',
      time: '15 min'
    },
    {
      id: 5,
      type: 'sent', 
      size: 'small',
      horizontalOffset: '250px',
      verticalOffset: '30px',
      rotation: 1,
      delay: 1.0,
      width: 'w-44',
      content: 'Saving hours every week',
      time: '20 min'
    },
    {
      id: 6,
      type: 'received', 
      size: 'large',
      horizontalOffset: '330px', 
      verticalOffset: '-110px',
      rotation: 3,
      delay: 1.2,
      width: 'w-56',
      content: 'Everyone on Series is so responsive',
      time: '25 min'
    },
  ]

  useEffect(() => {
    if (!animationRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
  
            isInView.current = true

  
            setHasStarted(true)
            setVisibleMessages([])


            setCounter(0)


            messages.forEach((msg) => {
              setTimeout(() => {
                setVisibleMessages(prev => [...prev, msg.id])
              }, msg.delay * 1000)
            })


            const increment = Math.ceil(500000 / 100)
            const interval = setInterval(() => {
              setCounter(prev => {
                const next = prev + increment
                if (next >= 500000) {
                  clearInterval(interval)
                  return 500000
                }
                return next
              })
            }, 30)


            const intervalId = interval

 
            return () => clearInterval(intervalId)
          } else {
 
            isInView.current = false
            setHasStarted(false)
          }
        })
      },
      {
        threshold: 0.2, 
        rootMargin: '0px'
      }
    )

    observerRef.current.observe(animationRef.current)

    return () => {
      if (observerRef.current && animationRef.current) {
        observerRef.current.unobserve(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (hasStarted && counter < 500000 && isInView.current) {
      const increment = Math.ceil(500000 / 100)
      intervalId = setInterval(() => {
        setCounter(prev => {
          const next = prev + increment
          if (next >= 500000) {
            clearInterval(intervalId!)
            return 500000
          }
          return next
        })
      }, 30)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [hasStarted, counter])

  useEffect(() => {
    let timers: NodeJS.Timeout[] = []

    if (hasStarted) {
      setVisibleMessages([])

      timers = messages.map((msg) =>
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, msg.id])
        }, msg.delay * 1000)
      )
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [hasStarted])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 2000)
  }

  return (
    <section ref={animationRef} className="w-full py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="absolute inset-0 hidden lg:block">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={false} 
              animate={{
                opacity: visibleMessages.includes(msg.id) ? 1 : 0,
                x: visibleMessages.includes(msg.id) ? msg.horizontalOffset :
                    msg.horizontalOffset.startsWith('-') ? `calc(${msg.horizontalOffset} - 80px)` : `calc(${msg.horizontalOffset} + 80px)`,
                y: visibleMessages.includes(msg.id) ? msg.verticalOffset :
                    `calc(${msg.verticalOffset} ${msg.horizontalOffset.startsWith('-') ? '-' : '+'} 40px)`,
                rotate: visibleMessages.includes(msg.id) ? msg.rotation : msg.rotation * 1.5,
                scale: visibleMessages.includes(msg.id) ? 1 : 0.85
              }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className={`absolute ${msg.width}`}
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${msg.rotation}deg)`,
                marginLeft: msg.horizontalOffset
              }}
            >
              <div className={`relative rounded-2xl p-3.5 shadow-lg backdrop-blur-[2px] border ${
                msg.type === 'sent'
                  ? 'bg-gradient-to-br from-blue-50/95 to-blue-100/80 border-blue-200/60'
                  : 'bg-gradient-to-br from-neutral-50/95 to-neutral-100/80 border-neutral-200/60'
              }`}>

                <div className="relative z-10">

                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      msg.type === 'sent' ? 'bg-blue-500' : 'bg-neutral-600'
                    }`}>
                      {msg.type === 'sent' ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Users className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className={`text-xs font-medium ${
                      msg.type === 'sent' ? 'text-blue-700' : 'text-neutral-700'
                    }`}>
                      {msg.type === 'sent' ? 'You' : 'Network'}
                    </span>
                    <span className="text-xs text-neutral-400 ml-auto flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {msg.time}
                    </span>
                  </div>


                  <p className={`text-sm leading-snug mb-1.5 ${
                    msg.type === 'sent' ? 'text-blue-900' : 'text-neutral-900'
                  }`}>
                    {msg.content}
                  </p>


                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      {msg.type === 'sent' ? (
                        <>
                          <Check className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-blue-500">Delivered</span>
                        </>
                      ) : (
                        <>
                          <MessageCircle className="w-3 h-3 text-neutral-500" />
                          <span className="text-xs text-neutral-500">Reply</span>
                        </>
                      )}
                    </div>

                  </div>
                </div>


                <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-2xl pointer-events-none ${
                  msg.type === 'sent' ? 'mix-blend-overlay' : 'mix-blend-soft-light'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto relative z-10"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-black/5 rounded-full blur-md"></div>
                  <CheckCircle className="w-16 h-16 text-black relative z-10" />
                </motion.div>

                <div className="space-y-2">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-medium text-black tracking-tight"
                  >
                    You're on the list
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-neutral-600 text-sm"
                  >
                    We'll text you shortly with next steps.
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-10"
              >
                <div className="text-center space-y-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl font-medium text-black tracking-tight mt-24 whitespace-nowrap"
                  >
                    Join{" "}
                    <span className="text-gray-800">
                      {counter.toLocaleString()}
                    </span>
                    + on Series
                  </motion.h2>


                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >

                  <motion.div
                    className="relative group"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                    <input
                      type="tel"
                      placeholder="+1 (123) 456-7890"
                      required
                      className="
                        relative
                        w-full
                        bg-white
                        py-4 px-6
                        text-lg
                        rounded-xl
                        border border-neutral-200/80
                        shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)]
                        outline-none
                        transition-all duration-300
                        focus:border-black
                        focus:shadow-[0_0_0_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.05)]
                        placeholder:text-neutral-400
                        group-focus-within:border-black/30
                      "
                    />

                    <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent group-focus-within:border-black/10 transition-colors duration-300"></div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      w-full
                      px-10
                      py-4
                      bg-black
                      text-white
                      font-medium
                      rounded-full
                      hover:bg-gray-800
                      transition-all
                      duration-300
                      ease-out
                      transform
                      hover:scale-105
                      active:scale-95
                      shadow-lg
                      mb-4
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-xs text-neutral-400 pt-2"
                  >
                    By continuing, you agree to our Terms and Privacy Policy
                  </motion.p>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
