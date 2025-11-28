// Utility functions for LinkedIn post data

/**
 * Extract post ID from LinkedIn URL
 */
export function extractPostId(url) {
  if (!url || url === '#') return null
  // Format: .../activity-{ID}...
  const match = url.match(/activity-(\d+)/)
  return match ? match[1] : null
}

/**
 * Get LinkedIn embed URL for a post
 */
export function getLinkedInEmbedUrl(url) {
  const postId = extractPostId(url)
  if (!postId) return null
  return `https://www.linkedin.com/embed/feed/update/${postId}`
}

/**
 * Fetch LinkedIn post metadata
 * Note: LinkedIn doesn't provide a public API for engagement stats
 * This is a placeholder that could be extended with a backend service
 * that scrapes or uses LinkedIn API (requires authentication)
 */
export async function fetchLinkedInPostStats(url) {
  // Since LinkedIn doesn't provide public API access,
  // we'll need to either:
  // 1. Manually update stats
  // 2. Use a backend service that scrapes (not recommended)
  // 3. Use LinkedIn API with authentication (complex setup)
  
  // For now, return null - stats will need to be manually updated
  // or fetched from a backend service
  return null
}

