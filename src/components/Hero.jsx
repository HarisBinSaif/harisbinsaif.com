import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 pb-20">
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mx-auto"
            >
              <Sparkles size={16} className="text-data-accent" />
              <span className="text-sm text-gray-300">Data Engineer & AI Architect</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              <span className="text-gradient">Designing</span>
              <br />
              <span className="text-white">Data Architectures</span>
              <br />
              <span className="text-gradient">That Scale</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              I architect scalable data systems, share best practices, and lead teams
              in building intelligent solutions that transform businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-data-accent to-data-purple text-white font-semibold glow-effect"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg glass text-white font-semibold border border-white/20"
              >
                Read My Blog
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto mb-16"
            >
              {[
                { label: 'Years Experience', value: '5+' },
                { label: 'Projects', value: '50+' },
                { label: 'Open Source', value: '20+' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className="text-center p-4 rounded-lg glass"
                >
                  <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator - Below stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="cursor-pointer mt-8"
              onClick={scrollToContent}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center space-y-2"
              >
                <span className="text-sm text-gray-400">Scroll to explore</span>
                <ArrowDown size={24} className="text-data-accent" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

