import { Frown, Meh, Smile } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SENTIMENT_COLORS, SENTIMENT_ORDER } from '@/config/sentimentColors'

const ICONS = { positive: Smile, neutral: Meh, negative: Frown }

export function SentimentSnapshot({ sentiment }) {
  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200 p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-[#1a2b5a]">
        Comment Sentiment Snapshot
      </h2>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {SENTIMENT_ORDER.map((key) => {
          const Icon = ICONS[key]
          const config = SENTIMENT_COLORS[key]
          const data = sentiment[key]

          return (
            <div
              key={key}
              className={`rounded-xl ${config.bg} px-4 py-5 text-center`}
            >
              <Icon className={`mx-auto mb-2 h-6 w-6 ${config.text}`} />
              <p className={`text-2xl font-bold ${config.text}`}>{data.percent}%</p>
              <p className={`text-sm font-medium ${config.text}`}>{config.label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {data.count} comment{data.count !== 1 ? 's' : ''}
              </p>
            </div>
          )
        })}
      </div>

      <div className="flex h-3 overflow-hidden rounded-full">
        {SENTIMENT_ORDER.map((key, index) => (
          <div
            key={key}
            className={`${SENTIMENT_COLORS[key].bar} transition-all`}
            style={{
              width: `${sentiment[key].percent}%`,
              borderRight: index < SENTIMENT_ORDER.length - 1 ? '2px solid white' : undefined,
            }}
          />
        ))}
      </div>
    </Card>
  )
}
