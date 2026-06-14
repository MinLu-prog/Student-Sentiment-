import { useEffect, useRef, useState } from 'react'
import { Viewer } from '@photo-sphere-viewer/core'
import '@photo-sphere-viewer/core/index.css'
import { PanoramaLoading, PanoramaPlaceholder } from '@/components/panorama/PanoramaPlaceholder'
import { PANORAMA_TYPES } from '@/config/panorama'

export function PanoramaViewer({ panorama, stopName, className = '' }) {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!panorama || panorama.type !== PANORAMA_TYPES.EQUIRECTANGULAR) {
      setLoading(false)
      return undefined
    }

    if (!containerRef.current) return undefined

    setLoading(true)
    setError(null)

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: panorama.src,
      caption: panorama.caption,
      defaultYaw: panorama.initialView?.yaw ?? 0,
      defaultPitch: panorama.initialView?.pitch ?? 0,
      defaultZoomLvl: panorama.initialView?.zoom ?? 50,
      navbar: ['zoom', 'move', 'fullscreen'],
      touchmoveTwoFingers: true,
    })

    viewerRef.current = viewer

    viewer.addEventListener('ready', () => setLoading(false))
    viewer.addEventListener('panorama-error', () => {
      setError('Could not load panorama image.')
      setLoading(false)
    })

    return () => {
      viewer.destroy()
      viewerRef.current = null
    }
  }, [panorama])

  if (!panorama?.src) {
    return <PanoramaPlaceholder stopName={stopName} />
  }

  if (panorama.type === PANORAMA_TYPES.IFRAME) {
    return (
      <div className={`overflow-hidden rounded-xl border border-slate-200 ${className}`}>
        <iframe
          src={panorama.src}
          title={panorama.caption ?? stopName ?? '360 campus tour'}
          className="aspect-[16/9] w-full border-0"
          allow="accelerometer; gyroscope; fullscreen; xr-spatial-tracking"
          allowFullScreen
        />
        {panorama.caption && (
          <p className="border-t border-slate-100 bg-white px-4 py-2 text-xs text-slate-500">
            {panorama.caption}
          </p>
        )}
      </div>
    )
  }

  if (panorama.type === PANORAMA_TYPES.VIDEO) {
    return (
      <div className={`overflow-hidden rounded-xl border border-slate-200 ${className}`}>
        <video
          src={panorama.src}
          controls
          playsInline
          className="aspect-[16/9] w-full bg-black object-cover"
        >
          <track kind="captions" />
        </video>
        {panorama.caption && (
          <p className="border-t border-slate-100 bg-white px-4 py-2 text-xs text-slate-500">
            {panorama.caption}
          </p>
        )}
      </div>
    )
  }

  if (panorama.type === PANORAMA_TYPES.EQUIRECTANGULAR) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-slate-200 ${className}`}>
        {loading && (
          <div className="absolute inset-0 z-10">
            <PanoramaLoading />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/90 text-sm text-red-200">
            {error}
          </div>
        )}
        <div ref={containerRef} className="aspect-[16/9] w-full" />
      </div>
    )
  }

  return <PanoramaPlaceholder stopName={stopName} />
}
