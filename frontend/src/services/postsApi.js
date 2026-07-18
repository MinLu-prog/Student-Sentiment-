import { POSTS, getStats as computeStats } from '@/data/posts'
import {
  CAMPUS_TOUR_STOPS,
  COMMENTS,
  LIKES,
  computeSentiment,
  getUserById,
} from '@/data/mockDb'

const CURRENT_USER_ID = 'user-1'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

function formatReadCount(reads) {
  if (typeof reads === 'number') {
    return reads >= 1000 ? `${(reads / 1000).toFixed(reads % 1000 === 0 ? 0 : 1)}K` : String(reads)
  }

  return reads ?? '0'
}

function normalizeComment(comment) {
  return {
    ...comment,
    author: comment.author ??
      (comment.user
        ? { id: comment.user.id, name: comment.user.name, role: comment.user.role }
        : { id: comment.userId, name: 'Unknown User', role: 'USER' }),
  }
}

function normalizePost(post) {
  const comments = (post.comments ?? [])
    .map(normalizeComment)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  return {
    ...post,
    reads: formatReadCount(post.reads),
    comments,
    commentCount: post.commentCount ?? comments.length,
    likeCount: post.likeCount ?? post.likes?.length ?? 0,
    likedByCurrentUser: Boolean(post.likedByCurrentUser),
    sentiment: post.sentiment ?? computeSentiment(comments),
  }
}

async function fetchJson(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

function enrichComment(comment) {
  const author = getUserById(comment.userId)

  return {
    ...comment,
    author: author
      ? { id: author.id, name: author.name, role: author.role }
      : { id: comment.userId, name: 'Unknown User', role: 'guest' },
  }
}

function enrichPost(post, likes, comments) {
  const postLikes = likes.filter((like) => like.postId === post.id)
  const postComments = comments
    .filter((comment) => comment.postId === post.id)
    .map(enrichComment)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  return {
    ...post,
    likeCount: postLikes.length,
    commentCount: postComments.length,
    likes: postLikes,
    comments: postComments,
    sentiment: computeSentiment(postComments),
    likedByCurrentUser: postLikes.some((like) => like.userId === CURRENT_USER_ID),
  }
}

let likesStore = [...LIKES]
let commentsStore = [...COMMENTS]

function fetchMockPosts({ campus } = {}) {
  const filtered = campus ? POSTS.filter((post) => post.campus === campus) : POSTS
  return filtered.map((post) => enrichPost(post, likesStore, commentsStore))
}

function fetchMockPostById(postId) {
  const post = POSTS.find((item) => item.id === Number(postId))
  if (!post) return null
  return enrichPost(post, likesStore, commentsStore)
}

export async function fetchPosts({ campus } = {}) {
  try {
    const query = campus ? `?campus=${encodeURIComponent(campus)}` : ''
    const posts = await fetchJson(`/posts${query}`)
    return posts.map(normalizePost)
  } catch (error) {
    console.warn('Using mock posts because backend posts could not be loaded.', error)
    return fetchMockPosts({ campus })
  }
}

export async function fetchPostById(postId) {
  try {
    const post = await fetchJson(`/posts/${postId}`)
    return normalizePost(post)
  } catch (error) {
    console.warn('Using mock post because backend post could not be loaded.', error)
    return fetchMockPostById(postId)
  }
}

// eslint-disable-next-line no-unused-vars
export function fetchCampusTourStops(_campus) {
  // MIIT is a single physical campus, so the tour shows every stop regardless
  // of the news-feed campus selector. Ordered by pin number to match the map.
  return [...CAMPUS_TOUR_STOPS].sort(
    (a, b) => (a.pinNumber ?? 0) - (b.pinNumber ?? 0),
  )
}

export async function togglePostLike(postId) {
  const existing = likesStore.find(
    (like) => like.postId === postId && like.userId === CURRENT_USER_ID,
  )

  if (existing) {
    likesStore = likesStore.filter((like) => like.id !== existing.id)
  } else {
    likesStore = [
      ...likesStore,
      {
        id: `like-${Date.now()}`,
        postId,
        userId: CURRENT_USER_ID,
        createdAt: new Date().toISOString(),
      },
    ]
  }

  return fetchMockPostById(postId)
}

export async function addComment(postId, content, sentiment = 'neutral') {
  const trimmedContent = content.trim()

  if (!trimmedContent) {
    throw new Error('Comment cannot be empty')
  }

  try {
    const comment = await fetchJson('/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId: Number(postId),
        userId: CURRENT_USER_ID,
        content: trimmedContent,
        sentiment,
      }),
    })

    return normalizeComment(comment)
  } catch (error) {
    console.warn('Saving comment to mock data because backend comments failed.', error)
  }

  const comment = {
    id: `comment-${Date.now()}`,
    postId,
    userId: CURRENT_USER_ID,
    content: trimmedContent,
    sentiment,
    createdAt: new Date().toISOString(),
  }

  commentsStore = [...commentsStore, comment]
  return enrichComment(comment)
}

export function getStats(posts) {
  return computeStats(posts)
}

export const postsApi = {
  fetchPosts,
  fetchPostById,
  fetchCampusTourStops,
  togglePostLike,
  addComment,
  getStats,
}
