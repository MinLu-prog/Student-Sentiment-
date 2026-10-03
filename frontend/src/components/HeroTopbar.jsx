import { BarChart3, BookOpen, MapPinned, ShieldCheck, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  GlassNavBar,
  GlassNavBrand,
  GlassNavLink,
  GlassNavUser,
} from '@/components/GlassNavBar'
import { useAuth } from '@/context/useAuth'
import { UNIVERSITY_NAME } from '@/data/mockDb'

export function HeroTopbar({ onHeightChange }) {
  const { user, isGuest, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <GlassNavBar onHeightChange={onHeightChange}>
      <GlassNavBrand to="/blog" title={UNIVERSITY_NAME} subtitle="Campus Activities" />

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <GlassNavLink to="/blog" icon={BookOpen}>
          Blog Feed
        </GlassNavLink>
        <GlassNavLink to="/campus-tour" icon={MapPinned}>
          Campus Tour
        </GlassNavLink>
        <GlassNavLink to="/sentiment" icon={BarChart3}>
          Comment Analysis
        </GlassNavLink>
        <GlassNavLink to="/faculties-and-staff" icon={Users}>
          Faculties &amp; Staff
        </GlassNavLink>
        {user?.role === 'ADMIN' && (
          <GlassNavLink to="/admin" icon={ShieldCheck}>
            Admin
          </GlassNavLink>
        )}

        {isGuest ? (
          <Button
            asChild
            type="button"
            variant="outline"
            className="h-auto rounded-lg border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-[0_4px_16px_rgba(9,20,50,0.3)] backdrop-blur-md hover:bg-white/20"
          >
            <Link to="/login">Log In</Link>
          </Button>
        ) : (
          <GlassNavUser name={user?.name} onLogout={handleLogout} />
        )}
      </div>
    </GlassNavBar>
  )
}
