import { Sparkles, Zap, Users, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight">Series</div>
          <button className="px-5 py-2 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
            Join Waitlist
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <section className="max-w-4xl mx-auto px-6 text-center mb-32">
          <div className="inline-block mb-6 px-3 py-1 border border-white/20 rounded-full text-xs tracking-wide">
            NOW IN BETA
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            The AI Social Network
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect, create, and collaborate with AI-powered conversations.
            A new way to build meaningful connections.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-all flex items-center gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 border border-white/20 hover:bg-white/5 transition-colors font-medium">
              Learn More
            </button>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-32">
          <div className="border border-white/10 p-8 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Native</h3>
            <p className="text-white/60 leading-relaxed">
              Built from the ground up with AI at its core. Experience conversations that adapt and evolve.
            </p>
          </div>

          <div className="border border-white/10 p-8 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
            <p className="text-white/60 leading-relaxed">
              Real-time interactions powered by cutting-edge infrastructure. Zero lag, infinite possibilities.
            </p>
          </div>

          <div className="border border-white/10 p-8 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community First</h3>
            <p className="text-white/60 leading-relaxed">
              Join a growing network of creators, thinkers, and innovators shaping the future together.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to join?</h2>
          <p className="text-white/60 mb-8 text-lg">
            Be part of the next generation of social networking.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
            />
            <button className="px-6 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors whitespace-nowrap">
              Sign Up
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-white/40 text-sm">
          © 2025 Series. The AI Social Network.
        </div>
      </footer>
    </div>
  );
}

export default App;
