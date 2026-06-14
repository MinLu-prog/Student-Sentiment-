import { CATEGORIES } from '@/data/posts'

export function CategoryFilter({ active, onChange }) {
  return (
    <nav
      className="border-b border-slate-200 bg-white px-5 py-3 sm:px-8"
      aria-label="Post categories"
    >
      <ul className="flex flex-wrap items-center gap-2 sm:gap-6">
        {CATEGORIES.map((category) => {
          const isActive = active === category

          return (
            <li key={category}>
              <button
                type="button"
                onClick={() => onChange(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1a2b5a] text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
