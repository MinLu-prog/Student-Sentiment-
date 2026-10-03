import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function BackLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a2b5a] shadow-sm transition hover:border-[#1a2b5a]/30 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#1a2b5a]/25"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b5a] text-white">
        <ArrowLeft className="h-3.5 w-3.5" />
      </span>
      {children}
    </Link>
  )
}
