"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

export default function Steps() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const steps = [
    {
      number: "1",
      title: "Contact Series",
      description: "Send a message to our phone number."
    },
    {
      number: "2",
      title: "Start Reaching Out",
      description: "Start sending messages or invitations to people."
    },
    {
      number: "3",
      title: "Enjoy",
      description: "Receive new opportunities every day."
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  const boxVariants = {
    hidden: {
      opacity: 0,
      rotateX: -10,
      rotateY: -5
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 0.8
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  // Trigger animation when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  return (
    <div ref={ref} className="flex flex-col items-center w-full mx-auto px-12 md:px-24 py-16 pb-24">
      {/* Top Central Text Section */}
      <motion.div
        className="text-center mb-24 max-w-3xl"
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-700">
          Connect in Three Steps
        </h2>
      </motion.div>

      {/* Steps Container */}
      <motion.div
        className="relative w-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Steps Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-20 md:gap-[130px]">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-start"
              variants={itemVariants}
            >
              {/* Panel - Updated background to match gray-50 to gray-100 gradient */}
              <motion.div
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200/60 shadow-xl mb-8 p-8 flex flex-col justify-center relative overflow-hidden"
                style={{
                  width: "450px",
                  height: "450px"
                }}
                variants={boxVariants}
              >
                {/* Subtle decorative highlight layer to match your Feature3 panel */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-gray-200/10 to-transparent rounded-full"></div>
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-gray-200/10 to-transparent rounded-full"></div>
                </div>

                {/* Message content for each box */}
                {index === 0 && (
                  <div className="space-y-3 relative z-10">
                    {/* User message */}
                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[75%]">
                        <div className="bg-gradient-to-br from-[#2E87FF] to-[#007AFF] text-white rounded-[20px] rounded-br-[6px] px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,122,255,0.25)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Hi Series!</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 right-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 right-0 w-[20px] h-[20px] bg-gradient-to-br from-[#2E87FF] to-[#007AFF] rounded-br-[6px] transform translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Series response */}
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[75%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Hello! How can I help you today?</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* User follow-up */}
                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[75%]">
                        <div className="bg-gradient-to-br from-[#2E87FF] to-[#007AFF] text-white rounded-[20px] rounded-br-[6px] px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,122,255,0.25)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">I'd like to start connecting with people</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 right-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 right-0 w-[20px] h-[20px] bg-gradient-to-br from-[#2E87FF] to-[#007AFF] rounded-br-[6px] transform translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Series confirmation */}
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[75%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Let's do it.</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {index === 1 && (
                  <div className="space-y-3 relative z-10">
                    {/* User message */}
                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[80%]">
                        <div className="bg-gradient-to-br from-[#2E87FF] to-[#007AFF] text-white rounded-[20px] rounded-br-[6px] px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,122,255,0.25)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Looking for someone to go thrift with today</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 right-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 right-0 w-[20px] h-[20px] bg-gradient-to-br from-[#2E87FF] to-[#007AFF] rounded-br-[6px] transform translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Series response */}
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[80%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Search in progress.</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>



                    {/* Series confirmation */}
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[80%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Found 4 profiles.</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {index === 2 && (
                  <div className="space-y-3 relative z-10">
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[75%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Want to hang out this weekend?</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[75%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Interested in a job at our startup?</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[70%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Come to the beach with us!</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.45, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[75%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Coffee chat tomorrow?</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ delay: 0.6, duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="relative max-w-[75%]">
                        <div className="bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border border-gray-300/40 text-gray-900 rounded-[20px] rounded-bl-[6px] px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                          <p className="font-normal text-[16px] leading-[21px] tracking-[-0.3px]">Join our hiking group?</p>
                        </div>
                        {/* Tail using ::after technique */}
                        <div className="absolute bottom-0 left-0 w-[12px] h-[12px] overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-gradient-to-b from-[#F2F2F7] to-[#FFFFFF] border-l border-b border-gray-300/40 rounded-bl-[6px] transform -translate-x-[8px] translate-y-[3px] rotate-45"></div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>

              {/* Text below the box - Left aligned */}
              <motion.div
                className="max-w-[450px]"
                variants={textVariants}
              >
                <div className="flex items-baseline mb-3">
                  <motion.span
                    className="text-4xl font-medium text-gray-400 mr-3"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
                  >
                    {step.number}
                  </motion.span>
                  <motion.h3
                    className="text-4xl font-semibold text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.4 }}
                  >
                    {step.title}
                  </motion.h3>
                </div>
                <motion.p
                  className="text-lg text-gray-500 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}