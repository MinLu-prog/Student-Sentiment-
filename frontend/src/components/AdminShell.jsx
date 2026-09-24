import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { FileText, MapPinned, Users } from 'lucide-react'
import {
  GlassNavBar,
  GlassNavBrand,
  GlassNavLink,
  GlassNavUser,
} from '@/components/GlassNavBar'
import { HeroHeader } from '@/components/HeroHeader'
import { ScrollManager } from '@/components/ScrollManager'
import { SiteFooter } from '@/components/SiteFooter'
import { useAuth } from '@/context/useAuth'

export function AdminShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [navHeight, setNavHeight] = useState(0)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-svh flex-col bg-[#f8f9fa]">
      <ScrollManager offset={navHeight} />

      <GlassNavBar onHeightChange={setNavHeight}>
        <GlassNavBrand to="/blog" title="Admin Dashboard" subtitle="Back to site" />

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <GlassNavLink to="/admin/posts" icon={FileText}>
            Posts
          </GlassNavLink>
          <GlassNavLink to="/admin/users" icon={Users}>
            Users
          </GlassNavLink>
          <GlassNavLink to="/admin/tour-stops" icon={MapPinned}>
            Tour Stops
          </GlassNavLink>

          <GlassNavUser name={user?.name} onLogout={handleLogout} />
        </div>
      </GlassNavBar>

      {/* Campus photo strip behind the glass nav, as on the main site. */}
      <HeroHeader showContent={false} topInset={navHeight} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">
        <Outlet />
      </main>

      <SiteFooter sitemap />
    </div>
  )
}
