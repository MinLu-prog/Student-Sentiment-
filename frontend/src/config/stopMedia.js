/**
 * A tour stop's `gallery` holds both photos and video clips.
 *
 * Videos live in the same array rather than a column of their own so that
 * adding one needs no Prisma migration (`gallery` is already `Json?`) — every
 * teammate just pulls. An entry is a video when `type === 'video'`; anything
 * without a `type` is a photo, which is what every pre-existing row looks like.
 *
 * @example
 * gallery: [
 *   { src: '/campus/LabRooms/photo_90.jpg', caption: 'Lab Rooms — photo 1' },
 *   {
 *     type: 'video',
 *     src: '/campus/LabRooms/robotic_lab.MP4',
 *     poster: '/campus/LabRooms/robotic_lab_poster.jpg',
 *     caption: 'Inside the MIIT Robotics Lab',
 *     duration: '2:11',
 *   },
 * ]
 */

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
}

function isPlayable(item) {
  return Boolean(item?.src)
}

/** Video entries of a stop's gallery, in authoring order. */
export function getStopVideos(stop) {
  return (stop?.gallery ?? []).filter(
    (item) => item?.type === MEDIA_TYPES.VIDEO && isPlayable(item),
  )
}

/**
 * Photo entries of a stop's gallery. Entries with no `type` count as photos,
 * which keeps every existing stop rendering exactly as it did before videos
 * were introduced.
 */
export function getStopPhotos(stop) {
  return (stop?.gallery ?? []).filter(
    (item) => item?.type !== MEDIA_TYPES.VIDEO && isPlayable(item),
  )
}
