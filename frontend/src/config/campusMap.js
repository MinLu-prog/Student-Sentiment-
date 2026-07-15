/**
 * Campus base-map configuration for the interactive tour map.
 *
 * The map is rendered with Leaflet's CRS.Simple (a flat pixel grid, no geography),
 * using `src` as a full-bleed image overlay. Pin positions on tour stops are stored
 * as NORMALISED coordinates (`map: { x, y }`, each 0..1) so they stay correct even
 * if you swap `src` for a higher-resolution image later.
 *
 *   x = 0 → left edge,  x = 1 → right edge
 *   y = 0 → top edge,   y = 1 → bottom edge
 *
 * To replace the base image (recommended: a ~2048px WebP instead of the heavy
 * traced SVG), drop the new file in public/campus/ and change `src` + `width`/
 * `height` to its intrinsic pixel size. Nothing else needs to change.
 */
export const CAMPUS_MAP = {
  src: '/campus/map.svg',
  // Intrinsic size of the base image — defines the CRS.Simple coordinate space.
  width: 1051,
  height: 1024,
  // How far users can zoom out (negative) / in (positive) from the fitted view.
  minZoom: -2,
  maxZoom: 2,
}

/** Pin colour per stop `type`, used for the numbered map markers and legend. */
export const STOP_TYPE_COLORS = {
  entrance: '#2563eb', // blue
  academic: '#1a2b5a', // MIIT navy
  lab: '#4f46e5', // indigo
  hall: '#7c3aed', // violet
  library: '#0891b2', // cyan
  canteen: '#ea580c', // orange
  sports: '#16a34a', // green
  hostel: '#db2777', // pink
  landmark: '#ca8a04', // amber
  parking: '#0d9488', // teal
  road: '#64748b', // slate
}

export const DEFAULT_STOP_COLOR = '#1a2b5a'

export function getStopColor(stop) {
  return STOP_TYPE_COLORS[stop?.type] ?? DEFAULT_STOP_COLOR
}

/** True when a stop has a placeable map position. */
export function hasMapPosition(stop) {
  return (
    typeof stop?.map?.x === 'number' && typeof stop?.map?.y === 'number'
  )
}

/** First gallery image for a stop, used as the map-popup thumbnail. */
export function getStopCover(stop) {
  return stop?.gallery?.[0]?.src ?? null
}

/**
 * Leaflet CRS.Simple bounds for the base image: [[south, west], [north, east]].
 * Aspect ratio matches the image so the overlay isn't stretched.
 */
export const CAMPUS_MAP_BOUNDS = [
  [0, 0],
  [CAMPUS_MAP.height, CAMPUS_MAP.width],
]

/**
 * Normalised pin position {x, y} (0..1, top-left origin) -> Leaflet [lat, lng].
 * In CRS.Simple "lat" (y) increases UPWARD, so y=0 (top) maps to the highest lat.
 */
export function toLatLng({ x, y }, map = CAMPUS_MAP) {
  return [map.height * (1 - y), map.width * x]
}

/** Leaflet [lat, lng] -> normalised {x, y}. Used by the pin-placement tool. */
export function toNormalized(lat, lng, map = CAMPUS_MAP) {
  return { x: lng / map.width, y: 1 - lat / map.height }
}
