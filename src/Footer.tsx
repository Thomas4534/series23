import { Twitter, Linkedin, ArrowUpRight } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-gray-300/80 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-gray-500 text-sm font-mono">

        {/* Left - Simplified */}
        <div className="text-gray-600 font-medium">
          © 2025 SERIES
        </div>

        {/* Center - Clean Nav */}
        <div className="flex items-center gap-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-gray-900 transition-colors duration-200 tracking-wide">PRIVACY</a>
          <a href="#" className="hover:text-gray-900 transition-colors duration-200 tracking-wide">TERMS</a>
          <a href="#" className="hover:text-gray-900 transition-colors duration-200 tracking-wide">CONTACT</a>
        </div>

        {/* Right - Minimal Social + Top */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium tracking-wide"
          >
            TOP
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>
    </footer>
  )
}

export default Footer