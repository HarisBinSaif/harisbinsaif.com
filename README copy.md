# Haris Bin Saif - Personal Portfolio Website

A modern, interactive portfolio website showcasing experience, open-source contributions, LinkedIn posts, GitHub activity, and blog content.

## Features

- Interactive Hero section with animated data visualizations
- Experience timeline with detailed work history
- Open Source contributions showcase
- LinkedIn posts feed integration
- GitHub activity visualization
- Blog section with MDX support and SEO optimization
- Fully responsive design
- Smooth animations and transitions
- Data/AI engineering themed design

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router (routing)
- MDX (blog posts with React components)
- React Helmet Async (SEO)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
# or
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Blog Setup

### Writing Blog Posts

1. Create a new `.mdx` file in the `content/blog/` directory
2. Add frontmatter at the top of the file:

```mdx
---
title: "Your Blog Post Title"
excerpt: "A brief description for SEO and previews"
date: "2024-01-15"
category: "Category Name"
tags: ["Tag1", "Tag2", "Tag3"]
author: "Haris Bin Saif"
---

# Your Content Here

Write your blog post using Markdown syntax. You can also use React components!
```

3. The file name becomes the URL slug (e.g., `my-post.mdx` → `/blog/my-post`)

### MDX Features

- Full Markdown support
- React components in markdown
- Syntax highlighting for code blocks
- Custom components for better styling

### SEO Features

- Automatic meta tags generation
- Open Graph tags for social sharing
- Twitter Card support
- Structured data (JSON-LD)
- Reading time calculation
- Related posts suggestions

## Configuration

### Update Social Links

Edit the following files to add your actual social media links:

- `src/components/Layout.jsx` - Update GitHub and LinkedIn URLs
- `src/components/OpenSource.jsx` - Add your GitHub projects
- `src/components/LinkedInFeed.jsx` - Add your LinkedIn profile URL
- `src/components/GitHubActivity.jsx` - Add your GitHub username

### Add Your Content

1. **Experience**: Edit `src/components/Experience.jsx` with your work history
2. **Open Source**: Update `src/components/OpenSource.jsx` with your projects
3. **LinkedIn Posts**: Modify `src/components/LinkedInFeed.jsx` or integrate LinkedIn API
4. **GitHub Activity**: Update `src/components/GitHubActivity.jsx` or integrate GitHub API
5. **Blog Posts**: Add `.mdx` files to `content/blog/` directory

## SEO Optimization

The site includes comprehensive SEO features:

- Dynamic meta tags per page
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for rich snippets
- Semantic HTML
- Fast loading times
- Mobile-responsive design

### Generating Sitemap and RSS

Sitemap and RSS feed utilities are available in `src/utils/`. You can integrate these into your build process or generate them dynamically.

## Customization

- Colors: Edit `tailwind.config.js` to customize the color scheme
- Animations: Modify Framer Motion animations in components
- Layout: Adjust components in `src/components/` directory
- Blog styling: Customize MDX components in `src/components/MDXComponents.jsx`

## Deployment

The site can be deployed to:
- Vercel (recommended for static sites)
- Netlify
- GitHub Pages
- Any static hosting service

Build the project and deploy the `dist` folder.

### Build Command

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT
