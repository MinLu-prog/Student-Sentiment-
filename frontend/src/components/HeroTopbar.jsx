import {
  BarChart3,
  BookOpen,
  GraduationCap,
  MapPinned,
} from 'lucide-react'
import { UNIVERSITY_NAME } from '@/data/mockDb'

export function HeroTopbar({ view, onViewChange }) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="text-left">
          <p className="text-base font-semibold leading-tight">{UNIVERSITY_NAME}</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-200/80">
            Campus Activities
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => onViewChange('feed')}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            view === 'feed'
              ? 'bg-white/15 text-white ring-1 ring-white/20'
              : 'text-blue-100 hover:bg-white/10'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Blog Feed
        </button>
        <button
          type="button"
          onClick={() => onViewChange('tour')}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            view === 'tour'
              ? 'bg-white/15 text-white ring-1 ring-white/20'
              : 'text-blue-100 hover:bg-white/10'
          }`}
        >
          <MapPinned className="h-4 w-4" />
          Campus Tour
        </button>
        <button
          type="button"
          onClick={() => onViewChange('analysis')}
          className={`inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
            view === 'analysis'
              ? 'bg-white/15 text-white ring-1 ring-white/20'
              : 'text-blue-100 hover:bg-white/10'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Comment Analysis
        </button>
      </div>
    </div>
  )
}
