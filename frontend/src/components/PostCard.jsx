import { Heart, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PostImageCarousel } from '@/components/PostImageCarousel'

export function PostCard({ post }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-slate-200 transition-shadow hover:shadow-md">
      <Link to={`/blog/${post.id}`} className="flex h-full flex-col text-left">
        <PostImageCarousel
          images={post.images}
          alt=""
          className="aspect-[16/9] shrink-0"
          imageClassName="group-hover:scale-105"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="pointer-events-none absolute bottom-2 left-3 flex items-center gap-3 text-xs font-medium text-white">
            <span className="inline-flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              {post.likeCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              {post.commentCount}
            </span>
          </div>
        </PostImageCarousel>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge className="rounded-md border-0 bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-[#1a2b5a] hover:bg-blue-100">
              {post.category}
            </Badge>
            <span className="text-xs text-slate-500">{post.date}</span>
          </div>
          <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-[#1a2b5a]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-slate-600">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </Card>
  )
}
