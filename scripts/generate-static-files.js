import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const manifestPath = join(rootDir, 'src/data/blog-manifest.json')

// Escape XML special characters
function escapeXml(unsafe) {
  if (!unsafe) return ''
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

// Load blog manifest
let blogManifest = {}
try {
  const manifestContent = readFileSync(manifestPath, 'utf-8')
  blogManifest = JSON.parse(manifestContent)
} catch (error) {
  console.warn('⚠️  Could not load blog manifest:', error.message)
}

// Convert manifest to array of posts sorted by date
const posts = Object.entries(blogManifest)
  .map(([slug, data]) => ({
    slug,
    ...data
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const baseUrl = 'https://harisbinsaif.com'

// Generate RSS feed
try {
  const latestPosts = posts.slice(0, 20)
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Haris Bin Saif - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights on data engineering, architecture, AI agents, and best practices</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${latestPosts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <category>${escapeXml(post.category)}</category>
    </item>`).join('\n')}
  </channel>
</rss>`
  
  writeFileSync(join(distDir, 'rss.xml'), rss)
  console.log('✅ Generated rss.xml')
} catch (error) {
  console.error('❌ Error generating RSS:', error)
}

// Generate sitemap
try {
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'weekly' },
    { url: '/blog', priority: 0.9, changefreq: 'weekly' },
  ]

  const blogPages = posts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: post.date,
  }))

  const allPages = [...staticPages, ...blogPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
  console.log('✅ Generated sitemap.xml')
} catch (error) {
  console.error('❌ Error generating sitemap:', error)
}

// Copy index.html to 404.html for SPA routing fallback
// This ensures React Router handles all routes properly on GitHub Pages
try {
  const indexPath = join(distDir, 'index.html')
  const html404Path = join(distDir, '404.html')
  
  // Read index.html and copy it to 404.html
  const indexContent = readFileSync(indexPath, 'utf-8')
  writeFileSync(html404Path, indexContent)
  console.log('✅ Generated 404.html (copied from index.html for SPA routing)')
} catch (error) {
  console.error('❌ Error generating 404.html:', error)
}
