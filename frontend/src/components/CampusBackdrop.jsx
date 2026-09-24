import { HERO_IMAGE } from '@/config/heroMedia'

// Campus photo with the MIIT blue wash, shared by the hero and the footer so
// their glass surfaces get the same treatment. Place inside a `relative
// isolate` container; it fills the container behind the content.
export function CampusBackdrop({ image = HERO_IMAGE, position = 'center' }) {
  return (
    <>
      {/* Campus photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${image}')`, backgroundPosition: position }}
      />

      {/* MIIT soft-blue wash — tints the photo toward the brand navy on the
          text side while letting the building stay visible on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(112deg,rgba(12,24,56,0.90)_0%,rgba(26,43,90,0.74)_34%,rgba(45,80,152,0.46)_62%,rgba(86,140,226,0.26)_100%)]"
      />

      {/* Soft blue glow, plus top and bottom scrims that keep the nav row and
          the search field legible against the bright sky and concrete. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(75%_55%_at_88%_8%,rgba(140,196,255,0.30)_0%,rgba(140,196,255,0)_60%),linear-gradient(180deg,rgba(9,18,42,0.45)_0%,rgba(9,18,42,0)_26%,rgba(9,18,42,0)_58%,rgba(9,18,42,0.62)_100%)]"
      />
    </>
  )
}
