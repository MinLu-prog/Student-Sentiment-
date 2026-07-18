import { HeroContent } from '@/components/HeroContent'
import { HeroTopbar } from '@/components/HeroTopbar'

export function HeroHeader({
  search,
  onSearchChange,
  stats,
  campus,
  showContent = true,
}) {
  return (
    <section
      className="bg-[#1a2b5a] bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(26, 43, 90, 0.96) 0%, rgba(26, 43, 90, 0.84) 48%, rgba(26, 43, 90, 0.58) 100%), linear-gradient(180deg, rgba(10, 18, 42, 0.1) 0%, rgba(10, 18, 42, 0.72) 100%), url('/campus/main2.jpg')",
      }}
    >
      <HeroTopbar />
      {showContent && (
        <HeroContent
          search={search}
          onSearchChange={onSearchChange}
          stats={stats}
          campus={campus}
        />
      )}
    </section>
  )
}
