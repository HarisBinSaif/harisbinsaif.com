import readingTime from 'reading-time'

// Import blog manifest - Vite handles JSON imports synchronously
import blogManifestData from '../data/blog-manifest.json'

const blogManifest = blogManifestData || {}

// Import all MDX files
let blogModules = {}
try {
  blogModules = import.meta.glob('/content/blog/*.mdx', { 
    eager: true 
  }) || {}
} catch (e) {
  console.warn('Could not load MDX files:', e)
  blogModules = {}
}

export function getAllPosts() {
  const posts = []
  
  try {
    Object.entries(blogModules).forEach(([path, module]) => {
      try {
        const slug = path.split('/').pop().replace('.mdx', '')
        
        const frontmatter = blogManifest[slug] || {
          title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          excerpt: '',
          date: new Date().toISOString(),
          category: 'General',
          tags: [],
          author: 'Haris Bin Saif'
        }
        
        let readTime = 5
        try {
          const text = (frontmatter.excerpt || '') + ' ' + (frontmatter.title || '')
          if (text.trim()) {
            readTime = Math.ceil(readingTime(text).minutes) || 5
          }
        } catch (e) {
          readTime = 5
        }
        
        posts.push({
          slug,
          title: frontmatter.title,
          excerpt: frontmatter.excerpt || '',
          date: frontmatter.date || new Date().toISOString(),
          category: frontmatter.category || 'General',
          tags: frontmatter.tags || [],
          author: frontmatter.author || 'Haris Bin Saif',
          readTime,
          content: module?.default || module,
          frontmatter,
        })
      } catch (e) {
        console.warn(`Error processing ${path}:`, e)
      }
    })
  } catch (e) {
    console.warn('Error in getAllPosts:', e)
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  try {
    return getAllPosts().find(post => post.slug === slug) || null
  } catch (e) {
    console.warn('Error in getPostBySlug:', e)
    return null
  }
}

export function getPostSlugs() {
  try {
    return Object.keys(blogModules).map(path => 
      path.split('/').pop().replace('.mdx', '')
    )
  } catch (e) {
    return []
  }
}
