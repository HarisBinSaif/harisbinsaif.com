import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  author = 'Haris Bin Saif',
  publishedTime,
  modifiedTime,
  tags = []
}) => {
  const siteUrl = 'https://harisbinsaif.com'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title} | Haris Bin Saif</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      {tags.length > 0 && <meta name="keywords" content={tags.join(', ')} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Haris Bin Saif" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@harisbinsaif" />

      {/* Article specific */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'BlogPosting' : 'WebSite',
          name: title,
          description: description,
          url: fullUrl,
          image: imageUrl,
          author: {
            '@type': 'Person',
            name: author,
          },
          publisher: {
            '@type': 'Person',
            name: author,
          },
          ...(type === 'article' && {
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
            headline: title,
          }),
        })}
      </script>
    </Helmet>
  )
}

export default SEO

