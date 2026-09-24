import { CampusBackdrop } from '@/components/CampusBackdrop'
import { HeroContent } from '@/components/HeroContent'

// `topInset` is the height of the sticky nav bar. The section is pulled up
// underneath the bar by that amount and padded back down, so the glass nav
// sits on the campus photo while the hero content still starts below it.
export function HeroHeader({
  search,
  onSearchChange,
  stats,
  showContent = true,
  topInset = 0,
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#1a2b5a] text-white"
      style={{ marginTop: -topInset, paddingTop: topInset }}
    >
      <CampusBackdrop />

      {showContent && (
        <div className="relative">
          <HeroContent
            search={search}
            onSearchChange={onSearchChange}
            stats={stats}
          />
        </div>
      )}
    </section>
  )
}
