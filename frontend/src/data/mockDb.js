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

/**
 * Campus tour stops — the pins on the interactive MIIT campus map.
 *
 * MIIT is a single physical campus, so every stop uses `campus: 'main'`.
 * Fields used by the map (see src/config/campusMap.js):
 *   pinNumber — number shown on the marker (matches the printed legend)
 *   type      — drives pin colour (entrance | academic | hall | library |
 *               canteen | sports | hostel | landmark | road)
 *   map       — { x, y } normalised position, 0..1 from the TOP-LEFT of map.svg
 *   nameMy    — optional Myanmar label
 *
 * NOTE: the `map` coordinates below are APPROXIMATE starting points. Open the
 * tour, enable the "Pin tool" on the map, click each real location, and paste
 * the exact { x, y } it reports back here. Add a `panorama` to a stop once you
 * have its 360° photo (stops without one show a placeholder + how-to hint).
 */
export const CAMPUS_TOUR_STOPS = [
  {
    id: 'stop-1',
    campus: 'main',
    pinNumber: 1,
    name: 'Main Building',
    type: 'academic',
    description: 'The central academic block housing lecture theatres and faculty offices.',
    duration: '15 min',
    map: { x: 0.561, y: 0.6 },
    gallery: [
      { src: '/campus/main.jpg', caption: 'Main Building — front entrance' },
      { src: '/campus/main2.jpg', caption: 'Academic complex, full view' },
      { src: '/campus/main4.jpg', caption: 'Covered drop-off and parking' },
      { src: '/campus/topviewjpg.jpg', caption: 'Aerial view of the campus complex' },
    ],
    // Demo 360° — replace src with your MIIT photo: public/panoramas/main-auditorium.jpg
    panorama: {
      type: 'equirectangular',
      src: 'panoramas/mainBuilding.JPG',
      caption: 'Main Building — demo 360°',
      initialView: { yaw: 0, pitch: 0, zoom: 50 },
    },
  },
  {
    id: 'stop-2',
    campus: 'front',
    pinNumber: 2,
    name: 'Car Parking',
    type: 'parking',
    description: 'Visitor and staff car park by the front entrance of the campus.',
    duration: '5 min',
    map: { x: 0.845, y: 0.568 },
  },
  {
    id: 'stop-3',
    campus: 'main',
    pinNumber: 3,
    name: 'Main Auditorium',
    type: 'hall',
    description: 'Central venue for lectures, ceremonies, and major campus events.',
    duration: '15 min',
    map: { x: 0.719, y: 0.702 },
    gallery: [
      { src: '/campus/main3.jpg', caption: 'Ceremonial facade — gilded detailing' },
      { src: '/campus/main5.jpg', caption: 'Auditorium and adjoining glass wing' },
    ],
    // Demo 360° — replace src with your MIIT photo: public/panoramas/main-auditorium.jpg
    panorama: {
      type: 'equirectangular',
      src: 'panoramas/auditorium.jpg',
      caption: 'Main Auditorium — demo 360°',
      initialView: { yaw: 0, pitch: 0, zoom: 50 },
    },
  },
  {
    id: 'stop-4',
    campus: 'main',
    pinNumber: 4,
    name: 'Library',
    type: 'library',
    description: 'Quiet study spaces, reference collections, and digital resources.',
    duration: '15 min',
    map: { x: 0.68, y: 0.723 },
    panorama: { type: 'equirectangular', src: '/panoramas/library.JPG' },
  },
  {
    id: 'stop-5',
    campus: 'main',
    pinNumber: 5,
    name: 'Lecture Rooms',
    type: 'academic',
    description: 'Classrooms and lecture halls used for scheduled coursework.',
    duration: '15 min',
    map: { x: 0.546, y: 0.695 },
    // panorama: { type: 'equirectangular', src: '/panoramas/lecture-rooms.jpg' }
  },
  {
    id: 'stop-6',
    campus: 'main',
    pinNumber: 6,
    name: 'Parking & Main Road',
    type: 'road',
    description: 'Vehicle parking and the tree-lined main approach road.',
    duration: '5 min',
    map: { x: 0.779, y: 0.56 },
    panorama: {
      type: 'equirectangular',
      src: '/panoramas/footballField.JPG',
      caption: 'Main Auditorium — front entrance',
      initialView: { yaw: 0, pitch: 0, zoom: 50 },
  },
  },
  {
    id: 'stop-7',
    campus: 'back',
    pinNumber: 7,
    name: 'Cycle Parking',
    type: 'parking',
    description: 'Bicycle and motorbike parking at the rear of the campus.',
    duration: '5 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.370, y: 0.641 },
  },
  {
    id: 'stop-8',
    campus: 'main',
    pinNumber: 8,
    name: 'Faculty Departments',
    type: 'academic',
    description: 'Departmental offices for the CSE and ECE faculties.',
    duration: '10 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.454, y: 0.549 },
  },
  {
    id: 'stop-9',
    campus: 'main',
    pinNumber: 9,
    name: 'Lab Rooms',
    type: 'lab',
    description: 'Specialised laboratories for electronics, networking, and research.',
    duration: '15 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.574, y: 0.533 },
  },
  {
    id: 'stop-10',
    campus: 'back',
    pinNumber: 10,
    name: 'Stadium',
    type: 'sports',
    description: 'Outdoor sports ground and running track for athletics and events.',
    duration: '10 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.308, y: 0.586 },
    panorama: { type: 'equirectangular', src: '/panoramas/stadium.JPG' },
  },
  {
    id: 'stop-11',
    campus: 'back',
    pinNumber: 11,
    name: 'Girl Hostel',
    type: 'hostel',
    description: 'On-campus residence hall for female students.',
    duration: '5 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.252, y: 0.307 },
  },
  {
    id: 'stop-12',
    campus: 'right',
    pinNumber: 12,
    name: 'Boy Hostel',
    type: 'hostel',
    description: 'On-campus residence hall for male students.',
    duration: '5 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.469, y: 0.873 },
  },
  {
    id: 'stop-13',
    campus: 'left',
    pinNumber: 13,
    name: 'Faculty Hostel 1',
    type: 'hostel',
    description: 'Staff accommodation block.',
    duration: '5 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.150, y: 0.629 },
  },
  {
    id: 'stop-14',
    campus: 'back',
    pinNumber: 14,
    name: 'Faculty Hostel 2',
    type: 'hostel',
    description: 'Additional staff accommodation block.',
    duration: '5 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.399, y: 0.119 },
  },
  {
    id: 'stop-15',
    campus: 'front-right',
    pinNumber: 15,
    name: 'Professor Hostel',
    type: 'hostel',
    description: 'Senior faculty and professor residences.',
    duration: '5 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.757, y: 0.910 },
  },
  {
    id: 'stop-16',
    campus: 'front',
    pinNumber: 16,
    name: 'Main Entrance(Gate 1)',
    type: 'entrance',
    description: 'Primary entrance gate for vehicles and pedestrians, facing the main road.',
    duration: '5 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.902, y: 0.291 },
    panorama: { type: 'equirectangular', src: '/panoramas/Gate1.JPG' },
    gallery: [
      { src: '/campus/Entrance.jpg', caption: 'MIIT main entrance gate' },
    ],
    
  },
  {
    id: 'stop-17',
    campus: 'front',
    pinNumber: 17,
    name: 'Entrance 2 (Gate 2)',
    type: 'entrance',
    description: 'Secondary entrance gate providing alternative access to the campus.',
    duration: '5 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.890, y: 0.844 },
    panorama: { type: 'equirectangular', src: '/panoramas/Gate2.JPG' },
  },
  {
    id: 'stop-18',
    campus: 'left',
    pinNumber: 18,
    name: 'Canteen',
    type: 'canteen',
    description: 'Student dining hall serving meals, snacks, and drinks.',
    duration: '10 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.627, y: 0.256 },
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
