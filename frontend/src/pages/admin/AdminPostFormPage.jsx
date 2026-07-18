import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { X } from 'lucide-react'
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
import { ImageUploadButton } from '@/components/ImageUploadButton'
import { CATEGORIES, CAMPUS_AREAS } from '@/data/posts'
import { createPost, fetchPostById, updatePost } from '@/services/postsApi'

const LIGHT_INPUT = 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#1a2b5a]/20'

const EMPTY_FORM = {
  title: '',
  excerpt: '',
  body: '',
  category: CATEGORIES[1] ?? '',
  campus: CAMPUS_AREAS[0]?.value ?? '',
  date: '',
  featured: false,
  tags: '',
  images: [],
}

export function AdminPostFormPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(postId)

  const [form, setForm] = useState(EMPTY_FORM)
  const [isLoading, setIsLoading] = useState(isEditing)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEditing) return

    let isCurrent = true

    fetchPostById(postId)
      .then((post) => {
        if (!isCurrent || !post) return
        setForm({
          title: post.title ?? '',
          excerpt: post.excerpt ?? '',
          body: post.body ?? '',
          category: post.category ?? EMPTY_FORM.category,
          campus: post.campus ?? EMPTY_FORM.campus,
          date: post.date ?? '',
          featured: Boolean(post.featured),
          tags: (post.tags ?? []).join(', '),
          images: post.images ?? [],
        })
      })
      .catch(() => setError('Unable to load this post.'))
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [postId, isEditing])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body: form.body.trim(),
      category: form.category,
      campus: form.campus,
      date: form.date.trim(),
      featured: form.featured,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      images: form.images,
    }

    try {
      if (isEditing) {
        await updatePost(postId, payload)
      } else {
        await createPost(payload)
      }
      navigate('/admin/posts')
    } catch (err) {
      setError(err.message || 'Unable to save this post.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Loading post...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-[#1a2b5a]">
        {isEditing ? 'Edit Post' : 'New Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Title
          </label>
          <Input
            required
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            className={LIGHT_INPUT}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Excerpt
          </label>
          <Textarea
            required
            rows={2}
            value={form.excerpt}
            onChange={(event) => updateField('excerpt', event.target.value)}
            className={LIGHT_INPUT}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Body
          </label>
          <Textarea
            required
            rows={6}
            value={form.body}
            onChange={(event) => updateField('body', event.target.value)}
            className={LIGHT_INPUT}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              Category
            </label>
            <Select value={form.category} onValueChange={(value) => updateField('category', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.filter((category) => category !== 'All').map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              Campus
            </label>
            <Select value={form.campus} onValueChange={(value) => updateField('campus', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CAMPUS_AREAS.map((area) => (
                  <SelectItem key={area.value} value={area.value}>
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Date
          </label>
          <Input
            required
            placeholder="e.g. May 28, 2025"
            value={form.date}
            onChange={(event) => updateField('date', event.target.value)}
            className={LIGHT_INPUT}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => updateField('featured', event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#1a2b5a] focus:ring-[#1a2b5a]/30"
          />
          Featured post
        </label>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Tags <span className="normal-case text-slate-400">(comma-separated)</span>
          </label>
          <Input
            placeholder="Science, Research, Innovation"
            value={form.tags}
            onChange={(event) => updateField('tags', event.target.value)}
            className={LIGHT_INPUT}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Images
          </label>
          <ImageUploadButton
            onUpload={(urls) => updateField('images', [...form.images, ...urls])}
          />
          {form.images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {form.images.map((src, index) => (
                <div key={src} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() =>
                      updateField('images', form.images.filter((_, i) => i !== index))
                    }
                    aria-label="Remove image"
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
        )}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isSubmitting} className="rounded-lg">
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Post'}
          </Button>
          <Button asChild type="button" variant="outline" className="rounded-lg">
            <Link to="/admin/posts">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
