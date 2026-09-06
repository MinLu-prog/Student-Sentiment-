import { BookOpen, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { UNIVERSITY_NAME } from '@/data/mockDb'

// Frosted-glass surface shared by the hero panels: a translucent MIIT-blue
// pane, a bright hairline edge, and a soft drop shadow to lift it off the
// campus photo behind it.
const GLASS =
  'border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(9,20,50,0.37)] backdrop-blur-xl'

export function HeroContent({ search, onSearchChange, stats }) {
  return (
    <div className="px-5 pb-8 pt-6 text-left sm:px-8 sm:pb-10 sm:pt-8">
      <div
        className={`mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-50 ${GLASS}`}
      >
        <BookOpen className="h-3.5 w-3.5 text-sky-200" />
        {UNIVERSITY_NAME}
      </div>

      <h1 className="mb-4 text-4xl font-bold tracking-tight drop-shadow-[0_2px_14px_rgba(8,17,40,0.6)] sm:text-5xl">
        Campus Activities
      </h1>
      <p className="mb-8 max-w-2xl text-base leading-relaxed text-blue-50/90 drop-shadow-[0_1px_8px_rgba(8,17,40,0.5)] sm:text-lg">
        News, events, and stories from across the MIIT community — research,
        arts, sport, and everything in between.
      </p>

      <div
        className={`mb-8 flex max-w-lg items-stretch divide-x divide-white/15 overflow-hidden rounded-2xl ${GLASS}`}
      >
        {[
          { value: stats.stories, label: 'Stories' },
          { value: stats.comments, label: 'Comments' },
          { value: stats.reads, label: 'Reads' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex-1 px-5 py-4 text-center transition-colors hover:bg-white/10 sm:px-8"
          >
            <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-100/80">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="relative max-w-3xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-sky-200/80" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search posts, topics, tags..."
          className={`h-12 rounded-xl pl-11 text-base text-white placeholder:text-blue-100/70 focus-visible:ring-sky-300/60 ${GLASS}`}
          aria-label="Search posts"
        />
      </div>
    </div>
  )
}
