import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import { HERO_IMAGE } from '@/config/heroMedia'
import { UNIVERSITY_NAME } from '@/data/mockDb'

/**
 * Page hero plus the in-page jump links. `sections` is a list of
 * `{ id, label, count? }`; each link targets `#<id>`, which ScrollManager
 * scrolls to just below the sticky nav.
 */
export function FacultiesHero({ sections }) {
  return (
    <section
      className="overflow-hidden rounded-2xl bg-[#1a2b5a] bg-cover bg-center text-white shadow-sm"
      style={{
        backgroundImage:
          `linear-gradient(90deg, rgba(26, 43, 90, 0.96) 0%, rgba(26, 43, 90, 0.88) 55%, rgba(26, 43, 90, 0.74) 100%), linear-gradient(180deg, rgba(10, 18, 42, 0.15) 0%, rgba(10, 18, 42, 0.85) 100%), url('${HERO_IMAGE}')`,
      }}
    >
      <div className="px-6 py-10 sm:px-10 sm:py-14">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200/80">
          <Users className="h-3.5 w-3.5" />
          Faculties &amp; Staff
        </div>
        <h1 className="mb-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          The People Behind {UNIVERSITY_NAME}
        </h1>
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
          Meet the leadership, faculties, and departments that run teaching and research at the
          Myanmar Institute of Information Technology.
        </p>

        <nav aria-label="On this page" className="flex flex-wrap items-center gap-2">
          {sections.map((section) => (
            <Link
              key={section.id}
              to={{ hash: section.id }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {section.label}
              {section.count != null && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold">
                  {section.count}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
