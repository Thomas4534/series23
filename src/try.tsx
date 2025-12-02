import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function AuthSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 2000)
  }

  return (
    <section className="w-full py-10 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-md mx-auto text-center px-6"
      >

        {/* Success */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5"
          >
            <CheckCircle className="w-12 h-12 text-black" />
            <p className="text-lg text-black tracking-tight">
              We’ll text you shortly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-4xl font-medium text-black tracking-tight">
              Join Series
            </h2>

            {/* Clean minimal “slot” input */}
            <motion.input
              type="tel"
              placeholder="Your phone number"
              required
              className="
                w-full
                bg-white
                py-4 px-5
                text-lg
                rounded-xl
                border border-neutral-200
                shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]
                outline-none
                transition-all duration-300
                focus:border-black
                focus:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]
              "
              whileFocus={{ scale: 1.01 }}
            />

            <motion.button
              type="submit"
              whileHover={{ opacity: 0.7 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3
                         text-black font-medium transition-opacity"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </section>
  )
}
