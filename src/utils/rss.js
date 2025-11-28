import { getAllPosts } from './blog'

export function generateRSS() {
  const posts = getAllPosts().slice(0, 20) // Latest 20 posts
  const baseUrl = 'https://harisbinsaif.com'
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Haris Bin Saif - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights on data engineering, architecture, AI agents, and best practices</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <category>${escapeXml(post.category)}</category>
    </item>`).join('\n')}
  </channel>
</rss>`

  return rss
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
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

