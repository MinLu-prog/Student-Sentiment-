import 'dotenv/config'
import bcrypt from 'bcrypt'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  const saltRounds = 10

  await prisma.user.createMany({
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
  console.log('Users seeded')

  await prisma.post.createMany({
    data: [
      {
        id: 1,
        featured: true,
        category: 'Academic',
        campus: 'main',
        date: 'May 28, 2025',
        title: 'Annual Science Fair 2025 Showcases Student Innovation',
        excerpt: "Students from across MIIT presented groundbreaking projects in robotics, environmental science, and biomedical engineering at this year's fair.",
        body: "The Annual Science Fair brought together over 200 student researchers showcasing innovative projects. From sustainable energy solutions to AI-assisted medical diagnostics, the event highlighted the creative spirit driving MIIT's academic community forward.",
        images: ['/campus/CarParking/main.jpg', '/campus/LectureRooms/lectureRooms3rdFloor.jpg', '/campus/Auditorium/auditorium.jpg'],
        tags: ['Science', 'Research', 'Innovation', 'STEM'],
        reads: 12000,
      },
      {
        id: 2,
        featured: false,
        category: 'Campus News',
        campus: 'main',
        date: 'May 22, 2025',
        title: 'MIIT Launches New Sustainability Initiative',
        excerpt: 'The university announces a comprehensive plan to achieve carbon neutrality by 2035, including solar installations and green building upgrades.',
        body: 'MIIT has unveiled an ambitious sustainability roadmap that will transform campus infrastructure over the next decade. The initiative includes rooftop solar panels, expanded recycling programmes, and a new environmental studies minor.',
        images: ['/campus/CarParking/main2.jpg', '/campus/topviewjpg.jpg', '/campus/Gate 2/main3.jpg'],
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
        excerpt: 'Music, theatre, and visual arts performances filled the quad during the three-day celebration of student creativity.',
        body: 'The Spring Arts Festival transformed the main quad into a vibrant showcase of talent. Over 50 student groups performed, with attendance reaching an all-time high of 3,000 visitors across the weekend.',
        images: ['/campus/Entrance Gate1/Entrance.jpg', '/campus/CarParking/main4.jpg', '/campus/mainBuilding1.jpg'],
        tags: ['Arts', 'Music', 'Theatre', 'Festival'],
        reads: 5100,
      },
      {
        id: 4,
        featured: false,
        category: 'Sports',
        campus: 'main',
        date: 'May 14, 2025',
        title: 'MIIT Eagles Clinch Conference Championship',
        excerpt: "The men's basketball team secured their first conference title in over a decade with a thrilling overtime victory.",
        body: "In a nail-biting overtime finish, the MIIT Eagles defeated their rivals 78-75 to claim the conference championship. Coach Martinez praised the team's resilience and dedication throughout the season.",
        images: ['/campus/mainBuildingBadmintonCourt.jpg', '/campus/Gate 2/main5.jpg', '/campus/CarParking/main.jpg'],
        tags: ['Sports', 'Basketball', 'Championship', 'Athletics'],
        reads: 9400,
      },
      {
        id: 5,
        featured: false,
        category: 'Engineering',
        campus: 'main',
        date: 'May 10, 2025',
        title: 'Engineering Students Build Autonomous Delivery Robot',
        excerpt: 'A team of seniors developed a campus navigation robot that could streamline mail and package delivery across MIIT.',
        body: 'The senior capstone project combines computer vision, GPS mapping, and obstacle avoidance to create a fully autonomous delivery robot. The prototype successfully completed a test run across the East Campus.',
        images: ['/campus/LectureRooms/lectureRooms3rdFloor.jpg', '/campus/mainBuilding1.jpg', '/campus/Gate 2/main3.jpg'],
        tags: ['Engineering', 'Robotics', 'AI', 'Innovation'],
        reads: 3800,
      },
      {
        id: 6,
        featured: false,
        category: 'Student Life',
        campus: 'main',
        date: 'May 5, 2025',
        title: 'New Student Wellness Center Opens Its Doors',
        excerpt: 'The state-of-the-art facility offers counselling, fitness classes, and mindfulness spaces for the entire MIIT community.',
        body: "The new Wellness Center provides comprehensive mental health support, group fitness sessions, and quiet meditation rooms. Student feedback during the planning phase shaped many of the centre's key features.",
        images: ['/campus/Entrance Gate1/Entrance.jpg', '/campus/Auditorium/auditorium.jpg', '/campus/topviewjpg.jpg'],
        tags: ['Wellness', 'Health', 'Student Life', 'Campus'],
        reads: 6700,
      },
    ],
    skipDuplicates: true,
  })
  console.log('Posts seeded')

  await prisma.comment.createMany({
    data: [
      { id: 'comment-1',  postId: 1, userId: 'user-2', content: 'Amazing projects this year — the robotics demos were outstanding!',      sentiment: 'positive', createdAt: new Date('2025-05-28T10:05:00Z') },
      { id: 'comment-2',  postId: 1, userId: 'user-4', content: 'Great to see so many students participating across departments.',          sentiment: 'positive', createdAt: new Date('2025-05-28T11:20:00Z') },
      { id: 'comment-3',  postId: 1, userId: 'user-6', content: 'The venue was a bit crowded during peak hours.',                          sentiment: 'neutral',  createdAt: new Date('2025-05-28T12:00:00Z') },
      { id: 'comment-4',  postId: 1, userId: 'user-5', content: 'Wish there were more seating areas near the main hall.',                  sentiment: 'positive', createdAt: new Date('2025-05-28T13:10:00Z') },
      { id: 'comment-5',  postId: 1, userId: 'user-3', content: 'Some exhibits ran out of handouts too quickly.',                          sentiment: 'neutral',  createdAt: new Date('2025-05-28T14:30:00Z') },
      { id: 'comment-6',  postId: 2, userId: 'user-1', content: 'Love that MIIT is taking sustainability seriously!',                      sentiment: 'positive', createdAt: new Date('2025-05-22T09:00:00Z') },
      { id: 'comment-7',  postId: 2, userId: 'user-2', content: 'The solar panel plan sounds promising for North Campus.',                  sentiment: 'positive', createdAt: new Date('2025-05-22T10:30:00Z') },
      { id: 'comment-8',  postId: 2, userId: 'user-4', content: 'Will there be updates on the timeline each semester?',                    sentiment: 'neutral',  createdAt: new Date('2025-05-22T11:00:00Z') },
      { id: 'comment-9',  postId: 2, userId: 'user-6', content: 'Recycling bins still need better labelling in some buildings.',           sentiment: 'positive', createdAt: new Date('2025-05-22T12:45:00Z') },
      { id: 'comment-10', postId: 2, userId: 'user-5', content: '2035 feels far away — hope interim targets are shared soon.',             sentiment: 'positive', createdAt: new Date('2025-05-22T15:00:00Z') },
      { id: 'comment-11', postId: 3, userId: 'user-1', content: 'The theatre performances were absolutely brilliant!',                     sentiment: 'positive', createdAt: new Date('2025-05-18T16:00:00Z') },
      { id: 'comment-12', postId: 3, userId: 'user-3', content: 'Record crowds — food stalls could use more variety next year.',           sentiment: 'neutral',  createdAt: new Date('2025-05-18T17:30:00Z') },
      { id: 'comment-13', postId: 3, userId: 'user-6', content: 'Sound quality at the outdoor stage needs improvement.',                   sentiment: 'positive', createdAt: new Date('2025-05-18T18:00:00Z') },
      { id: 'comment-14', postId: 4, userId: 'user-2', content: 'What a game! Proud of the MIIT Eagles!',                                  sentiment: 'positive', createdAt: new Date('2025-05-14T20:00:00Z') },
      { id: 'comment-15', postId: 5, userId: 'user-4', content: 'The delivery robot demo on East Campus was impressive.',                  sentiment: 'positive', createdAt: new Date('2025-05-10T11:00:00Z') },
      { id: 'comment-16', postId: 5, userId: 'user-1', content: 'Curious how it handles stairs and narrow corridors.',                     sentiment: 'positive', createdAt: new Date('2025-05-10T12:30:00Z') },
      { id: 'comment-17', postId: 6, userId: 'user-2', content: 'The wellness centre meditation rooms are a great addition.',              sentiment: 'positive', createdAt: new Date('2025-05-05T13:00:00Z') },
      { id: 'comment-18', postId: 6, userId: 'user-5', content: 'Booking system for counselling slots would help.',                        sentiment: 'positive', createdAt: new Date('2025-05-05T14:00:00Z') },
    ],
    skipDuplicates: true,
  })
  console.log('Comments seeded')

  await prisma.like.createMany({
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
    ],
    skipDuplicates: true,
  })
  console.log('Likes seeded')

  await prisma.campusTourStop.createMany({
    // Gallery paths and coordinates mirror frontend/src/data/mockDb.js
    // (CAMPUS_TOUR_STOPS) — keep the two in sync when photos are added/moved.
    data: [
      {
        id: 'stop-1', campus: 'main', pinNumber: 1, name: 'Main Building', type: 'academic',
        description: 'The central academic block housing lecture theatres and faculty offices.',
        duration: '15 min', mapX: 0.561, mapY: 0.6,
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
          type: 'equirectangular', src: '/panoramas/mainBuilding.JPG',
          caption: 'Main Building — 360° view', initialView: { yaw: 0, pitch: 0, zoom: 50 },
        },
      },
      {
        id: 'stop-2', campus: 'front', pinNumber: 2, name: 'Car Parking', type: 'parking',
        description: 'Visitor and staff car park by the front entrance of the campus.',
        duration: '5 min', mapX: 0.845, mapY: 0.568,
        gallery: [
          { src: '/campus/CarParking/main.jpg', caption: 'Car Parking — photo 1' },
          { src: '/campus/CarParking/main2.jpg', caption: 'Car Parking — photo 2' },
          { src: '/campus/CarParking/main4.jpg', caption: 'Car Parking — photo 3' },
        ],
      },
      {
        id: 'stop-3', campus: 'main', pinNumber: 3, name: 'Main Auditorium', type: 'hall',
        description: 'Central venue for ceremonies, and major campus events.',
        duration: '15 min', mapX: 0.719, mapY: 0.702,
        gallery: [
          { src: '/campus/Auditorium/auditorium.jpg', caption: 'Main Auditorium — photo 1' },
        ],
        // Gallery-only stop. The 360° view is disabled because
        // public/panoramas/auditorium.jpg is a plain 720x480 photo, not a 2:1
        // equirectangular panorama — feeding it to the sphere renders it warped.
        // Re-enable once a real 360° shot of the auditorium is available.
        // panorama: {
        //   type: 'equirectangular', src: '/panoramas/auditorium.jpg',
        //   caption: 'Main Auditorium — 360° view', initialView: { yaw: 0, pitch: 0, zoom: 50 },
        // },
      },
      {
        id: 'stop-4', campus: 'main', pinNumber: 4, name: 'Library', type: 'library',
        description: 'Quiet study spaces, reference collections, and resources.',
        duration: '15 min', mapX: 0.68, mapY: 0.723,
        panorama: { type: 'equirectangular', src: '/panoramas/library.JPG' },
      },
      {
        id: 'stop-5', campus: 'main', pinNumber: 5, name: 'Lecture Rooms', type: 'academic',
        description: 'Classrooms and lecture halls used for scheduled coursework.',
        duration: '15 min', mapX: 0.546, mapY: 0.695,
        gallery: [
          { src: '/campus/LectureRooms/lectureRooms3rdFloor.jpg', caption: 'Lecture Rooms — 3rd floor' },
          { src: '/campus/LectureRooms/photo_1_2026-07-26_12-09-50.jpg', caption: 'Lecture Rooms — photo 2' },
          { src: '/campus/LectureRooms/photo_2_2026-07-26_12-09-50.jpg', caption: 'Lecture Rooms — photo 3' },
          { src: '/campus/LectureRooms/photo_3_2026-07-26_12-09-50.jpg', caption: 'Lecture Rooms — photo 4' },
          { src: '/campus/LectureRooms/photo_6_2026-07-26_12-09-50.jpg', caption: 'Lecture Rooms — photo 5' },
          { src: '/campus/LectureRooms/photo_3_2026-07-26_12-00-24.jpg', caption: 'Lecture Rooms — photo 6' },
        ],
      },
      {
        id: 'stop-6', campus: 'main', pinNumber: 6, name: 'Parking & Main Road', type: 'road',
        description: 'Vehicle parking and the tree-lined main approach road.',
        duration: '5 min', mapX: 0.779, mapY: 0.56,
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
          type: 'equirectangular', src: '/panoramas/footballField.JPG',
          caption: 'Main Auditorium — front entrance', initialView: { yaw: 0, pitch: 0, zoom: 50 },
        },
      },
      {
        id: 'stop-7', campus: 'back', pinNumber: 7, name: 'Cycle Parking', type: 'parking',
        description: 'Bicycle and motorbike parking at the rear of the campus.',
        duration: '5 min', mapX: 0.37, mapY: 0.641,
      },
      {
        id: 'stop-8', campus: 'main', pinNumber: 8, name: 'Faculty Departments', type: 'academic',
        description: 'Departmental offices for the CSE and ECE faculties.',
        duration: '10 min', mapX: 0.454, mapY: 0.549,
      },
      {
        id: 'stop-9', campus: 'main', pinNumber: 9, name: 'Lab Rooms', type: 'lab',
        description: 'Specialised laboratories for electronics, networking, and research.',
        duration: '15 min', mapX: 0.574, mapY: 0.533,
        gallery: [
          { src: '/campus/LabRooms/photo_90_2026-07-26_12-01-16.jpg', caption: 'Lab Rooms — photo 1' },
        ],
      },
      {
        id: 'stop-10', campus: 'back', pinNumber: 10, name: 'Stadium', type: 'sports',
        description: 'Indoor sports ground for athletics and events.',
        duration: '10 min', mapX: 0.308, mapY: 0.586,
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
        id: 'stop-11', campus: 'back', pinNumber: 11, name: 'Girl Hostel', type: 'hostel',
        description: 'On-campus residence hall for female students.',
        duration: '5 min', mapX: 0.252, mapY: 0.307,
      },
      {
        id: 'stop-12', campus: 'right', pinNumber: 12, name: 'Boy Hostel', type: 'hostel',
        description: 'On-campus residence hall for male students.',
        duration: '5 min', mapX: 0.469, mapY: 0.873,
        gallery: [
          { src: '/campus/BoyHostel/photo_1_2026-09-06_23-18-05.jpg', caption: 'Boy Hostel — photo 1' },
          { src: '/campus/BoyHostel/photo_2_2026-09-06_23-18-05.jpg', caption: 'Boy Hostel — photo 2' },
        ],
      },
      {
        id: 'stop-13', campus: 'left', pinNumber: 13, name: 'Faculty Hostel 1', type: 'hostel',
        description: 'Staff accommodation block.',
        duration: '5 min', mapX: 0.15, mapY: 0.629,
      },
      {
        id: 'stop-14', campus: 'back', pinNumber: 14, name: 'Faculty Hostel 2', type: 'hostel',
        description: 'Additional staff accommodation block.',
        duration: '5 min', mapX: 0.399, mapY: 0.119,
      },
      {
        id: 'stop-15', campus: 'front-right', pinNumber: 15, name: 'Professor Hostel', type: 'hostel',
        description: 'Senior faculty and professor residences.',
        duration: '5 min', mapX: 0.757, mapY: 0.91,
      },
      {
        id: 'stop-16', campus: 'front', pinNumber: 16, name: 'Main Entrance(Gate 1)', type: 'entrance',
        description: 'Primary entrance gate for vehicles and pedestrians, facing the main road.',
        duration: '5 min', mapX: 0.902, mapY: 0.291,
        gallery: [
          { src: '/campus/Entrance%20Gate1/Entrance.jpg', caption: 'Main Entrance (Gate 1) — photo 1' },
        ],
        panorama: { type: 'equirectangular', src: '/panoramas/Gate1.JPG' },
      },
      {
        id: 'stop-17', campus: 'front', pinNumber: 17, name: 'Entrance 2 (Gate 2)', type: 'entrance',
        description: 'Secondary entrance gate providing alternative access to the campus.',
        duration: '5 min', mapX: 0.89, mapY: 0.844,
        gallery: [
          { src: '/campus/Gate%202/main3.jpg', caption: 'Entrance 2 (Gate 2) — photo 1' },
          { src: '/campus/Gate%202/main5.jpg', caption: 'Entrance 2 (Gate 2) — photo 2' },
        ],
        panorama: { type: 'equirectangular', src: '/panoramas/Gate2.JPG' },
      },
      {
        id: 'stop-18', campus: 'left', pinNumber: 18, name: 'Canteen', type: 'canteen',
        description: 'Student dining hall serving meals, snacks, and drinks.',
        duration: '10 min', mapX: 0.627, mapY: 0.256,
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
        id: 'stop-19', campus: 'back', pinNumber: 19, name: 'Football Field', type: 'sports',
        description: 'Outdoor football pitch used for matches, training, and inter-department tournaments.',
        duration: '10 min', mapX: 0.595, mapY: 0.434,
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
    ],
    skipDuplicates: true,
  })
  console.log('Campus tour stops seeded')

  // Post.id is autoincrement but the posts above are inserted with explicit ids,
  // which does not advance the underlying sequence. Without this, the first
  // prisma.post.create() would reuse id 1 and fail with P2002 on `id`.
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"Post"', 'id'), COALESCE((SELECT MAX(id) FROM "Post"), 0) + 1, false)`
  )
  console.log('Post id sequence realigned')

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
