import { motion } from 'framer-motion'
import { Github, Calendar, Code, GitCommit } from 'lucide-react'

const GitHubActivity = () => {
  // This would typically come from GitHub API
  const activityData = {
    totalCommits: 1247,
    contributionsThisYear: 342,
    repositories: 28,
    languages: [
      { name: 'Python', percentage: 45, color: '#3776ab' },
      { name: 'TypeScript', percentage: 25, color: '#3178c6' },
      { name: 'Rust', percentage: 15, color: '#ce422b' },
      { name: 'Go', percentage: 10, color: '#00add8' },
      { name: 'Other', percentage: 5, color: '#6e7681' },
    ],
    recentActivity: [
      { repo: 'data-pipeline-framework', action: 'pushed', time: '2 hours ago' },
      { repo: 'ml-deployment-toolkit', action: 'opened PR', time: '1 day ago' },
      { repo: 'analytics-engine', action: 'merged PR', time: '3 days ago' },
      { repo: 'data-quality-validator', action: 'pushed', time: '5 days ago' },
    ],
  }

  return (
    <section className="py-20 relative">
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
              GitHub <span className="text-gradient">Activity</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Continuous contribution to open source and personal projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Statistics</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GitCommit className="w-5 h-5 text-data-accent" />
                  <span className="text-gray-300">Total Commits</span>
                </div>
                <span className="text-2xl font-bold text-gradient">{activityData.totalCommits.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-data-accent" />
                  <span className="text-gray-300">This Year</span>
                </div>
                <span className="text-2xl font-bold text-gradient">{activityData.contributionsThisYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-data-accent" />
                  <span className="text-gray-300">Repositories</span>
                </div>
                <span className="text-2xl font-bold text-gradient">{activityData.repositories}</span>
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Languages</h3>
            <div className="space-y-4">
              {activityData.languages.map((lang, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Recent Activity</h3>
          <div className="space-y-4">
            {activityData.recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-data-accent" />
                  <span className="text-gray-300">
                    <span className="text-white font-semibold">{activity.action}</span> to{' '}
                    <span className="text-data-accent">{activity.repo}</span>
                  </span>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
            <span>View Full Profile on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubActivity

