export const UNIVERSITY_NAME = 'MIIT'

export const MOCK_USERS = [
  { id: 'user-1', name: 'Thiri Aung', role: 'student' },
  { id: 'user-2', name: 'Kyaw Min', role: 'student' },
  { id: 'user-3', name: 'Hla Hla', role: 'staff' },
  { id: 'user-4', name: 'Zaw Win', role: 'student' },
  { id: 'user-5', name: 'May Thu', role: 'alumni' },
  { id: 'user-6', name: 'Nyein Chan', role: 'student' },
]

export const LIKES = [
  { id: 'like-1', postId: 1, userId: 'user-1', createdAt: '2025-05-28T09:12:00Z' },
  { id: 'like-2', postId: 1, userId: 'user-2', createdAt: '2025-05-28T09:45:00Z' },
  { id: 'like-3', postId: 1, userId: 'user-3', createdAt: '2025-05-28T10:20:00Z' },
  { id: 'like-4', postId: 2, userId: 'user-1', createdAt: '2025-05-22T08:00:00Z' },
  { id: 'like-5', postId: 2, userId: 'user-4', createdAt: '2025-05-22T11:30:00Z' },
  { id: 'like-6', postId: 3, userId: 'user-2', createdAt: '2025-05-18T14:00:00Z' },
  { id: 'like-7', postId: 4, userId: 'user-5', createdAt: '2025-05-14T19:00:00Z' },
  { id: 'like-8', postId: 4, userId: 'user-6', createdAt: '2025-05-14T19:15:00Z' },
  { id: 'like-9', postId: 5, userId: 'user-3', createdAt: '2025-05-10T10:00:00Z' },
  { id: 'like-10', postId: 6, userId: 'user-1', createdAt: '2025-05-05T12:00:00Z' },
]

export const COMMENTS = [
  {
    id: 'comment-1',
    postId: 1,
    userId: 'user-2',
    content: 'Amazing projects this year — the robotics demos were outstanding!',
    sentiment: 'positive',
    createdAt: '2025-05-28T10:05:00Z',
  },
  {
    id: 'comment-2',
    postId: 1,
    userId: 'user-4',
    content: 'Great to see so many students participating across departments.',
    sentiment: 'positive',
    createdAt: '2025-05-28T11:20:00Z',
  },
  {
    id: 'comment-3',
    postId: 1,
    userId: 'user-6',
    content: 'The venue was a bit crowded during peak hours.',
    sentiment: 'neutral',
    createdAt: '2025-05-28T12:00:00Z',
  },
  {
    id: 'comment-4',
    postId: 1,
    userId: 'user-5',
    content: 'Wish there were more seating areas near the main hall.',
    sentiment: 'neutral',
    createdAt: '2025-05-28T13:10:00Z',
  },
  {
    id: 'comment-5',
    postId: 1,
    userId: 'user-3',
    content: 'Some exhibits ran out of handouts too quickly.',
    sentiment: 'negative',
    createdAt: '2025-05-28T14:30:00Z',
  },
  {
    id: 'comment-6',
    postId: 2,
    userId: 'user-1',
    content: 'Love that MIIT is taking sustainability seriously!',
    sentiment: 'positive',
    createdAt: '2025-05-22T09:00:00Z',
  },
  {
    id: 'comment-7',
    postId: 2,
    userId: 'user-2',
    content: 'The solar panel plan sounds promising for North Campus.',
    sentiment: 'positive',
    createdAt: '2025-05-22T10:30:00Z',
  },
  {
    id: 'comment-8',
    postId: 2,
    userId: 'user-4',
    content: 'Will there be updates on the timeline each semester?',
    sentiment: 'neutral',
    createdAt: '2025-05-22T11:00:00Z',
  },
  {
    id: 'comment-9',
    postId: 2,
    userId: 'user-6',
    content: 'Recycling bins still need better labelling in some buildings.',
    sentiment: 'neutral',
    createdAt: '2025-05-22T12:45:00Z',
  },
  {
    id: 'comment-10',
    postId: 2,
    userId: 'user-5',
    content: '2035 feels far away — hope interim targets are shared soon.',
    sentiment: 'negative',
    createdAt: '2025-05-22T15:00:00Z',
  },
  {
    id: 'comment-11',
    postId: 3,
    userId: 'user-1',
    content: 'The theatre performances were absolutely brilliant!',
    sentiment: 'positive',
    createdAt: '2025-05-18T16:00:00Z',
  },
  {
    id: 'comment-12',
    postId: 3,
    userId: 'user-3',
    content: 'Record crowds — food stalls could use more variety next year.',
    sentiment: 'neutral',
    createdAt: '2025-05-18T17:30:00Z',
  },
  {
    id: 'comment-13',
    postId: 3,
    userId: 'user-6',
    content: 'Sound quality at the outdoor stage needs improvement.',
    sentiment: 'negative',
    createdAt: '2025-05-18T18:00:00Z',
  },
  {
    id: 'comment-14',
    postId: 4,
    userId: 'user-2',
    content: 'What a game! Proud of the MIIT Eagles!',
    sentiment: 'positive',
    createdAt: '2025-05-14T20:00:00Z',
  },
  {
    id: 'comment-15',
    postId: 5,
    userId: 'user-4',
    content: 'The delivery robot demo on East Campus was impressive.',
    sentiment: 'positive',
    createdAt: '2025-05-10T11:00:00Z',
  },
  {
    id: 'comment-16',
    postId: 5,
    userId: 'user-1',
    content: 'Curious how it handles stairs and narrow corridors.',
    sentiment: 'neutral',
    createdAt: '2025-05-10T12:30:00Z',
  },
  {
    id: 'comment-17',
    postId: 6,
    userId: 'user-2',
    content: 'The wellness centre meditation rooms are a great addition.',
    sentiment: 'positive',
    createdAt: '2025-05-05T13:00:00Z',
  },
  {
    id: 'comment-18',
    postId: 6,
    userId: 'user-5',
    content: 'Booking system for counselling slots would help.',
    sentiment: 'neutral',
    createdAt: '2025-05-05T14:00:00Z',
  },
]

export const CAMPUS_TOUR_STOPS = [
  {
    id: 'stop-1',
    campus: 'main',
    name: 'Main Auditorium',
    description: 'Central venue for lectures, ceremonies, and major campus events.',
    duration: '15 min',
    // 360° equirectangular — replace src with your MIIT photo: public/panoramas/main-auditorium.jpg
    panorama: {
      type: 'equirectangular',
      src: 'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
      caption: 'Main Auditorium — demo 360° (replace with MIIT panorama)',
      initialView: { yaw: 0, pitch: 0, zoom: 50 },
    },
  },
  {
    id: 'stop-2',
    campus: 'main',
    name: 'Innovation Lab',
    description: 'Student research hub with robotics, AI, and prototyping facilities.',
    duration: '20 min',
    // Uncomment and set your iframe URL (Matterport, Kuula, etc.):
    // panorama: {
    //   type: 'iframe',
    //   src: 'https://my.matterport.com/show/?m=YOUR_MODEL_ID',
    //   caption: 'Innovation Lab virtual walkthrough',
    // },
  },
  {
    id: 'stop-3',
    campus: 'north',
    name: 'Green Energy Centre',
    description: 'Solar research station and sustainability programme headquarters.',
    duration: '15 min',
    // panorama: { type: 'equirectangular', src: '/panoramas/green-energy-centre.jpg' },
  },
  {
    id: 'stop-4',
    campus: 'south',
    name: 'Sports Complex',
    description: 'Basketball courts, gym, and home of the MIIT Eagles.',
    duration: '25 min',
    // panorama: { type: 'equirectangular', src: '/panoramas/sports-complex.jpg' },
  },
  {
    id: 'stop-5',
    campus: 'east',
    name: 'Engineering Workshop',
    description: 'Capstone projects and autonomous systems testing grounds.',
    duration: '20 min',
    // panorama: { type: 'video', src: '/panoramas/engineering-workshop-360.mp4' },
  },
  {
    id: 'stop-6',
    campus: 'west',
    name: 'Wellness Centre',
    description: 'Counselling, fitness classes, and mindfulness spaces.',
    duration: '15 min',
    // panorama: { type: 'equirectangular', src: '/panoramas/wellness-centre.jpg' },
  },
]

export function getUserById(userId) {
  return MOCK_USERS.find((user) => user.id === userId) ?? null
}

export function computeSentiment(comments) {
  if (comments.length === 0) {
    return {
      positive: { percent: 0, count: 0 },
      neutral: { percent: 0, count: 0 },
      negative: { percent: 0, count: 0 },
    }
  }

  const counts = { positive: 0, neutral: 0, negative: 0 }
  for (const comment of comments) {
    counts[comment.sentiment] += 1
  }

  const total = comments.length

  return {
    positive: {
      percent: Math.round((counts.positive / total) * 100),
      count: counts.positive,
    },
    neutral: {
      percent: Math.round((counts.neutral / total) * 100),
      count: counts.neutral,
    },
    negative: {
      percent: Math.round((counts.negative / total) * 100),
      count: counts.negative,
    },
  }
}
