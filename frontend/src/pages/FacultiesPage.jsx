import { BackLink } from '@/components/faculties/BackLink'
import { FacultiesHero } from '@/components/faculties/FacultiesHero'
import { LeadershipChart } from '@/components/faculties/LeadershipChart'
import { AcademicUnitCard } from '@/components/faculties/AcademicUnitCard'
import { FacultyIntro } from '@/components/faculties/FacultyIntro'
import {
  ACADEMIC_UNITS,
  FACULTY_INTRO,
  PRO_RECTORS,
  RECTOR,
  UNIT_TYPES,
} from '@/data/faculties'

const FACULTIES = ACADEMIC_UNITS.filter((unit) => unit.type === 'faculty')
const DEPARTMENTS = ACADEMIC_UNITS.filter((unit) => unit.type === 'department')

// Section ids are deep-link targets for the hero jump links and the footer
// site map (config/siteNav.js).
const SECTIONS = [
  { id: 'leadership', label: 'Leadership' },
  { id: 'faculties', label: UNIT_TYPES.faculty.plural, count: FACULTIES.length },
  { id: 'departments', label: UNIT_TYPES.department.plural, count: DEPARTMENTS.length },
  { id: 'our-faculty', label: 'Our Faculty' },
]

function SectionHeading({ title, description }) {
  return (
    <div className="mb-4 text-left">
      <h2 className="text-2xl font-bold text-[#1a2b5a]">{title}</h2>
      {description && <p className="mt-1 text-slate-600">{description}</p>}
    </div>
  )
}

// Full-width rows on desktop: 4 faculties → 4 columns, 3 departments → 3.
const LG_COLUMNS = { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3' }

function UnitGrid({ units }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${LG_COLUMNS[units.length] ?? 'lg:grid-cols-4'}`}>
      {units.map((unit) => (
        <li key={unit.id}>
          <AcademicUnitCard unit={unit} />
        </li>
      ))}
    </ul>
  )
}

export function FacultiesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="space-y-6">
        <BackLink to="/blog">Back to feed</BackLink>
        <FacultiesHero sections={SECTIONS} />
      </div>

      <section id="leadership" aria-label="Leadership">
        <SectionHeading
          title="Leadership"
          description="The Rector leads the institute, supported by Pro-Rectors for administration and academics."
        />
        <LeadershipChart rector={RECTOR} proRectors={PRO_RECTORS} />
      </section>

      <section id="faculties" aria-label={UNIT_TYPES.faculty.plural}>
        <SectionHeading
          title={UNIT_TYPES.faculty.plural}
          description={`MIIT's ${FACULTIES.length} academic faculties. Hover or tap a card to see its courses.`}
        />
        <UnitGrid units={FACULTIES} />
      </section>

      <section id="departments" aria-label={UNIT_TYPES.department.plural}>
        <SectionHeading
          title={UNIT_TYPES.department.plural}
          description="Language, natural science, and IT support and maintenance. Hover or tap a card to see its courses."
        />
        <UnitGrid units={DEPARTMENTS} />
      </section>

      <section id="our-faculty" aria-label="Our Faculty">
        <SectionHeading title="Our Faculty" />
        <FacultyIntro paragraphs={FACULTY_INTRO} />
      </section>
    </div>
  )
}
