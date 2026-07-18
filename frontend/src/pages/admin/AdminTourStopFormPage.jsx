import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CampusMap } from '@/components/CampusMap'
import { ImageUploadButton } from '@/components/ImageUploadButton'
import { STOP_TYPE_COLORS } from '@/config/campusMap'
import { PANORAMA_TYPES } from '@/config/panorama'
import { createTourStop, fetchTourStops, updateTourStop } from '@/services/postsApi'

const LIGHT_INPUT = 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#1a2b5a]/20'

const EMPTY_FORM = {
  name: '',
  description: '',
  duration: '',
  campus: 'main',
  pinNumber: '',
  type: 'academic',
  mapX: '',
  mapY: '',
  gallery: [],
  panoramaType: '',
  panoramaSrc: '',
  panoramaCaption: '',
}

export function AdminTourStopFormPage() {
  const { stopId } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(stopId)

  const [allStops, setAllStops] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true

    fetchTourStops()
      .then((stops) => {
        if (!isCurrent) return
        setAllStops(stops)

        if (isEditing) {
          const stop = stops.find((item) => item.id === stopId)
          if (stop) {
            setForm({
              name: stop.name ?? '',
              description: stop.description ?? '',
              duration: stop.duration ?? '',
              campus: stop.campus ?? 'main',
              pinNumber: stop.pinNumber ?? '',
              type: stop.type ?? 'academic',
              mapX: stop.map?.x ?? '',
              mapY: stop.map?.y ?? '',
              gallery: stop.gallery ?? [],
              panoramaType: stop.panorama?.type ?? '',
              panoramaSrc: stop.panorama?.src ?? '',
              panoramaCaption: stop.panorama?.caption ?? '',
            })
          } else {
            setError('Tour stop not found.')
          }
        }
      })
      .catch(() => setError('Unable to load tour stops.'))
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [stopId, isEditing])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function updateGalleryRow(index, field, value) {
    setForm((current) => ({
      ...current,
      gallery: current.gallery.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    }))
  }

  function addGalleryRow() {
    setForm((current) => ({ ...current, gallery: [...current.gallery, { src: '', caption: '' }] }))
  }

  function removeGalleryRow(index) {
    setForm((current) => ({ ...current, gallery: current.gallery.filter((_, i) => i !== index) }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      duration: form.duration.trim(),
      campus: form.campus.trim(),
      pinNumber: form.pinNumber === '' ? undefined : Number(form.pinNumber),
      type: form.type || undefined,
      mapX: form.mapX === '' ? undefined : Number(form.mapX),
      mapY: form.mapY === '' ? undefined : Number(form.mapY),
      gallery: form.gallery.filter((row) => row.src.trim()),
      panorama: form.panoramaSrc.trim()
        ? {
            type: form.panoramaType || 'equirectangular',
            src: form.panoramaSrc.trim(),
            caption: form.panoramaCaption.trim() || undefined,
          }
        : undefined,
    }

    try {
      if (isEditing) {
        await updateTourStop(stopId, payload)
      } else {
        await createTourStop(payload)
      }
      navigate('/admin/tour-stops')
    } catch (err) {
      setError(err.message || 'Unable to save this tour stop.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Loading tour stop...
      </div>
    )
  }

  const otherStops = allStops.filter((stop) => stop.id !== stopId)
  const previewStop = {
    id: '__preview__',
    name: form.name || 'New stop',
    map: form.mapX !== '' && form.mapY !== '' ? { x: Number(form.mapX), y: Number(form.mapY) } : undefined,
    pinNumber: form.pinNumber === '' ? undefined : Number(form.pinNumber),
    type: form.type,
  }
  const mapStops = previewStop.map ? [...otherStops, previewStop] : otherStops

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-[#1a2b5a]">
        {isEditing ? 'Edit Tour Stop' : 'New Tour Stop'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Name
          </label>
          <Input
            required
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className={LIGHT_INPUT}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Description
          </label>
          <Textarea
            required
            rows={3}
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            className={LIGHT_INPUT}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              Duration
            </label>
            <Input
              required
              placeholder="e.g. 15 min"
              value={form.duration}
              onChange={(event) => updateField('duration', event.target.value)}
              className={LIGHT_INPUT}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              Campus area
            </label>
            <Input
              required
              placeholder="e.g. main, front, back"
              value={form.campus}
              onChange={(event) => updateField('campus', event.target.value)}
              className={LIGHT_INPUT}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              Pin number
            </label>
            <Input
              type="number"
              value={form.pinNumber}
              onChange={(event) => updateField('pinNumber', event.target.value)}
              className={LIGHT_INPUT}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Type
          </label>
          <Select value={form.type} onValueChange={(value) => updateField('type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(STOP_TYPE_COLORS).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Map position
          </label>
          <p className="mb-2 text-xs text-slate-500">
            Click the map below to drop the pin, or type the coordinates directly.
          </p>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <Input
              type="number"
              step="0.001"
              min="0"
              max="1"
              placeholder="x (0–1)"
              value={form.mapX}
              onChange={(event) => updateField('mapX', event.target.value)}
              className={LIGHT_INPUT}
            />
            <Input
              type="number"
              step="0.001"
              min="0"
              max="1"
              placeholder="y (0–1)"
              value={form.mapY}
              onChange={(event) => updateField('mapY', event.target.value)}
              className={LIGHT_INPUT}
            />
          </div>
          <CampusMap
            stops={mapStops}
            activeStopId={previewStop.id}
            onPickCoordinate={(x, y) => {
              updateField('mapX', x.toFixed(3))
              updateField('mapY', y.toFixed(3))
            }}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              Photo gallery
            </label>
            <div className="flex items-center gap-2">
              <ImageUploadButton
                label="Upload photos"
                onUpload={(urls) =>
                  setForm((current) => ({
                    ...current,
                    gallery: [...current.gallery, ...urls.map((src) => ({ src, caption: '' }))],
                  }))
                }
              />
              <Button type="button" variant="outline" size="sm" className="rounded-lg" onClick={addGalleryRow}>
                <Plus className="h-3.5 w-3.5" />
                Add by URL
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {form.gallery.map((row, index) => (
              <div key={index} className="flex items-center gap-2">
                {row.src && (
                  <img
                    src={row.src}
                    alt=""
                    className="h-9 w-9 shrink-0 rounded-md border border-slate-200 object-cover"
                  />
                )}
                <Input
                  placeholder="/campus/main.jpg"
                  value={row.src}
                  onChange={(event) => updateGalleryRow(index, 'src', event.target.value)}
                  className={LIGHT_INPUT}
                />
                <Input
                  placeholder="Caption"
                  value={row.caption ?? ''}
                  onChange={(event) => updateGalleryRow(index, 'caption', event.target.value)}
                  className={LIGHT_INPUT}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => removeGalleryRow(index)}
                  aria-label="Remove photo"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {form.gallery.length === 0 && (
              <p className="text-sm text-slate-400">No photos added yet.</p>
            )}
          </div>
        </div>

        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-slate-600">
            Advanced: 360° panorama
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Select
              value={form.panoramaType}
              onValueChange={(value) => updateField('panoramaType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PANORAMA_TYPES).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="/panoramas/stop.jpg"
              value={form.panoramaSrc}
              onChange={(event) => updateField('panoramaSrc', event.target.value)}
              className={LIGHT_INPUT}
            />
            <Input
              placeholder="Caption (optional)"
              value={form.panoramaCaption}
              onChange={(event) => updateField('panoramaCaption', event.target.value)}
              className={LIGHT_INPUT}
            />
          </div>
        </details>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isSubmitting} className="rounded-lg">
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Stop'}
          </Button>
          <Button asChild type="button" variant="outline" className="rounded-lg">
            <Link to="/admin/tour-stops">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
