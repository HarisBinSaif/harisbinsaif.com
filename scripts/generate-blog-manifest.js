import matter from 'gray-matter'
import { readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const blogDir = join(rootDir, 'content/blog')
const manifestPath = join(rootDir, 'src/data/blog-manifest.json')

const files = glob.sync('*.mdx', { cwd: blogDir })

const manifest = {}

files.forEach(file => {
  const filePath = join(blogDir, file)
  const content = readFileSync(filePath, 'utf-8')
  const { data } = matter(content)
  const slug = file.replace('.mdx', '')
  
  manifest[slug] = {
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    date: data.date || new Date().toISOString(),
    category: data.category || 'General',
    tags: data.tags || [],
    author: data.author || 'Haris Bin Saif',
  }
})

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
console.log(`Generated blog manifest with ${Object.keys(manifest).length} posts`)

