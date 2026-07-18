import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { SENTIMENT_COLORS, SENTIMENT_ORDER } from '@/config/sentimentColors'

export function CategoryBreakdownChart({ rows }) {
  const [hovered, setHovered] = useState(null)
  const maxTotal = Math.max(...rows.map((row) => row.total), 1)

  return (
    <Card className="rounded-2xl border-slate-200 p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-bold text-[#1a2b5a]">Sentiment by Topic</h2>
      <p className="mb-4 text-sm text-slate-500">Which categories are landing best with readers.</p>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        {SENTIMENT_ORDER.map((key) => (
          <span key={key} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className={`h-2.5 w-2.5 rounded-full ${SENTIMENT_COLORS[key].bar}`} />
            {SENTIMENT_COLORS[key].label}
          </span>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.category}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{row.category}</span>
                <span className="text-slate-400">
                  {row.total} comment{row.total !== 1 ? 's' : ''}
                </span>
              </div>
              <div
                className="flex h-6 overflow-hidden rounded-md bg-slate-100"
                style={{ width: `${Math.max((row.total / maxTotal) * 100, 8)}%` }}
              >
                {SENTIMENT_ORDER.map((key, index) => {
                  const value = row[key]
                  if (value === 0) return null
                  const isHovered = hovered?.category === row.category && hovered?.key === key

                  return (
                    <div
                      key={key}
                      onMouseEnter={() => setHovered({ category: row.category, key })}
                      onMouseLeave={() => setHovered(null)}
                      className={`${SENTIMENT_COLORS[key].bar} relative h-full transition-opacity`}
                      style={{
                        width: `${(value / row.total) * 100}%`,
                        opacity: hovered && !isHovered ? 0.55 : 1,
                        borderRight: index < SENTIMENT_ORDER.length - 1 ? '2px solid white' : undefined,
                      }}
                    >
                      {isHovered && (
                        <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg">
                          {SENTIMENT_COLORS[key].label}: {value}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
