import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteTourStop, fetchTourStops } from '@/services/postsApi'

export function AdminTourStopsPage() {
  const [stops, setStops] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadStops()
  }, [])

  async function loadStops() {
    setIsLoading(true)
    setError('')

    try {
      const data = await fetchTourStops()
      setStops(data)
    } catch {
      setError('Unable to load tour stops right now.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(stop) {
    if (!window.confirm(`Delete "${stop.name}"? This cannot be undone.`)) return

    try {
      await deleteTourStop(stop.id)
      setStops((current) => current.filter((item) => item.id !== stop.id))
    } catch {
      window.alert('Unable to delete this stop right now.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-[#1a2b5a]">Tour Stops</h1>
        <Button asChild className="rounded-lg">
          <Link to="/admin/tour-stops/new">
            <Plus className="h-4 w-4" />
            New Stop
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading tour stops...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Pin #</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Campus</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stops.map((stop) => (
                <tr key={stop.id}>
                  <td className="px-4 py-3 text-slate-600">{stop.pinNumber ?? '—'}</td>
                  <td className="px-4 py-3 font-medium text-[#1a2b5a]">{stop.name}</td>
                  <td className="px-4 py-3 text-slate-600">{stop.type ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-600">{stop.campus}</td>
                  <td className="px-4 py-3 text-slate-600">{stop.duration}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button asChild type="button" variant="ghost" size="icon" className="h-8 w-8">
                        <Link to={`/admin/tour-stops/${stop.id}/edit`} aria-label="Edit stop">
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDelete(stop)}
                        aria-label="Delete stop"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {stops.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No tour stops yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
