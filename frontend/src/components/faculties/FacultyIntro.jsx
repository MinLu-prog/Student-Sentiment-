import { Handshake } from 'lucide-react'
import { Card } from '@/components/ui/card'

/** "Our Faculty" — MIIT's own introduction to its teaching staff. */
export function FacultyIntro({ paragraphs }) {
  return (
    <Card className="grid gap-8 rounded-2xl border-slate-200 p-6 sm:p-8 lg:grid-cols-[1fr_18rem]">
      <div className="space-y-4 text-left text-[15px] leading-relaxed text-slate-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <aside
        aria-label="Teaching partnership"
        className="flex flex-col justify-center gap-4 rounded-2xl bg-[#1a2b5a] p-6 text-white"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
          <Handshake className="h-5 w-5" />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">
          Teaching partnership
        </p>
        <div className="space-y-3 text-sm">
          <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
            <p className="font-semibold">IIIT Bangalore, India</p>
            <p className="text-blue-100/80">Experienced deputed faculty</p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
            <p className="font-semibold">MIIT, Myanmar</p>
            <p className="text-blue-100/80">Faculty from Myanmar</p>
          </div>
        </div>
      </aside>
    </Card>
  )
}
