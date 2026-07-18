import { useMemo, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { SENTIMENT_COLORS, SENTIMENT_ORDER } from '@/config/sentimentColors'

const WIDTH = 560
const HEIGHT = 220
const PADDING = { top: 16, right: 16, bottom: 8, left: 32 }
const GRID_VALUES = [0, 25, 50, 75, 100]

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function SentimentTrendChart({ points }) {
  const svgRef = useRef(null)
  const [hoverIndex, setHoverIndex] = useState(null)

  const innerWidth = WIDTH - PADDING.left - PADDING.right
  const innerHeight = HEIGHT - PADDING.top - PADDING.bottom

  function xForIndex(index) {
    return points.length <= 1
      ? PADDING.left + innerWidth / 2
      : PADDING.left + (index / (points.length - 1)) * innerWidth
  }

  function yForValue(value) {
    return PADDING.top + innerHeight - (value / 100) * innerHeight
  }

  const lines = useMemo(
    () =>
      SENTIMENT_ORDER.map((key) => ({
        key,
        d: points
          .map((point, index) => `${index === 0 ? 'M' : 'L'} ${xForIndex(index)} ${yForValue(point[key])}`)
          .join(' '),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [points],
  )

  function handleMove(event) {
    if (points.length === 0 || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * WIDTH
    const ratio = Math.min(Math.max((x - PADDING.left) / innerWidth, 0), 1)
    const index = points.length <= 1 ? 0 : Math.round(ratio * (points.length - 1))
    setHoverIndex(index)
  }

  const hovered = hoverIndex !== null ? points[hoverIndex] : null

  return (
    <Card className="rounded-2xl border-slate-200 p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-bold text-[#1a2b5a]">Sentiment Over Time</h2>
      <p className="mb-4 text-sm text-slate-500">Share of each sentiment, story by story.</p>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        {SENTIMENT_ORDER.map((key) => (
          <span key={key} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className={`h-0.5 w-4 rounded-full ${SENTIMENT_COLORS[key].bar}`} />
            {SENTIMENT_COLORS[key].label}
          </span>
        ))}
      </div>

      {points.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500">Not enough data yet.</p>
      ) : (
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full touch-none"
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {GRID_VALUES.map((value) => (
              <line
                key={value}
                x1={PADDING.left}
                x2={WIDTH - PADDING.right}
                y1={yForValue(value)}
                y2={yForValue(value)}
                stroke="#e2e8f0"
                strokeWidth={1}
              />
            ))}
            {GRID_VALUES.map((value) => (
              <text
                key={value}
                x={PADDING.left - 8}
                y={yForValue(value) + 3}
                textAnchor="end"
                fontSize={10}
                fill="#94a3b8"
              >
                {value}%
              </text>
            ))}

            {lines.map(({ key, d }) => (
              <path
                key={key}
                d={d}
                fill="none"
                stroke={SENTIMENT_COLORS[key].hex}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {points.map((point, index) =>
              SENTIMENT_ORDER.map((key) => (
                <circle
                  key={`${index}-${key}`}
                  cx={xForIndex(index)}
                  cy={yForValue(point[key])}
                  r={hoverIndex === index ? 5 : 4}
                  fill={SENTIMENT_COLORS[key].hex}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              )),
            )}

            {hoverIndex !== null && (
              <line
                x1={xForIndex(hoverIndex)}
                x2={xForIndex(hoverIndex)}
                y1={PADDING.top}
                y2={HEIGHT - PADDING.bottom}
                stroke="#94a3b8"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            )}
          </svg>

          {hovered && (
            <div
              className="pointer-events-none absolute top-2 z-10 max-w-[180px] -translate-x-1/2 rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg"
              style={{ left: `${(xForIndex(hoverIndex) / WIDTH) * 100}%` }}
            >
              <p className="mb-1 truncate font-semibold">{hovered.title}</p>
              <p className="mb-1 text-slate-300">{formatDate(hovered.date)}</p>
              {SENTIMENT_ORDER.map((key) => (
                <p key={key} className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${SENTIMENT_COLORS[key].bar}`} />
                  {SENTIMENT_COLORS[key].label}: {hovered[key]}%
                </p>
              ))}
            </div>
          )}

          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>{formatDate(points[0].date)}</span>
            {points.length > 1 && <span>{formatDate(points[points.length - 1].date)}</span>}
          </div>
        </div>
      )}
    </Card>
  )
}
