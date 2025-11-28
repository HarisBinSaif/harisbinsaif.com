import { motion } from 'framer-motion'
import { Briefcase, Code, Users, TrendingUp, Database } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      title: 'Senior Data Engineer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading data architecture design for scalable ETL pipelines processing 100M+ records daily. Implementing best practices for data governance and quality.',
      technologies: ['Python', 'Spark', 'Airflow', 'Kafka', 'Kubernetes'],
      icon: Database,
    },
    {
      title: 'Data Architect',
      company: 'Previous Company',
      period: '2020 - 2022',
      description: 'Designed and implemented cloud-native data platforms. Built real-time streaming pipelines and data lakes on AWS.',
      technologies: ['AWS', 'Terraform', 'Docker', 'PostgreSQL', 'Redshift'],
      icon: Code,
    },
    {
      title: 'Data Engineer',
      company: 'Startup',
      period: '2018 - 2020',
      description: 'Built data infrastructure from scratch. Created automated data pipelines and analytics dashboards.',
      technologies: ['Python', 'SQL', 'Tableau', 'MongoDB', 'Elasticsearch'],
      icon: TrendingUp,
    },
  ]

  const achievements = [
    { icon: Users, label: 'Led teams of 5+ engineers' },
    { icon: Briefcase, label: '50+ production systems' },
    { icon: Code, label: '20+ open source contributions' },
    { icon: TrendingUp, label: '3x performance improvements' },
  ]

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Experience</span> & Leadership
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building scalable data systems and leading teams to deliver impactful solutions
          </p>
        </motion.div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-xl glass text-center"
            >
              <achievement.icon className="w-8 h-8 text-data-accent mx-auto mb-3" />
              <p className="text-sm text-gray-300">{achievement.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 hover:border-data-accent/50 border border-white/10 transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-data-accent/20 to-data-purple/20">
                      <exp.icon className="w-6 h-6 text-data-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-data-accent font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, j) => (
                    <motion.span
                      key={j}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 rounded-full bg-data-accent/10 text-data-accent text-sm border border-data-accent/20"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

