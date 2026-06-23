import { api } from '@/services/api'
import { getCurrentUserId } from '@/services/auth'

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

export async function fetchPosts({ campus } = {}) {
  const query = campus ? `?campus=${encodeURIComponent(campus)}` : ''
  return api.get(`/posts${query}`)
}

export async function fetchPostById(postId) {
  try {
    return await api.get(`/posts/${postId}`)
  } catch (error) {
    if (error.status === 404) return null
    throw error
  }
}

export async function fetchCampusTourStops(campus) {
  const query = campus ? `?campus=${encodeURIComponent(campus)}` : ''
  return api.get(`/campus-tour${query}`)
}

export async function togglePostLike(postId) {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error('You must be logged in to like a post.')
  }

  const post = await fetchPostById(postId)
  if (!post) {
    throw new Error('Post not found.')
  }

  if (post.likedByCurrentUser) {
    const likes = await api.get('/likes')
    const existing = likes.find(
      (like) => like.postId === postId && like.userId === userId,
    )

    if (existing) {
      await api.delete(`/likes/${existing.id}`)
    }
  } else {
    await api.post('/likes', { postId, userId })
  }

  return fetchPostById(postId)
}

export async function addComment(postId, content, sentiment = 'neutral') {
  const userId = getCurrentUserId()
  if (!userId) {
    throw new Error('You must be logged in to comment.')
  }

  return api.post('/comments', {
    postId,
    userId,
    content,
    sentiment,
  })
}

export const postsApi = {
  fetchPosts,
  fetchPostById,
  fetchCampusTourStops,
  togglePostLike,
  addComment,
  getStats,
}
