/**
 * MIIT organisational structure, mirrored from the institute's own pages:
 *   https://www.miit.edu.mm/en/faculties-and-staff/  (leadership + units)
 *   https://www.miit.edu.mm/en/faculty/              (faculty introduction)
 *
 * Keep `code`, `name`, and leadership titles verbatim from those pages.
 * `id` doubles as the in-page anchor (/faculties-and-staff#<id>).
 *
 * `tagline` (shown on the card) and `courses` (shown when the card is
 * hovered or tapped) are a general description written for this site,
 * not quoted from MIIT.
 */

export const RECTOR = { name: 'Dr. Win Aye', title: 'Rector' }

export const PRO_RECTORS = [
  { id: 'pro-rector-admin', title: 'Pro-Rector', portfolio: 'Admin' },
  { id: 'pro-rector-academic', title: 'Pro-Rector', portfolio: 'Academic' },
]

export const UNIT_TYPES = {
  faculty: { label: 'Faculty', plural: 'Faculties' },
  department: { label: 'Department', plural: 'Departments' },
}

export const ACADEMIC_UNITS = [
  {
    id: 'fcst',
    code: 'FCST',
    name: 'Faculty of Computer Systems and Technologies',
    type: 'faculty',
    tagline: 'Circuits, electronics, and embedded systems',
    courses: [
      'Basic Electric Circuits',
      'Digital Design',
      'Electronics I & II',
      'Microprocessors & Interfacing',
      'Signals & Systems',
      'Computer Organization',
      'Sensors, Actuators & Mechatronics',
      'Arduino-Based System Design',
      'Embedded Systems II',
    ],
  },
  {
    id: 'fcs',
    code: 'FCS',
    name: 'Faculty of Computer Science',
    type: 'faculty',
    tagline: 'Programming, algorithms, and programming languages',
    courses: [
      'Programming I – IV',
      'Data Structures & Algorithms',
      'Principles of Programming Languages',
    ],
  },
  {
    id: 'fis',
    code: 'FIS',
    name: 'Faculty of Information Science',
    type: 'faculty',
    tagline: 'The web, databases, and software engineering',
    courses: [
      'Foundations of Web Programming',
      'Web Application Development',
      'Database Systems I',
      'Software Engineering',
    ],
  },
  {
    id: 'fcm',
    code: 'FCM',
    name: 'Faculty of Computing',
    type: 'faculty',
    tagline: 'Mathematics and the theory of computation',
    courses: ['Mathematics I – V', 'Theory of Computation'],
  },
  {
    id: 'language',
    code: 'Language',
    name: 'Department of Language',
    type: 'department',
    tagline: 'English, communication, and Myanmar culture',
    courses: [
      'English I – V',
      'English IV – Advanced',
      'Technical Communication',
      'Myanmar Language & Culture',
    ],
  },
  {
    id: 'natural-science',
    code: 'Natural Science',
    name: 'Department of Natural Science',
    type: 'department',
    tagline: 'Physics and chemistry',
    courses: ['Physics I – IV', 'Physics I Lab', 'Chemistry Lab'],
  },
  {
    id: 'itsm',
    code: 'ITSM',
    name: 'Department of Information Technology Supporting and Maintenance',
    type: 'department',
    tagline: 'Hands-on system administration and Linux',
    courses: ['Lab Course 1', 'System Administration', 'Linux (Lab Course 4)'],
  },
]

export const FACULTY_INTRO = [
  'MIIT, in its formative years, is being supported by the experienced faculty deputed from the International Institute of Information Technology, Bangalore, India. They have the dual role of spearheading the teaching activities at MIIT, while also preparing the faculty from Myanmar on emerging content, pedagogy, and assessments.',
  'The faculty from India and Myanmar work together as a team in the conduct of various courses. It is envisaged that the faculty from Myanmar will completely take over the teaching activities in all the courses by the end of the year 2020. The faculty members are also engaged in various research projects across several disciplines.',
]
