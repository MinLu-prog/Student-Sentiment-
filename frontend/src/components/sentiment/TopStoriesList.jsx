import { Link } from 'react-router-dom'
import { Heart, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SENTIMENT_COLORS, SENTIMENT_ORDER } from '@/config/sentimentColors'

export function TopStoriesList({ posts }) {
  return (
    <Card className="rounded-2xl border-slate-200 p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-bold text-[#1a2b5a]">Most Talked About</h2>
      <p className="mb-5 text-sm text-slate-500">The stories generating the most discussion.</p>

      {posts.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">No stories yet.</p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post, index) => (
            <li key={post.id}>
              <Link
                to={`/blog/${post.id}`}
                className="flex items-center gap-4 rounded-xl border border-slate-100 p-3 transition hover:border-[#1a2b5a]/20 hover:bg-slate-50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a2b5a] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1a2b5a]">{post.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {post.commentCount}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {post.likeCount}
                    </span>
                  </div>
                </div>
                <div className="flex h-2 w-24 shrink-0 overflow-hidden rounded-full bg-slate-100">
                  {SENTIMENT_ORDER.map((key) =>
                    post.sentiment[key].percent > 0 ? (
                      <div
                        key={key}
                        className={SENTIMENT_COLORS[key].bar}
                        style={{ width: `${post.sentiment[key].percent}%` }}
                      />
                    ) : null,
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
