import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function PostCard({ post, onSelect }) {
  return (
    <Card className="overflow-hidden border-slate-200 transition-shadow hover:shadow-md">
      <button type="button" onClick={() => onSelect(post)} className="w-full text-left">
        <div className="aspect-[16/9] overflow-hidden bg-slate-100">
          <img src={post.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge className="rounded-md border-0 bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-[#1a2b5a] hover:bg-blue-100">
              {post.category}
            </Badge>
            <span className="text-xs text-slate-500">{post.date}</span>
          </div>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#1a2b5a]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>
        </div>
      </button>
    </Card>
  )
}
