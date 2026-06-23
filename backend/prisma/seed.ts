import 'dotenv/config'
import bcrypt from 'bcrypt'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const DEMO_IMAGE = '/featured-campus.svg'

const demoPosts = [
  {
    id: 1,
    featured: true,
    category: 'Academic',
    campus: 'main',
    date: 'May 28, 2025',
    title: 'Annual Science Fair 2025 Showcases Student Innovation',
    excerpt:
      "Students from across MIIT presented groundbreaking projects in robotics, environmental science, and biomedical engineering at this year's fair.",
    body: "The Annual Science Fair brought together over 200 student researchers showcasing innovative projects. From sustainable energy solutions to AI-assisted medical diagnostics, the event highlighted the creative spirit driving MIIT's academic community forward.",
    image: DEMO_IMAGE,
    tags: ['Science', 'Research', 'Innovation', 'STEM'],
    reads: 12000,
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
    image: DEMO_IMAGE,
    tags: ['Sustainability', 'Environment', 'Campus', 'Climate'],
    reads: 8200,
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
    image: DEMO_IMAGE,
    tags: ['Arts', 'Music', 'Theatre', 'Festival'],
    reads: 5100,
  },
  {
    id: 4,
    featured: false,
    category: 'Sports',
    campus: 'south',
    date: 'May 14, 2025',
    title: 'MIIT Eagles Clinch Conference Championship',
    excerpt:
      "The men's basketball team secured their first conference title in over a decade with a thrilling overtime victory.",
    body: "In a nail-biting overtime finish, the MIIT Eagles defeated their rivals 78-75 to claim the conference championship. Coach Martinez praised the team's resilience and dedication throughout the season.",
    image: DEMO_IMAGE,
    tags: ['Sports', 'Basketball', 'Championship', 'Athletics'],
    reads: 9400,
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
    image: DEMO_IMAGE,
    tags: ['Engineering', 'Robotics', 'AI', 'Innovation'],
    reads: 3800,
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
    body: "The new Wellness Center provides comprehensive mental health support, group fitness sessions, and quiet meditation rooms. Student feedback during the planning phase shaped many of the centre's key features.",
    image: DEMO_IMAGE,
    tags: ['Wellness', 'Health', 'Student Life', 'Campus'],
    reads: 6700,
  },
  {
    id: 7,
    featured: false,
    category: 'Campus News',
    campus: 'main',
    date: 'May 1, 2025',
    title: 'MIIT Announces Expanded Library Hours for Exam Season',
    excerpt:
      'Main Campus library will stay open until midnight through finals week, with extra study rooms and peer tutoring sessions.',
    body: 'To support students during exam season, MIIT is extending library hours and adding quiet study zones across Main Campus. Student council volunteers will also host nightly review sessions in the auditorium.',
    image: DEMO_IMAGE,
    tags: ['Campus', 'Library', 'Exams', 'Student Life'],
    reads: 4200,
  },
  {
    id: 8,
    featured: false,
    category: 'Engineering',
    campus: 'north',
    date: 'April 26, 2025',
    title: 'North Campus Smart Grid Lab Goes Live',
    excerpt:
      'Engineering students can now test renewable energy systems on a live microgrid installed at North Campus.',
    body: 'The new Smart Grid Lab gives students hands-on experience with solar, wind, and battery storage systems. Faculty say the facility will support capstone projects and industry partnerships for years to come.',
    image: DEMO_IMAGE,
    tags: ['Engineering', 'Energy', 'Lab', 'Innovation'],
    reads: 3100,
  },
  {
    id: 9,
    featured: false,
    category: 'Academic',
    campus: 'south',
    date: 'April 20, 2025',
    title: 'Guest Lecture Series Brings Industry Leaders to South Campus',
    excerpt:
      'Weekly talks from tech and business leaders give students insight into careers beyond the classroom.',
    body: 'South Campus kicked off a new guest lecture series featuring alumni and industry partners. Topics range from software engineering to entrepreneurship, with Q&A sessions after each talk.',
    image: DEMO_IMAGE,
    tags: ['Academic', 'Careers', 'Lecture', 'Alumni'],
    reads: 2800,
  },
  {
    id: 10,
    featured: false,
    category: 'Arts & Culture',
    campus: 'west',
    date: 'April 15, 2025',
    title: 'Student Film Night Returns to West Campus',
    excerpt:
      'Short films created by MIIT media students screened to a packed house at the West Campus cinema hall.',
    body: 'The annual Student Film Night showcased 12 original short films covering documentary, animation, and narrative styles. Audience voting crowned a senior thesis project as Best in Show.',
    image: DEMO_IMAGE,
    tags: ['Arts', 'Film', 'Media', 'Festival'],
    reads: 2400,
  },
  {
    id: 11,
    featured: false,
    category: 'Sports',
    campus: 'east',
    date: 'April 10, 2025',
    title: 'East Campus Intramural Football League Kicks Off',
    excerpt:
      'Twenty-four student teams registered for the spring intramural football season at East Campus.',
    body: 'The intramural league offers a friendly but competitive outlet for students of all skill levels. Matches run every Saturday through June, with finals scheduled on the main athletics field.',
    image: DEMO_IMAGE,
    tags: ['Sports', 'Football', 'Intramural', 'Campus'],
    reads: 1900,
  },
  {
    id: 12,
    featured: false,
    category: 'Student Life',
    campus: 'north',
    date: 'April 5, 2025',
    title: 'North Campus Food Fair Celebrates Local Vendors',
    excerpt:
      'Students sampled dishes from local vendors and voted for their favourite campus food stalls.',
    body: 'The North Campus Food Fair brought together student clubs and local businesses for a day of music, food, and community. Proceeds supported the student hardship fund.',
    image: DEMO_IMAGE,
    tags: ['Student Life', 'Food', 'Community', 'Events'],
    reads: 3600,
  },
]

