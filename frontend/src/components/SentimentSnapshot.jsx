import { Frown, Meh, Smile } from 'lucide-react'
import { Card } from '@/components/ui/card'

const SENTIMENT_CONFIG = [
  {
    key: 'positive',
    label: 'Positive',
    icon: Smile,
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    bar: 'bg-emerald-500',
  },
  {
    key: 'neutral',
    label: 'Neutral',
    icon: Meh,
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    bar: 'bg-amber-400',
  },
  {
    key: 'negative',
    label: 'Negative',
    icon: Frown,
    bg: 'bg-red-50',
    text: 'text-red-500',
    bar: 'bg-red-500',
  },
]

export function SentimentSnapshot({ sentiment }) {
  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200 p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-[#1a2b5a]">
        Comment Sentiment Snapshot
      </h2>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {SENTIMENT_CONFIG.map(({ key, label, icon: Icon, bg, text }) => {
          const data = sentiment[key]

          return (
            <div
              key={key}
              className={`rounded-xl ${bg} px-4 py-5 text-center`}
            >
              <Icon className={`mx-auto mb-2 h-6 w-6 ${text}`} />
              <p className={`text-2xl font-bold ${text}`}>{data.percent}%</p>
              <p className={`text-sm font-medium ${text}`}>{label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {data.count} comment{data.count !== 1 ? 's' : ''}
              </p>
            </div>
          )
        })}
      </div>

      <div className="flex h-3 overflow-hidden rounded-full">
        {SENTIMENT_CONFIG.map(({ key, bar }) => (
          <div
            key={key}
            className={`${bar} transition-all`}
            style={{ width: `${sentiment[key].percent}%` }}
          />
        ))}
      </div>
    </Card>
  )
}
