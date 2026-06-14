/**
 * Panorama configuration for campus tour stops.
 *
 * Add a `panorama` field to any stop in CAMPUS_TOUR_STOPS (or from your backend):
 *
 * @example Equirectangular image (place files in public/panoramas/)
 * panorama: {
 *   type: 'equirectangular',
 *   src: '/panoramas/main-auditorium.jpg',
 *   caption: 'Main Auditorium — front entrance',
 *   initialView: { yaw: 0, pitch: 0, zoom: 50 },
 * }
 *
 * @example Embedded tour (Matterport, Kuula, Google Street View, etc.)
 * panorama: {
 *   type: 'iframe',
 *   src: 'https://my.matterport.com/show/?m=YOUR_MODEL_ID',
 *   caption: 'Virtual walkthrough',
 * }
 *
 * @example 360 video
 * panorama: {
 *   type: 'video',
 *   src: '/panoramas/innovation-lab-360.mp4',
 *   caption: 'Innovation Lab tour',
 * }
 */

export const PANORAMA_TYPES = {
  EQUIRECTANGULAR: 'equirectangular',
  IFRAME: 'iframe',
  VIDEO: 'video',
}

/** Default demo panorama — replace with your own MIIT campus images. */
export const DEMO_PANORAMA_URL =
  'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg'

export function hasPanorama(stop) {
  return Boolean(stop?.panorama?.src)
}

export function getPanoramaCaption(stop) {
  return stop?.panorama?.caption ?? stop?.name ?? 'Campus location'
}
