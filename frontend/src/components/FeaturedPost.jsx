import { TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function FeaturedPost({ post, onSelect }) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-2 text-left">
        <TrendingUp className="h-4 w-4 text-[#1a2b5a]" />
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
          Featured
        </span>
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-md">
        <button
          type="button"
          onClick={() => onSelect(post)}
          className="grid w-full text-left md:grid-cols-2"
        >
          <div className="aspect-[16/10] overflow-hidden bg-slate-100 md:aspect-auto md:min-h-[280px]">
            <img
              src={post.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-3">
              <Badge className="rounded-md border-0 bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-[#1a2b5a] hover:bg-blue-100">
                {post.category}
              </Badge>
              <span className="text-sm text-slate-500">{post.date}</span>
            </div>
            <h2 className="text-xl font-bold leading-snug text-[#1a2b5a] sm:text-2xl">
              {post.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
              {post.excerpt}
            </p>
          </div>
        </button>
      </Card>
    </section>
  )
}
