import { CATEGORIES } from '@/data/posts'

/**
 * Site map for the footer's link columns.
 *
 * Deep links understood by the app:
 *   /blog?category=<Category>   topic filter (also on /sentiment)
 *   /campus-tour?stop=<id>      open a tour stop in the 360° / gallery view
 *   /campus-tour?view=map|360   open the tour in that mode
 *   /faculties-and-staff#<id>   a section, or a single unit (e.g. #fcs)
 *   #<id>                       scroll to a page section (see ScrollManager)
 */

const TOPICS = CATEGORIES.filter((category) => category !== 'All')

function topicLink(path, category) {
  return `${path}?category=${encodeURIComponent(category)}#topics`
}

export const FOOTER_COLUMNS = [
  {
    title: 'Blog Feed',
    links: [
      { label: 'All stories', to: '/blog#topics' },
      { label: 'Featured story', to: '/blog#featured' },
      ...TOPICS.map((topic) => ({ label: topic, to: topicLink('/blog', topic) })),
    ],
  },
  {
    title: 'Campus Tour',
    links: [
      { label: 'Interactive campus map', to: '/campus-tour?view=map#tour' },
      { label: '360° immersive view', to: '/campus-tour?view=360#tour' },
    ],
  },
  {
    title: 'Comment Analysis',
    links: [
      { label: 'Overall sentiment', to: '/sentiment#overall' },
      { label: 'Sentiment by topic', to: '/sentiment#by-topic' },
      { label: 'Sentiment over time', to: '/sentiment#trend' },
      { label: 'Most talked about', to: '/sentiment#most-talked' },
      { label: 'Story-by-story breakdown', to: '/sentiment#all-stories' },
    ],
  },
  {
    title: 'Faculties & Staff',
    links: [
      { label: 'Leadership', to: '/faculties-and-staff#leadership' },
      { label: 'Faculties', to: '/faculties-and-staff#faculties' },
      { label: 'Departments', to: '/faculties-and-staff#departments' },
      { label: 'Our Faculty', to: '/faculties-and-staff#our-faculty' },
    ],
  },
]
