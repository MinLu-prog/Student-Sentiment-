import {
  LayoutGrid,
  MapPinned,
  MessageCircle,
  Share2,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { CAMPUS_AREAS } from '@/data/posts'

export function GlobalNav({
  campus,
  onCampusChange,
  onCampusTour,
  activeView,
}) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-2.5 sm:px-6">
      <a href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <img
          src="/miit-logo.svg"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0"
        />
        <div className="min-w-0 text-left">
          <p className="truncate text-sm font-semibold leading-tight text-slate-900 sm:text-base">
            MIIT
          </p>
          <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500 sm:text-[11px]">
            Campus Activities
          </p>
        </div>
      </a>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Select value={campus} onValueChange={onCampusChange}>
          <SelectTrigger
            className="h-8 min-w-[120px] border-slate-200 bg-white text-xs text-slate-800 sm:min-w-[140px]"
            aria-label="Select campus area"
          >
            <SelectValue placeholder="Campus" />
          </SelectTrigger>
          <SelectContent align="end">
            {CAMPUS_AREAS.map((area) => (
              <SelectItem key={area.value} value={area.value}>
                {area.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant={activeView === 'tour' ? 'default' : 'outline'}
          size="sm"
          onClick={onCampusTour}
          className="h-8 text-xs"
        >
          <MapPinned className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Campus Tour</span>
          <span className="sm:hidden">Tour</span>
        </Button>

        <button
          type="button"
          className="hidden rounded p-1.5 text-slate-500 hover:bg-slate-100 sm:block"
          aria-label="Messages"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="hidden rounded p-1.5 text-slate-500 hover:bg-slate-100 sm:block"
          aria-label="Layout"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <Button className="h-8 rounded-md bg-indigo-500 px-3 text-xs text-white hover:bg-indigo-600">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </Button>
      </div>
    </header>
  )
}
