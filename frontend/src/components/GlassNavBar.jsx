import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { GraduationCap, LogOut } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { getInitials } from '@/lib/utils'

/**
 * Site-wide sticky nav bar in frosted glass. Clear glass over the campus photo
 * at the top of the page; once scrolled, a navy-tinted glass keeps the white
 * links legible over light content.
 *
 * `onHeightChange` reports the bar's height (it grows when the links wrap on
 * small screens) so the page can slide its campus photo up underneath it —
 * see `HeroHeader`'s `topInset`.
 */
export function GlassNavBar({ onHeightChange, children }) {
  const navRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav || !onHeightChange) return undefined

    const observer = new ResizeObserver(() => onHeightChange(nav.offsetHeight))
    observer.observe(nav)
    return () => observer.disconnect()
  }, [onHeightChange])

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-[1500] flex flex-col gap-4 border-b border-white/15 px-5 py-4 text-white transition-[background-color,box-shadow] duration-300 sm:flex-row sm:items-center sm:justify-between sm:px-8 ${
        isScrolled
          ? 'bg-[#1a2b5a]/75 shadow-[0_8px_32px_rgba(9,20,50,0.37)] backdrop-blur-xl'
          : 'bg-white/5 backdrop-blur-md'
      }`}
    >
      {children}
    </nav>
  )
}

function navItemClass(isActive) {
  return `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors ${
    isActive
      ? 'bg-white/20 text-white shadow-[0_4px_16px_rgba(9,20,50,0.3)] ring-1 ring-white/30'
      : 'text-blue-50 hover:bg-white/15 hover:text-white'
  }`
}

export function GlassNavBrand({ to, title, subtitle }) {
  return (
    <Link to={to} className="flex flex-wrap items-center gap-2 sm:gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 shadow-[0_4px_16px_rgba(9,20,50,0.3)] ring-1 ring-white/25 backdrop-blur-md">
        <GraduationCap className="h-5 w-5" />
      </div>
      <div className="text-left">
        <p className="text-base font-semibold leading-tight drop-shadow-[0_1px_6px_rgba(8,17,40,0.5)]">
          {title}
        </p>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-100/85">
          {subtitle}
        </p>
      </div>
    </Link>
  )
}

export function GlassNavLink({ to, icon: Icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => navItemClass(isActive)}
    >
      <Icon className="h-4 w-4" />
      {children}
    </NavLink>
  )
}

export function GlassNavUser({ name, onLogout }) {
  return (
    <div className="flex items-center gap-2 pl-1">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white ring-1 ring-white/30 backdrop-blur-md">
        {getInitials(name)}
      </div>
      <span className="hidden text-sm font-medium text-blue-50 drop-shadow-[0_1px_6px_rgba(8,17,40,0.5)] sm:inline">
        {name}
      </span>
      <Button
        type="button"
        variant="ghost"
        onClick={onLogout}
        className="h-auto rounded-lg px-3 py-1.5 text-sm font-medium text-blue-50 backdrop-blur-md hover:bg-white/15 hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Log Out
      </Button>
    </div>
  )
}
