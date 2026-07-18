import { Heart, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EngagementBar({
  post,
  onToggleLike,
  commentsOpen,
  onToggleComments,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-5">
      <Button
        type="button"
        variant="ghost"
        onClick={() => onToggleLike(post.id)}
        className={`h-auto rounded-full px-3 py-1.5 text-sm font-medium ${
          post.likedByCurrentUser
            ? 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600'
            : 'text-slate-500 hover:bg-red-50 hover:text-red-500'
        }`}
      >
        <Heart
          className={`h-4 w-4 ${post.likedByCurrentUser ? 'fill-red-500 text-red-500' : ''}`}
        />
        {post.likeCount} Like{post.likeCount !== 1 ? 's' : ''}
      </Button>

      <Button
        type="button"
        variant="ghost"
        onClick={onToggleComments}
        aria-expanded={commentsOpen}
        className={`h-auto rounded-full px-3 py-1.5 text-sm font-medium ${
          commentsOpen
            ? 'bg-blue-50 text-[#1a2b5a] hover:bg-blue-100'
            : 'text-slate-500 hover:bg-blue-50 hover:text-[#1a2b5a]'
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        <span>Comments</span>
        <span className="rounded-full bg-white/80 px-1.5 text-xs">
          {post.commentCount}
        </span>
      </Button>
    </div>
  )
}
