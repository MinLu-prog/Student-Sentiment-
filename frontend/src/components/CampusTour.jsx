import { useEffect, useMemo, useState } from 'react'
import { Compass, MapPin, RotateCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PanoramaViewer } from '@/components/panorama/PanoramaViewer'
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

  useEffect(() => {
    setActiveStopId(defaultStopId)
  }, [defaultStopId, campus])

  const activeStop =
    stops.find((stop) => stop.id === activeStopId) ?? stops[0] ?? null

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
            <h2 className="text-2xl font-bold text-[#1a2b5a]">360° Campus Tour</h2>
          </div>
          <p className="text-slate-600">
            Explore {campusLabel} locations in 360°. Drag to look around, scroll to zoom.
          </p>
        </div>
        {activeStop && (
          <Badge className="rounded-full border-0 bg-[#1a2b5a] px-3 py-1 text-white hover:bg-[#1a2b5a]">
            <RotateCw className="mr-1 h-3 w-3" />
            {activeStop.name}
          </Badge>
        )}
      </div>

      <PanoramaViewer
        panorama={activeStop?.panorama}
        stopName={activeStop?.name}
        className="mb-6 shadow-md"
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <nav aria-label="Tour stops" className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
            Tour Stops
          </p>
          {stops.map((stop, index) => {
            const isActive = stop.id === activeStop?.id
            const has360 = hasPanorama(stop)

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
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{stop.name}</span>
                  <span
                    className={`mt-0.5 block text-xs ${
                      isActive ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {has360 ? '360° ready' : '360° pending'}
                  </span>
                </span>
              </button>
            )
          })}
        </nav>

        <div className="space-y-4">
          {activeStop && (
            <Card className="rounded-xl border-slate-200 p-5 shadow-sm">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-[#1a2b5a]">{activeStop.name}</h3>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />
                  {activeStop.duration}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {activeStop.description}
              </p>

              {!hasPanorama(activeStop) && (
                <div className="mt-4 rounded-lg bg-slate-50 p-4 text-xs text-slate-600">
                  <p className="mb-2 font-semibold text-[#1a2b5a]">
                    To add a 360° view for this stop:
                  </p>
                  <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-white p-3 text-[11px] leading-relaxed">
{`panorama: {
  type: 'equirectangular',
  src: '/panoramas/${activeStop.id}.jpg',
  caption: '${activeStop.name}',
}`}
                  </pre>
                </div>
              )}
            </Card>
          )}

          <Card className="rounded-xl border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-[#1a2b5a]">Supported panorama formats</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
              <li>
                <strong>equirectangular</strong> — JPG/PNG 360° photos in{' '}
                <code className="rounded bg-white px-1">public/panoramas/</code>
              </li>
              <li>
                <strong>iframe</strong> — Matterport, Kuula, or Street View embed URLs
              </li>
              <li>
                <strong>video</strong> — 360° MP4 video files
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
