import { Search } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center py-16 text-slate-400">
      <Search className="mb-4 h-12 w-12 stroke-[1.5]" />
      <p className="text-base">No posts found matching your search.</p>
    </div>
  )
}
