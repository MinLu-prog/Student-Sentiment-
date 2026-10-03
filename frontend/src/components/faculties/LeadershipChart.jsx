import { Briefcase, BookOpenCheck, Crown, GraduationCap } from 'lucide-react'
import { Card } from '@/components/ui/card'

const PORTFOLIO_ICONS = { Admin: Briefcase, Academic: BookOpenCheck }

// Connector lines are decorative; the reporting structure is also conveyed by
// the nested list, so screen readers get it without the drawing.
const LINE = 'bg-slate-300'

function RectorNode({ rector }) {
  return (
    <div className="flex w-full max-w-xs flex-col items-center rounded-2xl bg-[#1a2b5a] px-6 py-6 text-center text-white shadow-[0_10px_30px_rgba(26,43,90,0.25)]">
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30">
        <GraduationCap className="h-7 w-7" />
      </div>
      <p className="text-lg font-bold leading-tight">{rector.name}</p>
      <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
        <Crown className="h-3.5 w-3.5" />
        {rector.title}
      </p>
    </div>
  )
}

function ProRectorNode({ proRector }) {
  const Icon = PORTFOLIO_ICONS[proRector.portfolio] ?? Briefcase

  return (
    <div className="flex h-full items-center gap-4 rounded-2xl border border-teal-200 bg-teal-50 px-5 py-4 text-left">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-base font-bold text-[#1a2b5a]">{proRector.title}</span>
        <span className="block text-sm font-medium text-teal-700">({proRector.portfolio})</span>
      </span>
    </div>
  )
}

export function LeadershipChart({ rector, proRectors }) {
  return (
    <Card className="rounded-2xl border-slate-200 p-6 sm:p-8">
      <ol aria-label="Institute leadership" className="flex flex-col items-center">
        <li className="flex w-full flex-col items-center">
          <RectorNode rector={rector} />

          <div aria-hidden className={`h-8 w-px ${LINE}`} />

          <ol aria-label={`Reporting to the ${rector.title}`} className="relative grid w-full max-w-2xl gap-4 sm:grid-cols-2 sm:gap-8">
            {/* Horizontal bar joining the two column centres (desktop only):
                each centre sits a quarter of the 2rem gap inside the 25% mark. */}
            <div aria-hidden className={`absolute left-[calc(25%-0.5rem)] right-[calc(25%-0.5rem)] top-0 hidden h-px sm:block ${LINE}`} />
            {proRectors.map((proRector) => (
              <li key={proRector.id} className="relative sm:pt-8">
                <div aria-hidden className={`absolute left-1/2 top-0 hidden h-8 w-px sm:block ${LINE}`} />
                <ProRectorNode proRector={proRector} />
              </li>
            ))}
          </ol>
        </li>
      </ol>
    </Card>
  )
}
