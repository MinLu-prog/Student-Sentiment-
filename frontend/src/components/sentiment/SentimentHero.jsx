import { MessageSquareText } from 'lucide-react'
import { SENTIMENT_COLORS, SENTIMENT_ORDER } from '@/config/sentimentColors'
import { UNIVERSITY_NAME } from '@/data/mockDb'

export function SentimentHero({ overall, storyCount }) {
  const leading =
    overall.total > 0
      ? SENTIMENT_ORDER.reduce(
          (best, key) => (overall[key].percent > overall[best].percent ? key : best),
          'positive',
        )
      : null

  return (
    <section
      className="overflow-hidden rounded-2xl bg-[#1a2b5a] bg-cover bg-center text-white shadow-sm"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(26, 43, 90, 0.96) 0%, rgba(26, 43, 90, 0.88) 55%, rgba(26, 43, 90, 0.74) 100%), linear-gradient(180deg, rgba(10, 18, 42, 0.15) 0%, rgba(10, 18, 42, 0.85) 100%), url('/campus/topviewjpg.jpg')",
      }}
    >
      <div className="px-6 py-10 sm:px-10 sm:py-14">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200/80">
          <MessageSquareText className="h-3.5 w-3.5" />
          Comment Analysis
        </div>
        <h1 className="mb-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          How {UNIVERSITY_NAME} Is Talking About Campus Life
        </h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
          A real read on student sentiment across {storyCount} {storyCount === 1 ? 'story' : 'stories'} and{' '}
          {overall.total} {overall.total === 1 ? 'comment' : 'comments'} — built for anyone sizing up what campus
          is really like.
        </p>

        {overall.total > 0 ? (
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
            <div>
              <p className="text-5xl font-bold tracking-tight sm:text-6xl">{overall[leading].percent}%</p>
              <p className="mt-1 text-sm font-medium text-blue-100/80">
                {SENTIMENT_COLORS[leading].label.toLowerCase()} overall
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:max-w-md">
              {SENTIMENT_ORDER.map((key) => (
                <div
                  key={key}
                  className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-center backdrop-blur-sm"
                >
                  <p className="text-xl font-bold">{overall[key].percent}%</p>
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-blue-100/70">
                    {SENTIMENT_COLORS[key].label}
                  </p>
                  <p className="text-[11px] text-blue-200/60">{overall[key].count}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-blue-100/70">
            No comments yet — check back once the conversation gets going.
          </p>
        )}
      </div>
    </section>
  )
}
