import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/**
 * Photo gallery for a campus tour stop: a responsive thumbnail grid that
 * opens a lightbox. Accepts an array of { src, caption }.
 */
export function CampusGallery({ images = [], className = '' }) {
  const [openIndex, setOpenIndex] = useState(null)
  const isOpen = openIndex !== null

  const count = images.length

  useEffect(() => {
    if (!isOpen) return undefined
    function onKey(event) {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % count)
      if (event.key === 'ArrowLeft') setOpenIndex((i) => (i - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, count])

  if (count === 0) return null

  const active = isOpen ? images[openIndex] : null

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200"
          >
            <img
              src={img.src}
              alt={img.caption ?? ''}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active?.caption ?? 'Campus photo'}
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/85 p-4"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {count > 1 && (
            <button
              type="button"
              aria-label="Previous photo"
              onClick={(event) => {
                event.stopPropagation()
                setOpenIndex((i) => (i - 1 + count) % count)
              }}
              className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <figure onClick={(event) => event.stopPropagation()} className="max-w-4xl">
            <img
              src={active.src}
              alt={active.caption ?? ''}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            {active.caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {active.caption}
                {count > 1 && (
                  <span className="ml-2 text-white/50">
                    ({openIndex + 1}/{count})
                  </span>
                )}
              </figcaption>
            )}
          </figure>

          {count > 1 && (
            <button
              type="button"
              aria-label="Next photo"
              onClick={(event) => {
                event.stopPropagation()
                setOpenIndex((i) => (i + 1) % count)
              }}
              className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
