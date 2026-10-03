import { Heart, MapPin, MessageSquare, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PostImageCarousel } from '@/components/PostImageCarousel'
import { INSTITUTION } from '@/config/institution'

export function FeaturedPost({ post }) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-2 text-left">
        <TrendingUp className="h-4 w-4 text-[#1a2b5a]" />
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
          Featured
        </span>
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-md">
        <Link to={`/blog/${post.id}`} className="grid text-left md:grid-cols-2">
          <PostImageCarousel
            images={post.images}
            alt=""
            className="aspect-[16/10] md:aspect-auto md:min-h-[280px]"
            imageClassName="hover:scale-[1.02]"
          >
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-4 text-sm font-medium text-white">
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                {post.likeCount}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" />
                {post.commentCount}
              </span>
            </div>
          </PostImageCarousel>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            {/* Publisher letterhead: every post is published by the institute. */}
            <div className="mb-5 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-4">
                <img
                  src={INSTITUTION.logo}
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-full object-contain sm:h-24 sm:w-24"
                />
                <p className="min-w-0 text-base font-bold leading-snug text-slate-900 sm:text-lg">
                  {INSTITUTION.name}
                </p>
              </div>
              {/* One line across the full column; on narrow screens it ends in
                  an ellipsis and the full address is in the tooltip. */}
              <address
                title={INSTITUTION.address.join(', ')}
                className="mt-3 flex items-center gap-1.5 text-[13px] not-italic text-slate-500"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{INSTITUTION.address.join(', ')}</span>
              </address>
            </div>

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
        </Link>
      </Card>
    </section>
  )
}
