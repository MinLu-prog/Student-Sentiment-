import { useState } from 'react'
import { BookOpen } from 'lucide-react'
import { UnitIcon } from '@/components/faculties/UnitIcon'
import { UNIT_TYPES } from '@/data/faculties'

const PANEL_HIDDEN =
  'pointer-events-none translate-y-3 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-has-[:focus-visible]:pointer-events-auto group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100'
const PANEL_SHOWN = 'pointer-events-auto translate-y-0 opacity-100'

/**
 * One faculty or department. The card's id is the unit id, so
 * /faculties-and-staff#fcs scrolls straight to it.
 *
 * Its courses slide in over the card on hover or keyboard focus. Touch
 * screens can't hover (Tailwind 4 only applies `hover:` where hover exists),
 * so there the "View courses" button toggles the panel and tapping the panel
 * closes it. Both layers share one grid cell, so the card is always tall
 * enough for the panel.
 */
export function AcademicUnitCard({ unit }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = `${unit.id}-courses`

  return (
    <article
      id={unit.id}
      className="group relative grid h-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_18px_40px_rgba(26,43,90,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="col-start-1 row-start-1 flex flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1a2b5a]/5 text-[#1a2b5a]">
            <UnitIcon unitId={unit.id} className="h-6 w-6" />
          </span>
          <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {unit.code}
          </span>
        </div>

        <h3 className="mt-4 text-base font-bold leading-snug text-[#1a2b5a]">{unit.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
          {UNIT_TYPES[unit.type]?.label ?? unit.type}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{unit.tagline}</p>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          onBlur={() => setIsOpen(false)}
          className="mt-auto inline-flex items-center gap-1.5 self-start rounded-full pt-5 text-xs font-semibold text-teal-700 focus:outline-none"
        >
          <BookOpen className="h-3.5 w-3.5" />
          View courses
        </button>
      </div>

      <div
        id={panelId}
        onClick={() => setIsOpen(false)}
        className={`col-start-1 row-start-1 flex flex-col bg-[#1a2b5a] p-6 text-white transition duration-300 motion-reduce:transition-none ${
          isOpen ? PANEL_SHOWN : PANEL_HIDDEN
        }`}
      >
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">
          <UnitIcon unitId={unit.id} className="h-3.5 w-3.5" />
          {unit.code} courses
        </p>
        <ul className="mt-3 space-y-1.5">
          {unit.courses.map((course) => (
            <li key={course} className="flex items-start gap-2 text-[13px] leading-5 text-blue-50">
              <span aria-hidden className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300" />
              {course}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
