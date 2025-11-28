import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { MDXProvider } from '@mdx-js/react'
import SEO from '../components/SEO'
import { MDXComponents } from '../components/MDXComponents'

const BlogPost = () => {
  const { slug } = useParams()
  const [post, setPost] = React.useState(null)
  const [relatedPosts, setRelatedPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(() => {
    import('../utils/blog').then(module => {
      try {
        const foundPost = module.getPostBySlug(slug)
        if (foundPost) {
          setPost(foundPost)
          const allPosts = module.getAllPosts()
          setRelatedPosts(
            allPosts
              .filter(p => p.category === foundPost.category && p.slug !== foundPost.slug)
              .slice(0, 3)
          )
        }
      } catch (e) {
        console.error('Error loading blog post:', e)
      } finally {
        setLoading(false)
      }
    }).catch(e => {
      console.error('Error loading blog module:', e)
      setLoading(false)
    })
  }, [slug])
  
  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-data-accent hover:text-data-purple">
          Back to Blog
        </Link>
      </div>
    )
  }

  const Content = post.content

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
        modifiedTime={post.date}
        tags={post.tags}
      />
      <article className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-data-accent hover:text-data-purple transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>

            <div className="mb-6 flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full text-sm bg-data-purple/20 text-data-purple border border-data-purple/30">
                {post.category}
              </span>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-400" />
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded text-xs bg-white/5 text-gray-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center space-x-6 text-gray-400 mb-12 flex-wrap">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>By {post.author}</span>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 prose prose-invert max-w-none">
              <MDXProvider components={MDXComponents}>
                <Content />
              </MDXProvider>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-white/10">
                <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="glass rounded-xl p-4 border border-white/10 hover:border-data-accent/50 transition-all group"
                    >
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-data-accent transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </article>
    </>
  )
}

export default BlogPost
