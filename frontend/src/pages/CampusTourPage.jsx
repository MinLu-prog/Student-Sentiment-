import { Link, useOutletContext } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { CampusTour } from '@/components/CampusTour'

export function CampusTourPage() {
  const { tourStops, campus, isLoadingTourStops, tourStopsError } = useOutletContext()

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/blog"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a2b5a] shadow-sm transition hover:border-[#1a2b5a]/30 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#1a2b5a]/25"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b5a] text-white">
          <ArrowLeft className="h-3.5 w-3.5" />
        </span>
        Back to feed
      </Link>

      {isLoadingTourStops ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading campus tour...
        </div>
      ) : tourStopsError ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600">
          {tourStopsError}
        </div>
      ) : (
        <CampusTour stops={tourStops} campus={campus} />
      )}
    </div>
  )
}
