import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * In-place hero image carousel for a post: shows one image at a time with
 * prev/next arrows and dot indicators. Unlike CampusGallery's thumbnail
 * grid + lightbox, this cycles images directly where the post is shown
 * (card, featured, detail), so arrow clicks must not bubble up to a
 * wrapping "open post" click handler.
 */
export function PostImageCarousel({
  images = [],
  alt = '',
  className = '',
  imageClassName = '',
  children,
}) {
  const [index, setIndex] = useState(0)
  const count = images.length

  if (count === 0) {
    return <div className={`bg-slate-100 ${className}`} />
  }

  function goPrev(event) {
    event.stopPropagation()
    setIndex((current) => (current - 1 + count) % count)
  }

  function goNext(event) {
    event.stopPropagation()
    setIndex((current) => (current + 1) % count)
  }

  return (
    <div className={`group relative overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={images[index]}
        alt={alt}
        className={`h-full w-full object-cover transition-transform duration-300 ${imageClassName}`}
      />

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={goPrev}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={goNext}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity hover:bg-black/60 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((src, dotIndex) => (
              <span
                key={src + dotIndex}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  dotIndex === index ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white">
            {index + 1}/{count}
          </span>
        </>
      )}

      {children}
    </div>
  )
}
