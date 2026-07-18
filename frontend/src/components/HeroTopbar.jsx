import {
  BarChart3,
  BookOpen,
  GraduationCap,
  MapPinned,
  ShieldCheck,
} from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { UNIVERSITY_NAME } from '@/data/mockDb'
import { getInitials } from '@/lib/utils'

function navLinkClass({ isActive }) {
  return `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-white/15 text-white ring-1 ring-white/20'
      : 'text-blue-100 hover:bg-white/10'
  }`
}

export function HeroTopbar() {
  const { user, isGuest, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <Link to="/blog" className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="text-left">
          <p className="text-base font-semibold leading-tight">{UNIVERSITY_NAME}</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-200/80">
            Campus Activities
          </p>
        </div>
      </Link>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <NavLink to="/blog" className={navLinkClass}>
          <BookOpen className="h-4 w-4" />
          Blog Feed
        </NavLink>
        <NavLink to="/campus-tour" className={navLinkClass}>
          <MapPinned className="h-4 w-4" />
          Campus Tour
        </NavLink>
        <NavLink to="/sentiment" className={navLinkClass}>
          <BarChart3 className="h-4 w-4" />
          Comment Analysis
        </NavLink>
        {user?.role === 'ADMIN' && (
          <NavLink to="/admin" className={navLinkClass}>
            <ShieldCheck className="h-4 w-4" />
            Admin
          </NavLink>
        )}

        {isGuest ? (
          <Button
            asChild
            type="button"
            variant="outline"
            className="h-auto rounded-lg border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
          >
            <Link to="/login">Log In</Link>
          </Button>
        ) : (
          <div className="flex items-center gap-2 pl-1">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white ring-1 ring-white/20">
              {getInitials(user?.name)}
            </div>
            <span className="hidden text-sm font-medium text-blue-100 sm:inline">
              {user?.name}
            </span>
            <Button
              type="button"
              variant="ghost"
              onClick={handleLogout}
              className="h-auto rounded-lg px-3 py-1.5 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white"
            >
              Log Out
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
