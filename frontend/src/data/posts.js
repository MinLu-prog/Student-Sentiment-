export const CATEGORIES = [
  'All',
  'Academic',
  'Arts & Culture',
  'Engineering',
  'Student Life',
  'Sports',
  'Campus News',
]

export const CAMPUS_AREAS = [
  { value: 'main', label: 'Main Campus' },
  { value: 'north', label: 'North Campus' },
  { value: 'south', label: 'South Campus' },
  { value: 'east', label: 'East Campus' },
  { value: 'west', label: 'West Campus' },
]

export const POSTS = [
  {
    id: 1,
    featured: true,
    category: 'Academic',
    campus: 'main',
    date: 'May 28, 2025',
    title: 'Annual Science Fair 2025 Showcases Student Innovation',
    excerpt:
      'Students from across MIIT presented groundbreaking projects in robotics, environmental science, and biomedical engineering at this year\'s fair.',
    body: 'The Annual Science Fair brought together over 200 student researchers showcasing innovative projects. From sustainable energy solutions to AI-assisted medical diagnostics, the event highlighted the creative spirit driving MIIT\'s academic community forward.',
    image: '/featured-campus.svg',
    tags: ['Science', 'Research', 'Innovation', 'STEM'],
    reads: '12K',
  },
  {
    id: 2,
    featured: false,
    category: 'Campus News',
    campus: 'north',
    date: 'May 22, 2025',
    title: 'MIIT Launches New Sustainability Initiative',
    excerpt:
      'The university announces a comprehensive plan to achieve carbon neutrality by 2035, including solar installations and green building upgrades.',
    body: 'MIIT has unveiled an ambitious sustainability roadmap that will transform campus infrastructure over the next decade. The initiative includes rooftop solar panels, expanded recycling programmes, and a new environmental studies minor.',
    image: '/campus-2.svg',
    tags: ['Sustainability', 'Environment', 'Campus', 'Climate'],
    reads: '8.2K',
  },
  {
    id: 3,
    featured: false,
    category: 'Arts & Culture',
    campus: 'main',
    date: 'May 18, 2025',
    title: 'Spring Arts Festival Draws Record Crowds',
    excerpt:
      'Music, theatre, and visual arts performances filled the quad during the three-day celebration of student creativity.',
    body: 'The Spring Arts Festival transformed the main quad into a vibrant showcase of talent. Over 50 student groups performed, with attendance reaching an all-time high of 3,000 visitors across the weekend.',
    image: '/campus-3.svg',
    tags: ['Arts', 'Music', 'Theatre', 'Festival'],
    reads: '5.1K',
  },
  {
    id: 4,
    featured: false,
    category: 'Sports',
    campus: 'south',
    date: 'May 14, 2025',
    title: 'MIIT Eagles Clinch Conference Championship',
    excerpt:
      'The men\'s basketball team secured their first conference title in over a decade with a thrilling overtime victory.',
    body: 'In a nail-biting overtime finish, the MIIT Eagles defeated their rivals 78-75 to claim the conference championship. Coach Martinez praised the team\'s resilience and dedication throughout the season.',
    image: '/featured-campus.svg',
    tags: ['Sports', 'Basketball', 'Championship', 'Athletics'],
    reads: '9.4K',
  },
  {
    id: 5,
    featured: false,
    category: 'Engineering',
    campus: 'east',
    date: 'May 10, 2025',
    title: 'Engineering Students Build Autonomous Delivery Robot',
    excerpt:
      'A team of seniors developed a campus navigation robot that could streamline mail and package delivery across MIIT.',
    body: 'The senior capstone project combines computer vision, GPS mapping, and obstacle avoidance to create a fully autonomous delivery robot. The prototype successfully completed a test run across the East Campus.',
    image: '/campus-2.svg',
    tags: ['Engineering', 'Robotics', 'AI', 'Innovation'],
    reads: '3.8K',
  },
  {
    id: 6,
    featured: false,
    category: 'Student Life',
    campus: 'west',
    date: 'May 5, 2025',
    title: 'New Student Wellness Center Opens Its Doors',
    excerpt:
      'The state-of-the-art facility offers counselling, fitness classes, and mindfulness spaces for the entire MIIT community.',
    body: 'The new Wellness Center provides comprehensive mental health support, group fitness sessions, and quiet meditation rooms. Student feedback during the planning phase shaped many of the centre\'s key features.',
    image: '/campus-3.svg',
    tags: ['Wellness', 'Health', 'Student Life', 'Campus'],
    reads: '6.7K',
  },
]

export function getStats(posts) {
  const totalComments = posts.reduce(
    (sum, post) => sum + (post.commentCount ?? 0),
    0,
  )
  const totalReads = posts.reduce((sum, post) => {
    const value = parseFloat(post.reads)
    return sum + (post.reads.includes('K') ? value * 1000 : value)
  }, 0)

  return {
    stories: posts.length,
    comments: totalComments,
    reads: totalReads >= 1000 ? `${Math.round(totalReads / 1000)}K` : String(totalReads),
  }
}
