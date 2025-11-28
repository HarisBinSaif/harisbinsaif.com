import { getAllPosts } from './blog'

export function generateSitemap() {
  const posts = getAllPosts()
  const baseUrl = 'https://harisbinsaif.com'
  
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

  return sitemap
}

