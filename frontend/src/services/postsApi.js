import { POSTS, getStats as computeStats } from '@/data/posts'
import {
  CAMPUS_TOUR_STOPS,
  COMMENTS,
  LIKES,
  computeSentiment,
  getUserById,
} from '@/data/mockDb'

// Identity used only when the backend is unreachable and API calls fall back
// to local mock data — unrelated to real auth, which is handled by AuthContext.
const MOCK_FALLBACK_USER_ID = 'user-1'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'
// Uploaded files are served from the backend's origin (no /api prefix), so
// image URLs stored on posts/tour stops need to be absolute — a relative
// `/uploads/...` path would otherwise resolve against the frontend's own
// origin instead of the backend's.
const UPLOAD_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '')

let authToken = null

export function setAuthToken(token) {
  authToken = token
}

export function getAuthToken() {
  return authToken
}

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
    myLikeId: post.myLikeId ?? null,
    sentiment: post.sentiment ?? computeSentiment(comments),
  }
}

async function fetchJson(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    let message = `Request failed with ${response.status}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {
      // response body wasn't JSON — keep the generic message
    }
    throw new Error(message)
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

function enrichPost(post, likes, comments, currentUserId = null) {
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
    likedByCurrentUser: currentUserId
      ? postLikes.some((like) => like.userId === currentUserId)
      : false,
    myLikeId: currentUserId
      ? postLikes.find((like) => like.userId === currentUserId)?.id ?? null
      : null,
  }
}

let likesStore = [...LIKES]
let commentsStore = [...COMMENTS]

function fetchMockPosts({ campus } = {}) {
  const filtered = campus ? POSTS.filter((post) => post.campus === campus) : POSTS
  return filtered.map((post) => enrichPost(post, likesStore, commentsStore, MOCK_FALLBACK_USER_ID))
}

function fetchMockPostById(postId, currentUserId = MOCK_FALLBACK_USER_ID) {
  const post = POSTS.find((item) => item.id === Number(postId))
  if (!post) return null
  return enrichPost(post, likesStore, commentsStore, currentUserId)
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

function normalizeTourStop(stop) {
  return {
    ...stop,
    map: (typeof stop.mapX === 'number' && typeof stop.mapY === 'number')
      ? { x: stop.mapX, y: stop.mapY }
      : undefined,
  }
}

function sortByPinNumber(stops) {
  return [...stops].sort((a, b) => (a.pinNumber ?? 0) - (b.pinNumber ?? 0))
}

// Strict fetch, no mock fallback — used by the admin tour-stop pages, where a
// real backend error should surface rather than being masked by stale mock data.
export async function fetchTourStops() {
  const stops = await fetchJson('/campus-tour')
  return sortByPinNumber(stops.map(normalizeTourStop))
}

// eslint-disable-next-line no-unused-vars
export async function fetchCampusTourStops(_campus) {
  try {
    return await fetchTourStops()
  } catch (error) {
    console.warn('Using mock tour stops because backend campus-tour could not be loaded.', error)
    return sortByPinNumber(CAMPUS_TOUR_STOPS)
  }
}

function toggleMockLike(postId) {
  const existing = likesStore.find(
    (like) => like.postId === postId && like.userId === MOCK_FALLBACK_USER_ID,
  )

  if (existing) {
    likesStore = likesStore.filter((like) => like.id !== existing.id)
  } else {
    likesStore = [
      ...likesStore,
      {
        id: `like-${Date.now()}`,
        postId,
        userId: MOCK_FALLBACK_USER_ID,
        createdAt: new Date().toISOString(),
      },
    ]
  }

  return fetchMockPostById(postId)
}

export async function togglePostLike(postId, { likedByCurrentUser, myLikeId } = {}) {
  try {
    if (likedByCurrentUser && myLikeId) {
      await fetchJson(`/likes/${myLikeId}`, { method: 'DELETE' })
    } else {
      await fetchJson('/likes', {
        method: 'POST',
        body: JSON.stringify({ postId: Number(postId) }),
      })
    }
    const post = await fetchJson(`/posts/${postId}`)
    return normalizePost(post)
  } catch (error) {
    console.warn('Falling back to mock like toggle because backend likes failed.', error)
    return toggleMockLike(postId)
  }
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
    userId: MOCK_FALLBACK_USER_ID,
    content: trimmedContent,
    sentiment,
    createdAt: new Date().toISOString(),
  }

  commentsStore = [...commentsStore, comment]
  return enrichComment(comment)
}

// Multipart upload — deliberately bypasses fetchJson, since a FormData body
// needs the browser to set its own multipart Content-Type (with boundary);
// setting it manually, as fetchJson does for JSON, would break the upload.
export async function uploadImages(files) {
  const formData = new FormData()
  for (const file of files) {
    formData.append('images', file)
  }

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    body: formData,
  })

  if (!response.ok) {
    let message = `Upload failed with ${response.status}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {
      // response body wasn't JSON — keep the generic message
    }
    throw new Error(message)
  }

  const { urls } = await response.json()
  return urls.map((url) => `${UPLOAD_ORIGIN}${url}`)
}

export async function createPost(data) {
  return fetchJson('/posts', { method: 'POST', body: JSON.stringify(data) })
}

export async function updatePost(id, data) {
  return fetchJson(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deletePost(id) {
  return fetchJson(`/posts/${id}`, { method: 'DELETE' })
}

export async function fetchUsers() {
  return fetchJson('/users')
}

export async function updateUser(id, data) {
  return fetchJson(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteUser(id) {
  return fetchJson(`/users/${id}`, { method: 'DELETE' })
}

export async function createUserAdmin(data) {
  return fetchJson('/users', { method: 'POST', body: JSON.stringify(data) })
}

export async function createTourStop(data) {
  return fetchJson('/campus-tour', { method: 'POST', body: JSON.stringify(data) })
}

export async function updateTourStop(id, data) {
  return fetchJson(`/campus-tour/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export async function deleteTourStop(id) {
  return fetchJson(`/campus-tour/${id}`, { method: 'DELETE' })
}

export async function loginRequest(email, password) {
  return fetchJson('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function signupRequest(name, email, password) {
  return fetchJson('/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export function getStats(posts) {
  return computeStats(posts)
}

export const postsApi = {
  fetchPosts,
  fetchPostById,
  fetchCampusTourStops,
  fetchTourStops,
  togglePostLike,
  addComment,
  getStats,
  loginRequest,
  signupRequest,
  setAuthToken,
  getAuthToken,
  createPost,
  updatePost,
  deletePost,
  fetchUsers,
  updateUser,
  deleteUser,
  createUserAdmin,
  createTourStop,
  updateTourStop,
  deleteTourStop,
  uploadImages,
}
