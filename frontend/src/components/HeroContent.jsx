import { BookOpen, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CAMPUS_AREAS } from '@/data/posts'
import { UNIVERSITY_NAME } from '@/data/mockDb'

export function HeroContent({ search, onSearchChange, stats, campus }) {
  const campusLabel =
    CAMPUS_AREAS.find((area) => area.value === campus)?.label ?? 'Main Campus'

  return (
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
  )
}
