import { useEffect, useRef, useState } from 'react'
import { Viewer } from '@photo-sphere-viewer/core'
import '@photo-sphere-viewer/core/index.css'
import { Compass } from 'lucide-react'
import { PanoramaLoading, PanoramaPlaceholder } from '@/components/panorama/PanoramaPlaceholder'
import { PANORAMA_TYPES, resolvePanoramaSrc } from '@/config/panorama'

/** Shown instead of the sphere when the panorama cannot be rendered — a broken
 *  360° must never take the surrounding tour page down with it. */
function PanoramaError({ message, className = '' }) {
  return (
    <div
      className={`flex aspect-[16/9] w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-center ${className}`}
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
        <Compass className="h-7 w-7 text-slate-400" />
      </div>
      <p className="text-sm font-semibold text-[#1a2b5a]">360° view unavailable</p>
      <p className="mt-1 max-w-sm px-4 text-xs text-slate-500">{message}</p>
    </div>
  )
}

export function PanoramaViewer({ panorama, stopName, className = '' }) {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)

  const type = panorama?.type
  const src = resolvePanoramaSrc(panorama?.src)
  const caption = panorama?.caption
  // Primitive deps: keeps the viewer from being torn down and rebuilt just
  // because the parent re-rendered with a new `panorama` object identity.
  const { yaw = 0, pitch = 0, zoom = 50 } = panorama?.initialView ?? {}

  // Only the equirectangular path spins up a WebGL viewer, so it is the only
  // one with a loading phase.
  const isSphere = Boolean(src) && type === PANORAMA_TYPES.EQUIRECTANGULAR

  const [loading, setLoading] = useState(isSphere)
  const [error, setError] = useState(null)

  // Reset per-panorama state when the stop changes (React's "adjust state
  // during render" pattern — avoids a setState-in-effect).
  const [seenSrc, setSeenSrc] = useState(src)
  if (src !== seenSrc) {
    setSeenSrc(src)
    setLoading(isSphere)
    setError(null)
  }

  useEffect(() => {
    if (!isSphere) return undefined

    const container = containerRef.current
    if (!container) return undefined

    let viewer
    try {
      viewer = new Viewer({
        container,
        panorama: src,
        caption,
        defaultYaw: yaw,
        defaultPitch: pitch,
        defaultZoomLvl: zoom,
        navbar: ['zoom', 'move', 'fullscreen'],
        touchmoveTwoFingers: true,
      })
    } catch (creationError) {
      // No WebGL context, a blocked canvas, or an unsupported browser. Report
      // it in-place rather than letting the throw escape the effect.
      console.error('Panorama viewer could not start.', creationError)
      /* eslint-disable react-hooks/set-state-in-effect --
         Reporting a failure of the external viewer library; the outcome is
         only known once it has been constructed, so there is no render-phase
         equivalent. */
      setError('Your browser could not start the 360° viewer. Try a different browser or device.')
      setLoading(false)
      /* eslint-enable react-hooks/set-state-in-effect */
      return undefined
    }

    viewerRef.current = viewer

    viewer.addEventListener('ready', () => setLoading(false))
    viewer.addEventListener('panorama-error', () => {
      setError('The 360° image for this stop could not be loaded.')
      setLoading(false)
    })

    return () => {
      viewerRef.current = null
      try {
        // StrictMode mounts effects twice in dev, so destroy() can run while
        // the panorama is still loading — that path can throw inside PSV.
        viewer.destroy()
      } catch (destroyError) {
        console.warn('Panorama viewer cleanup failed.', destroyError)
      }
      container.innerHTML = ''
    }
  }, [isSphere, src, caption, yaw, pitch, zoom])

  if (!src) {
    return <PanoramaPlaceholder stopName={stopName} />
  }

  if (type === PANORAMA_TYPES.IFRAME) {
    return (
      <div className={`overflow-hidden rounded-xl border border-slate-200 ${className}`}>
        <iframe
          src={src}
          title={caption ?? stopName ?? '360 campus tour'}
          className="aspect-[16/9] w-full border-0"
          allow="accelerometer; gyroscope; fullscreen; xr-spatial-tracking"
          allowFullScreen
        />
        {caption && (
          <p className="border-t border-slate-100 bg-white px-4 py-2 text-xs text-slate-500">
            {caption}
          </p>
        )}
      </div>
    )
  }

  if (type === PANORAMA_TYPES.VIDEO) {
    return (
      <div className={`overflow-hidden rounded-xl border border-slate-200 ${className}`}>
        <video
          src={src}
          controls
          playsInline
          className="aspect-[16/9] w-full bg-black object-cover"
        >
          <track kind="captions" />
        </video>
        {caption && (
          <p className="border-t border-slate-100 bg-white px-4 py-2 text-xs text-slate-500">
            {caption}
          </p>
        )}
      </div>
    )
  }

  if (type === PANORAMA_TYPES.EQUIRECTANGULAR) {
    if (error) {
      return <PanoramaError message={error} className={className} />
    }

    return (
      <div className={`relative overflow-hidden rounded-xl border border-slate-200 ${className}`}>
        {loading && (
          <div className="absolute inset-0 z-10">
            <PanoramaLoading />
          </div>
        )}
        <div ref={containerRef} className="aspect-[16/9] w-full" />
      </div>
    )
  }

  return <PanoramaPlaceholder stopName={stopName} />
}
