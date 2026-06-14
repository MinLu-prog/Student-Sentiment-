import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Search,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CAMPUS_AREAS } from '@/data/posts'
import { UNIVERSITY_NAME } from '@/data/mockDb'

export function HeroHeader({
  view,
  onViewChange,
  search,
  onSearchChange,
  stats,
  campus,
}) {
  const campusLabel =
    CAMPUS_AREAS.find((area) => area.value === campus)?.label ?? 'Main Campus'

  return (
    <section className="bg-[#1a2b5a] text-white">
      <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-base font-semibold leading-tight">{UNIVERSITY_NAME}</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-200/80">
              Campus Activities
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onViewChange('feed')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              view === 'feed'
                ? 'bg-white/15 text-white ring-1 ring-white/20'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Blog Feed
          </button>
          <button
            type="button"
            onClick={() => onViewChange('analysis')}
            className={`inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
              view === 'analysis'
                ? 'bg-white/15 text-white'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Comment Analysis
          </button>
        </div>
      </div>

      <div className="px-5 pb-8 pt-6 text-left sm:px-8 sm:pb-10 sm:pt-8">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200/70">
          <BookOpen className="h-3.5 w-3.5" />
          {UNIVERSITY_NAME} · {campusLabel}
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Campus Activities
        </h1>
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
          News, events, and stories from across the MIIT community — research,
          arts, sport, and everything in between.
        </p>

        <div className="mb-8 flex max-w-lg items-stretch divide-x divide-white/20 rounded-lg border border-white/10 bg-white/5">
          {[
            { value: stats.stories, label: 'Stories' },
            { value: stats.comments, label: 'Comments' },
            { value: stats.reads, label: 'Reads' },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 px-5 py-4 text-center sm:px-8">
              <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-200/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative max-w-3xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/60" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search posts, topics, tags..."
            className="h-12 rounded-xl pl-11 text-base"
            aria-label="Search posts"
          />
        </div>
      </div>
    </section>
  )
}
