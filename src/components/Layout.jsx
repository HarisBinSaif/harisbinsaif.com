import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, Linkedin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import InteractiveBackground from './InteractiveBackground'

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Open Source', path: '/#opensource' },
    { name: 'Blog', path: '/blog' },
  ]

  return (
    <div className="min-h-screen bg-data-darker" style={{ minHeight: '100vh', backgroundColor: '#050812', position: 'relative' }}>
      {/* Interactive Background Animation - Full Screen */}
      <InteractiveBackground />
      
      {/* Grid overlay */}
      <div className="fixed inset-0 -z-10 data-grid opacity-15" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-data-dark/20 via-transparent to-data-darker" />

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-4' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">
            Haris Bin Saif
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-data-accent ${
                  location.pathname === item.path ? 'text-data-accent' : 'text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 ml-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 glass rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass mt-4 mx-6 rounded-lg overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-300 hover:text-data-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-24 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Haris Bin Saif. Built with React & passion for data engineering.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout

