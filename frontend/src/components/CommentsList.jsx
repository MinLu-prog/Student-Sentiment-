import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const SENTIMENT_STYLES = {
  positive: 'bg-emerald-50 text-emerald-700',
  neutral: 'bg-amber-50 text-amber-700',
  negative: 'bg-red-50 text-red-600',
}

function formatCommentDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function CommentsList({ comments }) {
  if (comments.length === 0) {
    return (
      <Card className="rounded-2xl border-slate-200 p-6 text-sm text-slate-500">
        No comments yet. Be the first to share your thoughts.
      </Card>
    )
  }

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold text-[#1a2b5a]">Comments</h2>

      {comments.map((comment) => (
        <Card
          key={comment.id}
          className="rounded-xl border-slate-200 p-4 text-left shadow-sm"
        >
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[#1a2b5a]">
              {comment.author.name}
            </p>
            <span className="text-xs text-slate-400">{comment.author.role}</span>
            <Badge
              className={`rounded-full border-0 px-2 py-0 text-[10px] font-semibold capitalize ${SENTIMENT_STYLES[comment.sentiment]}`}
            >
              {comment.sentiment}
            </Badge>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">{comment.content}</p>
          <p className="mt-2 text-xs text-slate-400">
            {formatCommentDate(comment.createdAt)}
          </p>
        </Card>
      ))}
    </section>
  )
}