async function seedPosts() {
  for (const post of demoPosts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    })
  }
  console.log(`Posts seeded/updated (${demoPosts.length} total)`)
}

async function main() {
  console.log('Seeding database...')

  const saltRounds = 10

  const users = await prisma.user.createMany({
    data: [
      { id: 'user-admin', name: 'Admin',      email: 'admin@miit.edu.mm',    passwordHash: await bcrypt.hash('admin123',   saltRounds), role: 'ADMIN' },
      { id: 'user-1',     name: 'Thiri Aung', email: 'thiri@miit.edu.mm',    passwordHash: await bcrypt.hash('password1',  saltRounds), role: 'USER'  },
      { id: 'user-2',     name: 'Kyaw Min',   email: 'kyaw@miit.edu.mm',     passwordHash: await bcrypt.hash('password2',  saltRounds), role: 'USER'  },
      { id: 'user-3',     name: 'Hla Hla',    email: 'hlahla@miit.edu.mm',   passwordHash: await bcrypt.hash('password3',  saltRounds), role: 'USER'  },
      { id: 'user-4',     name: 'Zaw Win',    email: 'zawwin@miit.edu.mm',   passwordHash: await bcrypt.hash('password4',  saltRounds), role: 'USER'  },
      { id: 'user-5',     name: 'May Thu',    email: 'maythu@miit.edu.mm',   passwordHash: await bcrypt.hash('password5',  saltRounds), role: 'USER'  },
      { id: 'user-6',     name: 'Nyein Chan', email: 'nyein@miit.edu.mm',    passwordHash: await bcrypt.hash('password6',  saltRounds), role: 'USER'  },
    ],
    skipDuplicates: true,
  })
  console.log(`Users seeded (${users.count} new)`)

  await seedPosts()

  const comments = await prisma.comment.createMany({
    data: [
      { id: 'comment-1',  postId: 1, userId: 'user-2', content: 'Amazing projects this year — the robotics demos were outstanding!',      sentiment: 'positive', createdAt: new Date('2025-05-28T10:05:00Z') },
      { id: 'comment-2',  postId: 1, userId: 'user-4', content: 'Great to see so many students participating across departments.',          sentiment: 'positive', createdAt: new Date('2025-05-28T11:20:00Z') },
      { id: 'comment-3',  postId: 1, userId: 'user-6', content: 'The venue was a bit crowded during peak hours.',                          sentiment: 'neutral',  createdAt: new Date('2025-05-28T12:00:00Z') },
      { id: 'comment-4',  postId: 1, userId: 'user-5', content: 'Wish there were more seating areas near the main hall.',                  sentiment: 'neutral',  createdAt: new Date('2025-05-28T13:10:00Z') },
      { id: 'comment-5',  postId: 1, userId: 'user-3', content: 'Some exhibits ran out of handouts too quickly.',                          sentiment: 'negative', createdAt: new Date('2025-05-28T14:30:00Z') },
      { id: 'comment-6',  postId: 2, userId: 'user-1', content: 'Love that MIIT is taking sustainability seriously!',                      sentiment: 'positive', createdAt: new Date('2025-05-22T09:00:00Z') },
      { id: 'comment-7',  postId: 2, userId: 'user-2', content: 'The solar panel plan sounds promising for North Campus.',                  sentiment: 'positive', createdAt: new Date('2025-05-22T10:30:00Z') },
      { id: 'comment-8',  postId: 2, userId: 'user-4', content: 'Will there be updates on the timeline each semester?',                    sentiment: 'neutral',  createdAt: new Date('2025-05-22T11:00:00Z') },
      { id: 'comment-9',  postId: 2, userId: 'user-6', content: 'Recycling bins still need better labelling in some buildings.',           sentiment: 'neutral',  createdAt: new Date('2025-05-22T12:45:00Z') },
      { id: 'comment-10', postId: 2, userId: 'user-5', content: '2035 feels far away — hope interim targets are shared soon.',             sentiment: 'negative', createdAt: new Date('2025-05-22T15:00:00Z') },
      { id: 'comment-11', postId: 3, userId: 'user-1', content: 'The theatre performances were absolutely brilliant!',                     sentiment: 'positive', createdAt: new Date('2025-05-18T16:00:00Z') },
      { id: 'comment-12', postId: 3, userId: 'user-3', content: 'Record crowds — food stalls could use more variety next year.',           sentiment: 'neutral',  createdAt: new Date('2025-05-18T17:30:00Z') },
      { id: 'comment-13', postId: 3, userId: 'user-6', content: 'Sound quality at the outdoor stage needs improvement.',                   sentiment: 'negative', createdAt: new Date('2025-05-18T18:00:00Z') },
      { id: 'comment-14', postId: 4, userId: 'user-2', content: 'What a game! Proud of the MIIT Eagles!',                                  sentiment: 'positive', createdAt: new Date('2025-05-14T20:00:00Z') },
      { id: 'comment-15', postId: 5, userId: 'user-4', content: 'The delivery robot demo on East Campus was impressive.',                  sentiment: 'positive', createdAt: new Date('2025-05-10T11:00:00Z') },
      { id: 'comment-16', postId: 5, userId: 'user-1', content: 'Curious how it handles stairs and narrow corridors.',                     sentiment: 'neutral',  createdAt: new Date('2025-05-10T12:30:00Z') },
      { id: 'comment-17', postId: 6, userId: 'user-2', content: 'The wellness centre meditation rooms are a great addition.',              sentiment: 'positive', createdAt: new Date('2025-05-05T13:00:00Z') },
      { id: 'comment-18', postId: 6, userId: 'user-5', content: 'Booking system for counselling slots would help.',                        sentiment: 'neutral',  createdAt: new Date('2025-05-05T14:00:00Z') },
      { id: 'comment-19', postId: 7, userId: 'user-3', content: 'Midnight library hours are a lifesaver during finals!',                   sentiment: 'positive', createdAt: new Date('2025-05-01T10:00:00Z') },
      { id: 'comment-20', postId: 8, userId: 'user-5', content: 'The smart grid lab looks incredible — cannot wait to try it.',            sentiment: 'positive', createdAt: new Date('2025-04-26T11:00:00Z') },
      { id: 'comment-21', postId: 9, userId: 'user-6', content: 'Great speakers so far. More startup founders next time please!',          sentiment: 'positive', createdAt: new Date('2025-04-20T15:00:00Z') },
      { id: 'comment-22', postId: 10, userId: 'user-1', content: 'Loved the animation shorts — very creative work.',                        sentiment: 'positive', createdAt: new Date('2025-04-15T19:00:00Z') },
    ],
    skipDuplicates: true,
  })
  console.log(`Comments seeded (${comments.count} new)`)

  const likes = await prisma.like.createMany({
    data: [
      { id: 'like-1',  postId: 1, userId: 'user-1', createdAt: new Date('2025-05-28T09:12:00Z') },
      { id: 'like-2',  postId: 1, userId: 'user-2', createdAt: new Date('2025-05-28T09:45:00Z') },
      { id: 'like-3',  postId: 1, userId: 'user-3', createdAt: new Date('2025-05-28T10:20:00Z') },
      { id: 'like-4',  postId: 2, userId: 'user-1', createdAt: new Date('2025-05-22T08:00:00Z') },
      { id: 'like-5',  postId: 2, userId: 'user-4', createdAt: new Date('2025-05-22T11:30:00Z') },
      { id: 'like-6',  postId: 3, userId: 'user-2', createdAt: new Date('2025-05-18T14:00:00Z') },
      { id: 'like-7',  postId: 4, userId: 'user-5', createdAt: new Date('2025-05-14T19:00:00Z') },
      { id: 'like-8',  postId: 4, userId: 'user-6', createdAt: new Date('2025-05-14T19:15:00Z') },
      { id: 'like-9',  postId: 5, userId: 'user-3', createdAt: new Date('2025-05-10T10:00:00Z') },
      { id: 'like-10', postId: 6, userId: 'user-1', createdAt: new Date('2025-05-05T12:00:00Z') },
      { id: 'like-11', postId: 7, userId: 'user-2', createdAt: new Date('2025-05-01T09:00:00Z') },
      { id: 'like-12', postId: 8, userId: 'user-4', createdAt: new Date('2025-04-26T10:00:00Z') },
      { id: 'like-13', postId: 9, userId: 'user-5', createdAt: new Date('2025-04-20T12:00:00Z') },
      { id: 'like-14', postId: 10, userId: 'user-6', createdAt: new Date('2025-04-15T18:00:00Z') },
      { id: 'like-15', postId: 11, userId: 'user-1', createdAt: new Date('2025-04-10T16:00:00Z') },
      { id: 'like-16', postId: 12, userId: 'user-3', createdAt: new Date('2025-04-05T13:00:00Z') },
    ],
    skipDuplicates: true,
  })
  console.log(`Likes seeded (${likes.count} new)`)

  const tourStops = await prisma.campusTourStop.createMany({
    data: [
      { id: 'stop-1', campus: 'main',  name: 'Main Auditorium',     description: 'Central venue for lectures, ceremonies, and major campus events.',      duration: '15 min', panorama: { type: 'equirectangular', src: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg', caption: 'Main Auditorium — demo 360°', initialView: { yaw: 0, pitch: 0, zoom: 50 } } },
      { id: 'stop-2', campus: 'main',  name: 'Innovation Lab',      description: 'Student research hub with robotics, AI, and prototyping facilities.',   duration: '20 min' },
      { id: 'stop-3', campus: 'north', name: 'Green Energy Centre',  description: 'Solar research station and sustainability programme headquarters.',      duration: '15 min' },
      { id: 'stop-4', campus: 'south', name: 'Sports Complex',       description: 'Basketball courts, gym, and home of the MIIT Eagles.',                  duration: '25 min' },
      { id: 'stop-5', campus: 'east',  name: 'Engineering Workshop', description: 'Capstone projects and autonomous systems testing grounds.',              duration: '20 min' },
      { id: 'stop-6', campus: 'west',  name: 'Wellness Centre',      description: 'Counselling, fitness classes, and mindfulness spaces.',                 duration: '15 min' },
    ],
    skipDuplicates: true,
  })
  console.log(`Campus tour stops seeded (${tourStops.count} new)`)

  console.log('Database seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
