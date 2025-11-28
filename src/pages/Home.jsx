import Hero from '../components/Hero'
import Experience from '../components/Experience'
import OpenSource from '../components/OpenSource'
import LinkedInFeed from '../components/LinkedInFeed'
import GitHubActivity from '../components/GitHubActivity'

const Home = () => {
  return (
    <div>
      <Hero />
      <Experience />
      <OpenSource />
      <LinkedInFeed />
      <GitHubActivity />
    </div>
  )
}

export default Home

