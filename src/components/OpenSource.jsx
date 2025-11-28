import { motion } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink, Code2 } from 'lucide-react'

const OpenSource = () => {
  const projects = [
    {
      name: 'Data Pipeline Framework',
      description: 'A scalable framework for building ETL pipelines with built-in monitoring and error handling.',
      stars: 234,
      forks: 45,
      language: 'Python',
      url: 'https://github.com/yourusername/project1',
      tags: ['ETL', 'Data Engineering', 'Python'],
    },
    {
      name: 'Real-time Analytics Engine',
      description: 'High-performance streaming analytics engine built with Rust and WebAssembly.',
      stars: 189,
      forks: 32,
      language: 'Rust',
      url: 'https://github.com/yourusername/project2',
      tags: ['Streaming', 'Analytics', 'Rust'],
    },
    {
      name: 'ML Model Deployment Toolkit',
      description: 'Simplify ML model deployment with automated CI/CD pipelines and monitoring.',
      stars: 156,
      forks: 28,
      language: 'Python',
      url: 'https://github.com/yourusername/project3',
      tags: ['MLOps', 'DevOps', 'Python'],
    },
    {
      name: 'Data Quality Validator',
      description: 'Comprehensive data quality validation library with customizable rules and reporting.',
      stars: 98,
      forks: 19,
      language: 'TypeScript',
      url: 'https://github.com/yourusername/project4',
      tags: ['Data Quality', 'Validation', 'TypeScript'],
    },
  ]

  return (
    <section id="opensource" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Github className="w-8 h-8 text-data-accent" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Open Source</span> Contributions
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building tools and frameworks that help the data engineering community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-data-accent/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Code2 className="w-5 h-5 text-data-accent" />
                  <h3 className="text-xl font-bold text-white group-hover:text-data-accent transition-colors">
                    {project.name}
                  </h3>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-data-accent transition-colors" />
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1 text-gray-400">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">{project.stars}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <GitFork className="w-4 h-4" />
                  <span className="text-sm">{project.forks}</span>
                </div>
                <span className="text-sm text-gray-400">{project.language}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 rounded text-xs bg-data-purple/20 text-data-purple border border-data-purple/30"
                  >
                    {tag}
                  </span>
                ))}
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
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg glass border border-white/20 hover:border-data-accent/50 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View All Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default OpenSource

