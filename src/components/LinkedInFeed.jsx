import { useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Heart, MessageCircle, Share2 } from 'lucide-react'
import LinkedInPostModal from './LinkedInPostModal'

const LinkedInFeed = () => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Your actual LinkedIn posts
  // Update likes, comments, shares manually or via a backend service
  const posts = [
    {
      id: 1,
      title: 'Old Data Engineer Writes ETL Scripts',
      excerpt: 'Sharing insights on data engineering practices and ETL development from my experience...',
      date: 'Recent',
      likes: 0, // Update this manually or fetch from backend
      comments: 0, // Update this manually or fetch from backend
      shares: 0, // Update this manually or fetch from backend
      url: 'https://www.linkedin.com/posts/haris-bin-saif_old-data-engineer-writes-etl-scripts-in-activity-7369049941555531776-Pz2C',
    },
  ]

  const handlePostClick = (e, post) => {
    e.preventDefault()
    if (post.url && post.url !== '#') {
      setSelectedPost(post)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  return (
    <>
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 mb-4">
              <Linkedin className="w-8 h-8 text-data-accent" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Latest <span className="text-gradient">Thoughts</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Sharing insights on data engineering, architecture, and best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                onClick={(e) => handlePostClick(e, post)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-data-accent/50 transition-all group flex flex-col cursor-pointer"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Linkedin className="w-5 h-5 text-data-accent" />
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-data-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-300 mb-6 flex-grow leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    {post.likes > 0 && (
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes.toLocaleString()}</span>
                      </div>
                    )}
                    {post.comments > 0 && (
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.toLocaleString()}</span>
                      </div>
                    )}
                    {post.shares > 0 && (
                      <div className="flex items-center space-x-1">
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares.toLocaleString()}</span>
                      </div>
                    )}
                    {post.likes === 0 && post.comments === 0 && post.shares === 0 && (
                      <span className="text-xs text-gray-500">Click to view</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://www.linkedin.com/in/haris-bin-saif"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg glass border border-white/20 hover:border-data-accent/50 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>Follow on LinkedIn</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <LinkedInPostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}

export default LinkedInFeed
