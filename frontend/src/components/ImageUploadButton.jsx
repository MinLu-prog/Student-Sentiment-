import { useRef, useState } from 'react'
import { ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { uploadImages } from '@/services/postsApi'

/** File-picker button that uploads the chosen images to the backend and
 * hands the resulting URLs back via onUpload — used anywhere an admin form
 * needs to attach real image files instead of typing a path. */
export function ImageUploadButton({ onUpload, multiple = true, label = 'Upload photos' }) {
  const inputRef = useRef(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleChange(event) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return

    setError('')
    setIsUploading(true)

    try {
      const urls = await uploadImages(files)
      onUpload(urls)
    } catch (err) {
      setError(err.message || 'Unable to upload images.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
        className="sr-only"
      />
      <Button
        type="button"
        variant="outline"
        className="rounded-lg"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        <ImagePlus className="h-4 w-4" />
        {isUploading ? 'Uploading...' : label}
      </Button>
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
    </div>
  )
}
