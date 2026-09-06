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
      { src: '/campus/MainBuilding/photo_1_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 1' },
      { src: '/campus/MainBuilding/photo_2_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 2' },
      { src: '/campus/MainBuilding/photo_3_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 3' },
      { src: '/campus/MainBuilding/photo_4_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 4' },
      { src: '/campus/MainBuilding/photo_5_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 5' },
      { src: '/campus/MainBuilding/photo_6_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 6' },
      { src: '/campus/MainBuilding/photo_7_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 7' },
      { src: '/campus/MainBuilding/photo_8_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 8' },
      { src: '/campus/MainBuilding/photo_9_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 9' },
      { src: '/campus/MainBuilding/photo_10_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 10' },
      { src: '/campus/MainBuilding/photo_11_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 11' },
      { src: '/campus/MainBuilding/photo_12_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 12' },
      { src: '/campus/MainBuilding/photo_13_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 13' },
      { src: '/campus/MainBuilding/photo_14_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 14' },
      { src: '/campus/MainBuilding/photo_15_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 15' },
      { src: '/campus/MainBuilding/photo_16_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 16' },
      { src: '/campus/MainBuilding/photo_17_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 17' },
      { src: '/campus/MainBuilding/photo_18_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 18' },
      { src: '/campus/MainBuilding/photo_19_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 19' },
      { src: '/campus/MainBuilding/photo_20_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 20' },
      { src: '/campus/MainBuilding/photo_21_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 21' },
      { src: '/campus/MainBuilding/photo_22_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 22' },
      { src: '/campus/MainBuilding/photo_23_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 23' },
      { src: '/campus/MainBuilding/photo_24_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 24' },
      { src: '/campus/MainBuilding/photo_25_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 25' },
      { src: '/campus/MainBuilding/photo_26_2026-07-26_12-13-45.jpg', caption: 'Main Building — photo 26' },
      { src: '/campus/MainBuilding/photo_1_2026-07-26_12-00-24.jpg', caption: 'Main Building — photo 27' },
      { src: '/campus/MainBuilding/photo_4_2026-07-26_12-00-24.jpg', caption: 'Main Building — photo 28' },
      { src: '/campus/MainBuilding/photo_5_2026-07-26_12-00-24.jpg', caption: 'Main Building — photo 29' },
      { src: '/campus/MainBuilding/photo_6_2026-07-26_12-00-24.jpg', caption: 'Main Building — photo 30' },
      { src: '/campus/MainBuilding/photo_7_2026-07-26_12-00-24.jpg', caption: 'Main Building — photo 31' },
      { src: '/campus/MainBuilding/photo_10_2026-07-26_12-00-24.jpg', caption: 'Main Building — photo 32' },
      { src: '/campus/MainBuilding/photo_15_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 33' },
      { src: '/campus/MainBuilding/photo_16_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 34' },
      { src: '/campus/MainBuilding/photo_52_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 35' },
      { src: '/campus/MainBuilding/photo_64_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 36' },
      { src: '/campus/MainBuilding/photo_66_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 37' },
      { src: '/campus/MainBuilding/photo_75_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 38' },
      { src: '/campus/MainBuilding/photo_76_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 39' },
      { src: '/campus/MainBuilding/photo_77_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 40' },
      { src: '/campus/MainBuilding/photo_86_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 41' },
      { src: '/campus/MainBuilding/photo_88_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 42' },
      { src: '/campus/MainBuilding/photo_89_2026-07-26_12-01-16.jpg', caption: 'Main Building — photo 43' },
    ],
    panorama: {
      type: 'equirectangular',
      src: '/panoramas/mainBuilding.JPG',
      caption: 'Main Building — 360° view',
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
    gallery: [
      { src: '/campus/CarParking/main.jpg', caption: 'Car Parking — photo 1' },
      { src: '/campus/CarParking/main2.jpg', caption: 'Car Parking — photo 2' },
      { src: '/campus/CarParking/main4.jpg', caption: 'Car Parking — photo 3' },
    ],
  },
  {
    id: 'stop-3',
    campus: 'main',
    pinNumber: 3,
    name: 'Main Auditorium',
    type: 'hall',
    description: 'Central venue for ceremonies, and major campus events.',
    duration: '15 min',
    map: { x: 0.719, y: 0.702 },
    gallery: [
      { src: '/campus/Auditorium/auditorium.jpg', caption: 'Main Auditorium — photo 1' },
    ],
    // Gallery-only stop. The 360° view is disabled because
    // public/panoramas/auditorium.jpg is a plain 720x480 photo, not a 2:1
    // equirectangular panorama — feeding it to the sphere renders it warped.
    // Re-enable once a real 360° shot of the auditorium is available.
    // panorama: {
    //   type: 'equirectangular',
    //   src: '/panoramas/auditorium.jpg',
    //   caption: 'Main Auditorium — 360° view',
    //   initialView: { yaw: 0, pitch: 0, zoom: 50 },
    // },
  },
  {
    id: 'stop-4',
    campus: 'main',
    pinNumber: 4,
    name: 'Library',
    type: 'library',
    description: 'Quiet study spaces, reference collections, and resources.',
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
    gallery: [
      { src: '/campus/LectureRooms/lectureRooms3rdFloor.jpg', caption: 'Lecture Rooms — 3rd floor' },
      { src: '/campus/LectureRooms/photo_1_2026-07-26_12-09-50.jpg', caption: 'Lecture Rooms — photo 2' },
      { src: '/campus/LectureRooms/photo_2_2026-07-26_12-09-50.jpg', caption: 'Lecture Rooms — photo 3' },
      { src: '/campus/LectureRooms/photo_3_2026-07-26_12-09-50.jpg', caption: 'Lecture Rooms — photo 4' },
      { src: '/campus/LectureRooms/photo_6_2026-07-26_12-09-50.jpg', caption: 'Lecture Rooms — photo 5' },
      { src: '/campus/LectureRooms/photo_3_2026-07-26_12-00-24.jpg', caption: 'Lecture Rooms — photo 6' },
    ],
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
    gallery: [
      { src: '/campus/ParkingMainRoad/photo_41_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 1' },
      { src: '/campus/ParkingMainRoad/photo_42_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 2' },
      { src: '/campus/ParkingMainRoad/photo_43_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 3' },
      { src: '/campus/ParkingMainRoad/photo_44_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 4' },
      { src: '/campus/ParkingMainRoad/photo_45_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 5' },
      { src: '/campus/ParkingMainRoad/photo_46_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 6' },
      { src: '/campus/ParkingMainRoad/photo_47_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 7' },
      { src: '/campus/ParkingMainRoad/photo_48_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 8' },
      { src: '/campus/ParkingMainRoad/photo_62_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 9' },
      { src: '/campus/ParkingMainRoad/photo_63_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 10' },
      { src: '/campus/ParkingMainRoad/photo_78_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 11' },
      { src: '/campus/ParkingMainRoad/photo_79_2026-07-26_12-01-16.jpg', caption: 'Parking & Main Road — photo 12' },
    ],
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
    gallery: [
      { src: '/campus/LabRooms/photo_90_2026-07-26_12-01-16.jpg', caption: 'Lab Rooms — photo 1' },
    ],
  },
  {
    id: 'stop-10',
    campus: 'back',
    pinNumber: 10,
    name: 'Stadium',
    type: 'sports',
    description: 'Indoor sports ground for athletics and events.',
    duration: '10 min',
    // TODO: place with the Pin tool — approximate position
    map: { x: 0.308, y: 0.586 },
    gallery: [
      { src: '/campus/Stadium/photo_19_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 1' },
      { src: '/campus/Stadium/photo_20_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 2' },
      { src: '/campus/Stadium/photo_21_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 3' },
      { src: '/campus/Stadium/photo_22_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 4' },
      { src: '/campus/Stadium/photo_23_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 5' },
      { src: '/campus/Stadium/photo_24_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 6' },
      { src: '/campus/Stadium/photo_25_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 7' },
      { src: '/campus/Stadium/photo_26_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 8' },
      { src: '/campus/Stadium/photo_27_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 9' },
      { src: '/campus/Stadium/photo_28_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 10' },
      { src: '/campus/Stadium/photo_29_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 11' },
      { src: '/campus/Stadium/photo_30_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 12' },
      { src: '/campus/Stadium/photo_31_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 13' },
      { src: '/campus/Stadium/photo_32_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 14' },
      { src: '/campus/Stadium/photo_33_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 15' },
      { src: '/campus/Stadium/photo_34_2026-07-26_12-01-16.jpg', caption: 'Stadium — photo 16' },
    ],
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
    gallery: [
      { src: '/campus/BoyHostel/photo_1_2026-09-06_23-18-05.jpg', caption: 'Boy Hostel — photo 1' },
      { src: '/campus/BoyHostel/photo_2_2026-09-06_23-18-05.jpg', caption: 'Boy Hostel — photo 2' },
    ],
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
      { src: '/campus/Entrance%20Gate1/Entrance.jpg', caption: 'Main Entrance (Gate 1) — photo 1' },
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
    gallery: [
      { src: '/campus/Gate%202/main3.jpg', caption: 'Entrance 2 (Gate 2) — photo 1' },
      { src: '/campus/Gate%202/main5.jpg', caption: 'Entrance 2 (Gate 2) — photo 2' },
    ],
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
    gallery: [
      { src: '/campus/Canteen/photo_35_2026-07-26_12-01-16.jpg', caption: 'Canteen — photo 1' },
      { src: '/campus/Canteen/photo_36_2026-07-26_12-01-16.jpg', caption: 'Canteen — photo 2' },
      { src: '/campus/Canteen/photo_37_2026-07-26_12-01-16.jpg', caption: 'Canteen — photo 3' },
      { src: '/campus/Canteen/photo_38_2026-07-26_12-01-16.jpg', caption: 'Canteen — photo 4' },
      { src: '/campus/Canteen/photo_39_2026-07-26_12-01-16.jpg', caption: 'Canteen — photo 5' },
      { src: '/campus/Canteen/photo_40_2026-07-26_12-01-16.jpg', caption: 'Canteen — photo 6' },
    ],
  },
  {
    id: 'stop-19',
    campus: 'back',
    pinNumber: 19,
    name: 'Football Field',
    type: 'sports',
    description: 'Outdoor football pitch used for matches, training, and inter-department tournaments.',
    duration: '10 min',
    map: { x: 0.595, y: 0.434 },
    gallery: [
      { src: '/campus/FootballField/photo_54_2026-07-26_12-01-16.jpg', caption: 'Football Field — photo 1' },
      { src: '/campus/FootballField/photo_55_2026-07-26_12-01-16.jpg', caption: 'Football Field — photo 2' },
      { src: '/campus/FootballField/photo_56_2026-07-26_12-01-16.jpg', caption: 'Football Field — photo 3' },
      { src: '/campus/FootballField/photo_57_2026-07-26_12-01-16.jpg', caption: 'Football Field — photo 4' },
      { src: '/campus/FootballField/photo_58_2026-07-26_12-01-16.jpg', caption: 'Football Field — photo 5' },
      { src: '/campus/FootballField/photo_59_2026-07-26_12-01-16.jpg', caption: 'Football Field — photo 6' },
      { src: '/campus/FootballField/photo_60_2026-07-26_12-01-16.jpg', caption: 'Football Field — photo 7' },
      { src: '/campus/FootballField/photo_61_2026-07-26_12-01-16.jpg', caption: 'Football Field — photo 8' },
    ],
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
