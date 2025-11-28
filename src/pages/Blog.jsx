import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'

const Blog = () => {
  const [posts, setPosts] = React.useState([])
  
  React.useEffect(() => {
    import('../utils/blog').then(module => {
      try {
        setPosts(module.getAllPosts())
      } catch (e) {
        console.error('Error loading blog posts:', e)
        setPosts([])
      }
    }).catch(e => {
      console.error('Error loading blog module:', e)
      setPosts([])
    })
  }, [])

  return (
    <>
      <SEO
        title="Blog"
        description="Insights on data engineering, architecture, AI agents, and best practices from Haris Bin Saif"
        url="/blog"
      />
      <div className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Insights on data engineering, architecture, AI agents, and best practices
            </p>
          </motion.div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 border border-white/10 hover:border-data-accent/50 transition-all group"
                >
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-data-purple/20 text-data-purple border border-data-purple/30">
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-data-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-data-accent hover:text-data-purple transition-colors font-semibold"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Blog
