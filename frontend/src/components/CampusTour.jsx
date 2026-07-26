import { useMemo, useState } from 'react'
import { Clock, Compass, Image as ImageIcon, Map as MapIcon, MapPin, RotateCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PanoramaViewer } from '@/components/panorama/PanoramaViewer'
import { CampusMap } from '@/components/CampusMap'
import { CampusGallery } from '@/components/CampusGallery'
import { CAMPUS_AREAS } from '@/data/posts'
import { hasPanorama } from '@/config/panorama'

export function CampusTour({ stops, campus }) {
  const campusLabel =
    CAMPUS_AREAS.find((area) => area.value === campus)?.label ?? 'Main Campus'

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

  const activeStop =
    stops.find((stop) => stop.id === activeStopId) ?? stops[0] ?? null

  function openStop(stopId) {
    setActiveStopId(stopId)
    setMode('immersive')
  }

  if (stops.length === 0) {
    return (
      <section className="mx-auto max-w-5xl text-left">
        <h2 className="text-2xl font-bold text-[#1a2b5a]">Campus Tour</h2>
        <p className="mt-2 text-slate-600">No tour stops available for {campusLabel}.</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl text-left">
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
            {/* 360° View */} Detail View
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

          {/* <PanoramaViewer
            panorama={activeStop?.panorama}
            stopName={activeStop?.name}
            className="mb-6 shadow-md"
          /> */}

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <nav aria-label="Tour stops" className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
                Tour Stops
              </p>
              {stops.map((stop) => {
                const isActive = stop.id === activeStop?.id
                // 360° panorama feature disabled for the mid-sem seminar
                // const has360 = hasPanorama(stop)

                return (
                  <button
                    key={stop.id}
                    type="button"
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
                      {/* 360° status label disabled for the mid-sem seminar
                      <span
                        className={`mt-0.5 block text-xs ${
                          isActive ? 'text-blue-100' : 'text-slate-500'
                        }`}
                      >
                        {has360 ? '360° ready' : '360° pending'}
                      </span>
                      */}
                    </span>
                  </button>
                )
              })}
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
                    {activeStop.gallery?.length > 0 ? (
                      <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
                            <ImageIcon className="h-3.5 w-3.5" />
                            Photo Gallery
                          </p>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                            {activeStop.gallery.length}{' '}
                            {activeStop.gallery.length === 1 ? 'photo' : 'photos'}
                          </span>
                        </div>
                        <CampusGallery images={activeStop.gallery} />
                      </div>
                    ) : (
                      <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-400">
                        <ImageIcon className="h-4 w-4" />
                        Photos for this stop are coming soon.
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
