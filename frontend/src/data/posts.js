export const DEMO_POST_IMAGE = '/featured-campus.svg'

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

export function getStats(posts) {
  const totalComments = posts.reduce(
    (sum, post) => sum + (post.commentCount ?? 0),
    0,
  )
  const totalReads = posts.reduce(
    (sum, post) => sum + (Number(post.reads) || 0),
    0,
  )

  return {
    stories: posts.length,
    comments: totalComments,
    reads:
      totalReads >= 1000
        ? `${Math.round(totalReads / 1000)}K`
        : String(totalReads),
  }
}
