import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Loader2 } from 'lucide-react'
import { extractPostId, getLinkedInEmbedUrl } from '../utils/linkedin'

const LinkedInPostModal = ({ post, isOpen, onClose }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!isOpen || !post?.url) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    // LinkedIn embed takes a moment to load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isOpen, post])

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const embedUrl = getLinkedInEmbedUrl(post?.url)
  const postId = extractPostId(post?.url)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] glass rounded-2xl border border-white/20 overflow-hidden flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-white/5">
            <h3 className="text-lg md:text-xl font-bold text-white">LinkedIn Post</h3>
            <div className="flex items-center space-x-3">
              <a
                href={post?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg glass hover:bg-white/10 transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Open on LinkedIn</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-data-darker/50 z-10">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-data-accent mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">Loading post...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center p-12 text-center">
                <div>
                  <p className="text-gray-400 mb-4">{error}</p>
                  <a
                    href={post?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-data-accent text-white hover:bg-data-purple transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View on LinkedIn</span>
                  </a>
                </div>
              </div>
            )}

            {embedUrl && !error && (
              <div className="w-full h-full min-h-[600px]">
                <iframe
                  ref={iframeRef}
                  src={embedUrl}
                  height="100%"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen
                  title={`LinkedIn Post ${postId || ''}`}
                  className="w-full h-full min-h-[600px]"
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setError('Failed to load post. Please try opening it directly on LinkedIn.')
                    setLoading(false)
                  }}
                />
              </div>
            )}

            {!embedUrl && !error && (
              <div className="flex items-center justify-center p-12 text-center">
                <div>
                  <p className="text-gray-400 mb-4">Unable to load this post.</p>
                  <a
                    href={post?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-data-accent text-white hover:bg-data-purple transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View on LinkedIn</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="p-4 border-t border-white/10 bg-white/5 text-center">
            <p className="text-xs text-gray-400">
              The embedded post shows real-time engagement stats. Click "Open on LinkedIn" to interact.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default LinkedInPostModal
