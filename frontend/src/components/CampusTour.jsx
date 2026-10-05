import { useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import {
  Clock,
  Compass,
  Image as ImageIcon,
  Map as MapIcon,
  MapPin,
  RotateCw,
  Video as VideoIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PanoramaViewer } from '@/components/panorama/PanoramaViewer'
import { CampusMap } from '@/components/CampusMap'
import { CampusGallery } from '@/components/CampusGallery'
import { CampusVideo } from '@/components/CampusVideo'
import { ScrollPane } from '@/components/ScrollPane'
import { hasPanorama } from '@/config/panorama'
import { getStopPhotos, getStopVideos } from '@/config/stopMedia'

const VISIBLE_STOPS = 10

export function CampusTour({ stops }) {
  const defaultStopId = useMemo(() => {
    const withPanorama = stops.find((stop) => hasPanorama(stop))
    return withPanorama?.id ?? stops[0]?.id ?? null
  }, [stops])

  const [activeStopId, setActiveStopId] = useState(defaultStopId)
  const [mode, setMode] = useState('map') // 'map' | 'immersive'

  // Reset the active stop when the available stops change (React's
  // "adjust state during render" pattern — avoids a setState-in-effect).
  const [seenDefault, setSeenDefault] = useState(defaultStopId)
  if (defaultStopId !== seenDefault) {
    setSeenDefault(defaultStopId)
    setActiveStopId(defaultStopId)
  }

  // Deep links (e.g. from the footer site map): ?stop=<id> opens that stop in the
  // 360° view, ?view=map|360 picks the mode. Applied once per navigation
  // (keyed on location.key) so clicking the same link again re-applies it.
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [seenLocationKey, setSeenLocationKey] = useState(null)
  if (location.key !== seenLocationKey) {
    setSeenLocationKey(location.key)
    const requestedStop = stops.find((stop) => String(stop.id) === searchParams.get('stop'))
    const requestedView = searchParams.get('view')
    if (requestedStop) {
      setActiveStopId(requestedStop.id)
      setMode('immersive')
    } else if (requestedView === '360') {
      setMode('immersive')
    } else if (requestedView === 'map') {
      setMode('map')
    }
  }

  const activeStop =
    stops.find((stop) => stop.id === activeStopId) ?? stops[0] ?? null
  const activeStopIndex = stops.indexOf(activeStop)

  // A stop's gallery mixes stills and clips; split them so the lightbox only
  // ever receives images and the photo count stays a photo count.
  const stopVideos = getStopVideos(activeStop)
  const stopPhotos = getStopPhotos(activeStop)

  function openStop(stopId) {
    setActiveStopId(stopId)
    setMode('immersive')
  }

  if (stops.length === 0) {
    return (
      <section className="mx-auto max-w-5xl text-left">
        <h2 className="text-2xl font-bold text-[#1a2b5a]">Campus Tour</h2>
        <p className="mt-2 text-slate-600">No tour stops available yet.</p>
      </section>
    )
  }

  return (
    <section id="tour" className="mx-auto max-w-5xl text-left">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Compass className="h-5 w-5 text-[#1a2b5a]" />
            <h2 className="text-2xl font-bold text-[#1a2b5a]">Virtual Campus Tour</h2>
          </div>
          <p className="text-slate-600">
            {mode === 'map'
              ? 'Tap a numbered pin on the campus map to explore that location.'
              : 'Drag to look around, scroll to zoom. Switch to the map to pick another spot.'}
          </p>
        </div>

        {/* Map / 360° mode toggle */}
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setMode('map')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              mode === 'map' ? 'bg-[#1a2b5a] text-white' : 'text-slate-600 hover:text-[#1a2b5a]'
            }`}
          >
            <MapIcon className="h-4 w-4" />
            Map
          </button>
          <button
            type="button"
            onClick={() => setMode('immersive')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              mode === 'immersive' ? 'bg-[#1a2b5a] text-white' : 'text-slate-600 hover:text-[#1a2b5a]'
            }`}
          >
            <RotateCw className="h-4 w-4" />
            360° View
          </button>
        </div>
      </div>

      {mode === 'map' ? (
        <CampusMap
          stops={stops}
          activeStopId={activeStopId}
          onSelectStop={openStop}
          className="shadow-md"
        />
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMode('map')}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1a2b5a]"
            >
              <MapIcon className="h-4 w-4" />
              Back to map
            </button>
            {activeStop && (
              <Badge className="rounded-full border-0 bg-[#1a2b5a] px-3 py-1 text-white hover:bg-[#1a2b5a]">
                <RotateCw className="mr-1 h-3 w-3" />
                {activeStop.name}
              </Badge>
            )}
          </div>

          {/* Only stops that actually have a 360° photo get the sphere; the
              rest fall through to the photo gallery below. */}
          {hasPanorama(activeStop) && (
            <PanoramaViewer
              panorama={activeStop.panorama}
              stopName={activeStop.name}
              className="mb-6 shadow-md"
            />
          )}

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <nav aria-label="Tour stops" className="self-start">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
                  Tour Stops
                </p>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                  {stops.length} {stops.length === 1 ? 'stop' : 'stops'}
                </span>
              </div>

              {/* First VISIBLE_STOPS show at once; the rest scroll inside the list. */}
              <ScrollPane
                visibleCount={VISIBLE_STOPS}
                activeIndex={activeStopIndex}
                fadeClassName="from-[#f8f9fa]"
                className="space-y-2 pr-1"
              >
                {stops.map((stop) => {
                  const isActive = stop.id === activeStop?.id
                  const has360 = hasPanorama(stop)
                  const hasVideo = getStopVideos(stop).length > 0
                  const mediaLabel = [
                    has360 ? '360° ready' : null,
                    hasVideo ? 'Video' : null,
                  ]
                    .filter(Boolean)
                    .join(' · ') || 'Photo gallery'

                  return (
                    <button
                      key={stop.id}
                      type="button"
                      data-scroll-item
                      onClick={() => setActiveStopId(stop.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
                        isActive
                          ? 'border-[#1a2b5a] bg-[#1a2b5a] text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#1a2b5a] text-white'
                        }`}
                      >
                        {stop.pinNumber ?? '•'}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">{stop.name}</span>
                        <span
                          className={`mt-0.5 block text-xs ${
                            isActive ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {mediaLabel}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </ScrollPane>
            </nav>

            <div className="space-y-4">
              {activeStop && (
                <Card className="overflow-hidden rounded-2xl border-slate-200 p-0 shadow-sm">
                  {/* Header band — Tour Stop Name */}
                  <div className="bg-gradient-to-r from-[#1a2b5a] to-[#2a3f7a] px-6 py-5 text-white">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                        {activeStop.pinNumber ?? '•'}
                      </span>
                      <h3 className="text-xl font-bold leading-tight">{activeStop.name}</h3>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-100">
                      {activeStop.type && (
                        <span className="inline-flex items-center gap-1 capitalize">
                          <MapPin className="h-3.5 w-3.5" />
                          {activeStop.type}
                        </span>
                      )}
                      {activeStop.duration && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {activeStop.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-5">
                    {/* Caption */}
                    <p className="text-sm leading-relaxed text-slate-600">
                      {activeStop.description}
                    </p>

                    {/* Respective images gallery */}
                    {stopPhotos.length > 0 ? (
                      <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
                            <ImageIcon className="h-3.5 w-3.5" />
                            Photo Gallery
                          </p>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                            {stopPhotos.length}{' '}
                            {stopPhotos.length === 1 ? 'photo' : 'photos'}
                          </span>
                        </div>
                        {/* Keyed by stop so switching stops starts the gallery at the top. */}
                        <CampusGallery key={activeStop.id} images={stopPhotos} />
                      </div>
                    ) : (
                      stopVideos.length === 0 && (
                        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-400">
                          <ImageIcon className="h-4 w-4" />
                          Photos for this stop are coming soon.
                        </div>
                      )
                    )}

                    {/* Video walkthroughs — below the stills, so the gallery
                        stays the first thing reached on scroll. */}
                    {stopVideos.length > 0 && (
                      <div className="mt-6">
                        <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
                          <VideoIcon className="h-3.5 w-3.5" />
                          Video
                        </p>
                        <div className="space-y-4">
                          {stopVideos.map((video) => (
                            // Keyed by stop + src so switching stops unmounts
                            // any playing clip instead of reusing the element.
                            <CampusVideo
                              key={`${activeStop.id}-${video.src}`}
                              src={video.src}
                              poster={video.poster}
                              caption={video.caption}
                              duration={video.duration}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
