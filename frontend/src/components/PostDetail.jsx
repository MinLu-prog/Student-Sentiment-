import { useState } from 'react'
import { ArrowLeft, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SentimentSnapshot } from '@/components/SentimentSnapshot'
import { EngagementBar } from '@/components/EngagementBar'
import { CommentsList } from '@/components/CommentsList'

export function PostDetail({
  post,
  onBack,
  onToggleLike,
  onAddComment,
  isAddingComment,
}) {
  const [commentsOpen, setCommentsOpen] = useState(false)

  return (
    <article className="mx-auto max-w-3xl text-left">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a2b5a] shadow-sm transition hover:border-[#1a2b5a]/30 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#1a2b5a]/25"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b5a] text-white">
          <ArrowLeft className="h-3.5 w-3.5" />
        </span>
        Back to feed
      </button>

      <div className="mb-6 overflow-hidden rounded-xl">
        <img src={post.image} alt="" className="aspect-[16/9] w-full object-cover" />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <Badge className="rounded-md border-0 bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-[#1a2b5a] hover:bg-blue-100">
          {post.category}
        </Badge>
        <span className="text-sm text-slate-500">{post.date}</span>
      </div>

      <h1 className="mb-4 text-2xl font-bold leading-tight text-[#1a2b5a] sm:text-3xl">
        {post.title}
      </h1>

      <p className="mb-6 text-base leading-relaxed text-slate-700">{post.body}</p>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Tag className="h-4 w-4 text-slate-400" aria-hidden="true" />
        {post.tags.map((tag) => (
          <Badge
            key={tag}
            variant="neutral"
            className="rounded-full border-0 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <EngagementBar
        post={post}
        onToggleLike={onToggleLike}
        commentsOpen={commentsOpen}
        onToggleComments={() => setCommentsOpen((isOpen) => !isOpen)}
      />

      <div className="mb-8 mt-8">
        <SentimentSnapshot sentiment={post.sentiment} />
      </div>

      {commentsOpen && (
        <CommentsList
          comments={post.comments}
          onAddComment={(content) => onAddComment(post.id, content)}
          isSubmitting={isAddingComment}
        />
      )}
    </article>
  )
}
