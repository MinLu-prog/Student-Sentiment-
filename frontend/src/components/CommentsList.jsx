import { useState } from 'react'
import { Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { getInitials } from '@/lib/utils'
import { SENTIMENT_COLORS } from '@/config/sentimentColors'

function formatCommentDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function CommentsList({ comments, onAddComment, isSubmitting }) {
  const { user, isGuest } = useAuth()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const trimmedContent = content.trim()
    if (!trimmedContent) {
      setError('Write a comment before posting.')
      return
    }

    setError('')

    try {
      await onAddComment(trimmedContent)
      setContent('')
    } catch {
      setError('Unable to post your comment. Please try again.')
    }
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-[#1a2b5a]">Discussion</h2>
        <p className="mt-1 text-sm text-slate-500">
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </p>
      </div>

      {isGuest ? (
        <Card className="rounded-xl border-slate-200 bg-white p-4 text-center text-sm text-slate-600 shadow-sm">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-semibold text-[#1a2b5a] underline-offset-2 hover:underline"
          >
            Log in
          </button>{' '}
          to join the discussion.
        </Card>
      ) : (
        <Card className="rounded-xl border-slate-200 bg-white p-4 shadow-sm">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a2b5a] text-xs font-bold text-white">
              {getInitials(user?.name)}
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <label htmlFor="new-comment" className="sr-only">
                Add a comment
              </label>
              <textarea
                id="new-comment"
                value={content}
                onChange={(event) => {
                  setContent(event.target.value)
                  setError('')
                }}
                placeholder="What did you think?"
                rows={3}
                className="min-h-20 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#1a2b5a] focus:bg-white focus:ring-2 focus:ring-[#1a2b5a]/10"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Posting as {user?.name}
                </p>
                <Button
                  type="submit"
                  disabled={isSubmitting || !content.trim()}
                  className="rounded-full px-4"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
              {error && <p className="text-sm font-medium text-red-600">{error}</p>}
            </div>
          </form>
        </Card>
      )}

      {comments.length === 0 ? (
        <Card className="rounded-xl border-dashed border-slate-300 bg-white/70 p-6 text-sm text-slate-500">
          No one has commented yet.
        </Card>
      ) : null}

      {comments.map((comment) => (
        <Card key={comment.id} className="rounded-xl border-slate-200 p-4 text-left shadow-sm">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-[#1a2b5a]">
              {getInitials(comment.author?.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-[#1a2b5a]">
                  {comment.author?.name ?? 'Unknown User'}
                </p>
                <span className="text-xs text-slate-400">
                  {formatCommentDate(comment.createdAt)}
                </span>
                <span
                  aria-label={`Sentiment: ${comment.sentiment}`}
                  className={`h-2 w-2 rounded-full ${SENTIMENT_COLORS[comment.sentiment]?.dot ?? SENTIMENT_COLORS.neutral.dot}`}
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{comment.content}</p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  )
}
