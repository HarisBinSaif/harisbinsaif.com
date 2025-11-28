import { motion } from 'framer-motion'
import { Linkedin, Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react'

const LinkedInFeed = () => {
  // In production, you'd fetch this from LinkedIn API or RSS feed
  const posts = [
    {
      id: 1,
      title: 'The Future of Data Engineering: AI-Powered Pipelines',
      excerpt: 'Exploring how AI agents are revolutionizing data pipeline design and automation. Here are 5 key insights from my recent work...',
      date: '2 days ago',
      likes: 234,
      comments: 45,
      shares: 12,
      url: 'https://linkedin.com/posts/yourusername_post1',
    },
    {
      id: 2,
      title: 'Best Practices for Scalable Data Architecture',
      excerpt: 'After building 50+ production systems, here are the architectural patterns that have stood the test of time...',
      date: '1 week ago',
      likes: 189,
      comments: 32,
      shares: 8,
      url: 'https://linkedin.com/posts/yourusername_post2',
    },
    {
      id: 3,
      title: 'Why Data Quality Matters More Than You Think',
      excerpt: 'A deep dive into how data quality issues can cascade through your entire system. Prevention strategies that actually work...',
      date: '2 weeks ago',
      likes: 156,
      comments: 28,
      shares: 15,
      url: 'https://linkedin.com/posts/yourusername_post3',
    },
  ]

  return (
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
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-data-accent/50 transition-all group flex flex-col"
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
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-data-accent transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://linkedin.com/in/yourusername"
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
  )
}

export default LinkedInFeed

