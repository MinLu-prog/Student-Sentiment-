import { useState } from 'react'
import { Play, VideoOff } from 'lucide-react'

/**
 * Click-to-play video panel for a campus tour stop.
 *
 * The <video> element is deliberately not mounted until the viewer presses
 * play: these clips are tens of megabytes, and mounting one (even with
 * preload="none") invites browsers to speculatively fetch. Until then this is
 * just a poster image, so opening a stop costs nothing extra.
 */
export function CampusVideo({ src, poster, caption, duration, className = '' }) {
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)

  if (!src) return null

  return (
    <figure className={`overflow-hidden rounded-xl border border-slate-200 bg-slate-900 ${className}`}>
      <div className="relative aspect-video w-full">
        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 text-center">
            <VideoOff className="h-7 w-7 text-slate-400" />
            <p className="text-sm font-semibold text-[#1a2b5a]">Video unavailable</p>
            <p className="px-4 text-xs text-slate-500">This clip could not be played in your browser.</p>
          </div>
        ) : started ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            onError={() => setFailed(true)}
            className="h-full w-full bg-black object-contain"
          >
            <track kind="captions" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            aria-label={caption ? `Play video: ${caption}` : 'Play video'}
            className="group relative h-full w-full cursor-pointer overflow-hidden"
          >
            {poster ? (
              <img
                src={poster}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#1a2b5a] to-[#2a3f7a]" />
            )}

            {/* Scrim keeps the play control readable over any frame. */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25 transition-colors group-hover:from-black/60" />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110">
                <Play className="ml-1 h-7 w-7 fill-[#1a2b5a] text-[#1a2b5a]" />
              </span>
            </span>

            {duration && (
              <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-0.5 text-xs font-semibold tabular-nums text-white">
                {duration}
              </span>
            )}
          </button>
        )}
      </div>

      {caption && (
        <figcaption className="border-t border-slate-100 bg-white px-4 py-2.5 text-xs text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
