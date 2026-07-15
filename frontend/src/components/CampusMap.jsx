import { useState } from 'react'
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet'
import { CRS, divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  CAMPUS_MAP,
  CAMPUS_MAP_BOUNDS,
  STOP_TYPE_COLORS,
  getStopColor,
  getStopCover,
  hasMapPosition,
  toLatLng,
  toNormalized,
} from '@/config/campusMap'
import { hasPanorama } from '@/config/panorama'

/** Numbered circular marker, coloured by stop type. Avoids Leaflet's default
 *  PNG icons (which break under Vite bundling) by using an inline divIcon. */
function pinIcon(stop, isActive) {
  const color = getStopColor(stop)
  const ready = hasPanorama(stop)
  const size = isActive ? 38 : 30
  return divIcon({
    className: 'campus-pin',
    html: `<div style="
        width:${size}px;height:${size}px;
        background:${color};color:#fff;
        font:700 ${isActive ? 15 : 13}px/1 system-ui,-apple-system,sans-serif;
        display:flex;align-items:center;justify-content:center;
        border-radius:9999px;
        border:3px solid ${isActive ? '#ffffff' : 'rgba(255,255,255,0.85)'};
        box-shadow:0 2px 6px rgba(0,0,0,0.35);
        ${ready ? '' : 'opacity:0.8;'}
      ">${stop.pinNumber ?? ''}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 2],
  })
}

/** Dev-only: click the map to capture a normalised { x, y } for pin placement. */
function CoordinatePicker({ enabled, onPick }) {
  useMapEvents({
    click(event) {
      if (!enabled) return
      const { x, y } = toNormalized(event.latlng.lat, event.latlng.lng)
      const snippet = `map: { x: ${x.toFixed(3)}, y: ${y.toFixed(3)} }`
      onPick(snippet)
      navigator.clipboard?.writeText(snippet).catch(() => {})
    },
  })
  return null
}

export function CampusMap({ stops = [], activeStopId, onSelectStop, className = '' }) {
  const isDev = Boolean(import.meta.env?.DEV)
  const [picking, setPicking] = useState(false)
  const [lastPick, setLastPick] = useState(null)

  const placeable = stops.filter(hasMapPosition)

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-200 ${className}`}
      style={{ height: 600 }}
    >
      <MapContainer
        crs={CRS.Simple}
        bounds={CAMPUS_MAP_BOUNDS}
        maxBounds={CAMPUS_MAP_BOUNDS}
        maxBoundsViscosity={1}
        minZoom={CAMPUS_MAP.minZoom}
        maxZoom={CAMPUS_MAP.maxZoom}
        attributionControl={false}
        style={{ height: '100%', width: '100%', background: '#eef1f4' }}
      >
        <ImageOverlay url={CAMPUS_MAP.src} bounds={CAMPUS_MAP_BOUNDS} />

        {placeable.map((stop) => {
          const cover = getStopCover(stop)
          return (
          <Marker
            key={stop.id}
            position={toLatLng(stop.map)}
            icon={pinIcon(stop, stop.id === activeStopId)}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                {cover && (
                  <img
                    src={cover}
                    alt=""
                    style={{
                      width: '100%',
                      height: 90,
                      objectFit: 'cover',
                      borderRadius: 6,
                      marginBottom: 6,
                    }}
                  />
                )}
                <p style={{ margin: 0, fontWeight: 700, color: '#1a2b5a' }}>
                  {stop.pinNumber ? `${stop.pinNumber}. ` : ''}
                  {stop.name}
                </p>
                {stop.nameMy && (
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#64748b' }}>
                    {stop.nameMy}
                  </p>
                )}
                {stop.description && (
                  <p style={{ margin: '6px 0 0', fontSize: 12, color: '#475569' }}>
                    {stop.description}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => onSelectStop?.(stop.id)}
                  style={{
                    marginTop: 10,
                    width: '100%',
                    cursor: 'pointer',
                    borderRadius: 8,
                    border: 0,
                    background: '#1a2b5a',
                    color: '#fff',
                    padding: '6px 10px',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {hasPanorama(stop) ? 'View 360°' : 'Open details'}
                </button>
              </div>
            </Popup>
          </Marker>
          )
        })}

        {isDev && <CoordinatePicker enabled={picking} onPick={setLastPick} />}
      </MapContainer>

      {isDev && (
        <div className="pointer-events-none absolute right-3 top-3 z-[1100] flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => setPicking((v) => !v)}
            className={`pointer-events-auto rounded-md px-3 py-1.5 text-xs font-semibold shadow ${
              picking ? 'bg-amber-500 text-white' : 'bg-white text-slate-700'
            }`}
          >
            {picking ? '📍 Click a spot…' : '📍 Pin tool'}
          </button>
          {lastPick && (
            <code className="pointer-events-auto rounded bg-slate-900/90 px-2 py-1 text-[11px] text-amber-200 shadow">
              {lastPick} (copied)
            </code>
          )}
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-3 z-[1100] flex flex-wrap gap-2 rounded-lg bg-white/90 p-2 shadow">
        {Object.entries(STOP_TYPE_COLORS).map(([type, color]) => (
          <span key={type} className="flex items-center gap-1 text-[11px] text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {type}
          </span>
        ))}
      </div>
    </div>
  )
}
