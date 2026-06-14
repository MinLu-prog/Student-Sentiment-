import { POSTS, getStats as computeStats } from '@/data/posts'
import {
  CAMPUS_TOUR_STOPS,
  COMMENTS,
  LIKES,
  computeSentiment,
  getUserById,
} from '@/data/mockDb'

const CURRENT_USER_ID = 'user-1'

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

export function fetchPosts({ campus } = {}) {
  const filtered = campus ? POSTS.filter((post) => post.campus === campus) : POSTS
  return filtered.map((post) => enrichPost(post, likesStore, commentsStore))
}

export function fetchPostById(postId) {
  const post = POSTS.find((item) => item.id === Number(postId))
  if (!post) return null
  return enrichPost(post, likesStore, commentsStore)
}

export function fetchCampusTourStops(campus) {
  return CAMPUS_TOUR_STOPS.filter((stop) => stop.campus === campus)
}

export function togglePostLike(postId) {
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

  return fetchPostById(postId)
}

export function addComment(postId, content, sentiment = 'neutral') {
  const comment = {
    id: `comment-${Date.now()}`,
    postId,
    userId: CURRENT_USER_ID,
    content,
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
