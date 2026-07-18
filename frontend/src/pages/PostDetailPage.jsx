import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostDetail } from '@/components/PostDetail'
import { EmptyState } from '@/components/EmptyState'
import { addComment, fetchPostById, togglePostLike } from '@/services/postsApi'

export function PostDetailPage() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAddingComment, setIsAddingComment] = useState(false)

  const loadPost = useCallback(async () => {
    setError('')

    try {
      const nextPost = await fetchPostById(postId)
      setPost(nextPost)
    } catch {
      setError('Unable to load this post right now. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [postId])

  useEffect(() => {
    setIsLoading(true)
    loadPost()
  }, [loadPost])

  async function handleToggleLike() {
    if (!post) return
    await togglePostLike(post.id, {
      likedByCurrentUser: post.likedByCurrentUser,
      myLikeId: post.myLikeId,
    })
    loadPost()
  }

  async function handleAddComment(postIdArg, content) {
    setIsAddingComment(true)

    try {
      await addComment(postIdArg, content)
      loadPost()
    } finally {
      setIsAddingComment(false)
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Loading post...
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600">
        {error}
      </div>
    )
  }

  if (!post) {
    return <EmptyState />
  }

  return (
    <PostDetail
      post={post}
      onToggleLike={handleToggleLike}
      onAddComment={handleAddComment}
      isAddingComment={isAddingComment}
    />
  )
}
