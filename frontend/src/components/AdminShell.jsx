import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FileText, GraduationCap, LogOut, MapPinned, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { getInitials } from '@/lib/utils'

function navLinkClass({ isActive }) {
  return `inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-white/15 text-white ring-1 ring-white/20'
      : 'text-blue-100 hover:bg-white/10'
  }`
}

export function AdminShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-svh bg-[#f8f9fa]">
      <div className="flex flex-col gap-4 bg-[#1a2b5a] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link to="/blog" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-base font-semibold leading-tight">Admin Dashboard</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-200/80">
              Back to site
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <NavLink to="/admin/posts" className={navLinkClass}>
            <FileText className="h-4 w-4" />
            Posts
          </NavLink>
          <NavLink to="/admin/users" className={navLinkClass}>
            <Users className="h-4 w-4" />
            Users
          </NavLink>
          <NavLink to="/admin/tour-stops" className={navLinkClass}>
            <MapPinned className="h-4 w-4" />
            Tour Stops
          </NavLink>

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
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Outlet />
      </main>
    </div>
  )
}
