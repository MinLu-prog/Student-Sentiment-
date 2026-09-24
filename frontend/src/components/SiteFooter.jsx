import { GraduationCap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { CampusBackdrop } from '@/components/CampusBackdrop'
import { FOOTER_IMAGE } from '@/config/heroMedia'
import { FOOTER_COLUMNS } from '@/config/siteNav'
import { useAuth } from '@/context/useAuth'
import { UNIVERSITY_NAME } from '@/data/mockDb'

// Frosted-glass bar, matching the nav bar over the campus photo.
const GLASS_BAR =
  'relative border-t border-white/15 bg-white/5 px-5 py-5 text-center text-sm text-blue-50 backdrop-blur-md sm:px-8'

const COPYRIGHT = `© ${new Date().getFullYear()} Student Sentiment Project. All Rights Reserved.`

const LINK_CLASS =
  'text-sm text-blue-50/80 transition-colors hover:text-white hover:underline underline-offset-4'

function FooterColumn({ title, children }) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200/85">
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}

function Sitemap() {
  const { user, isGuest, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav
      aria-label="Site map"
      // Brand column + three link columns + Account.
      className="relative mx-auto grid max-w-6xl gap-10 px-5 py-12 text-left sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]"
    >
      <div className="sm:col-span-2 lg:col-span-1">
        <Link to="/blog" className="inline-flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 shadow-[0_4px_16px_rgba(9,20,50,0.3)] ring-1 ring-white/25 backdrop-blur-md">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-semibold leading-tight">{UNIVERSITY_NAME}</span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-sky-100/85">
              Campus Activities
            </span>
          </span>
        </Link>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-blue-100/80">
          News, stories, and a virtual tour of the MIIT campus — plus the real
          sentiment behind every student comment.
        </p>
      </div>

      {FOOTER_COLUMNS.map((column) => (
        <FooterColumn key={column.title} title={column.title}>
          {column.links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={LINK_CLASS}>
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
      ))}

      <FooterColumn title="Account">
        {isGuest ? (
          <>
            <li>
              <Link to="/login" className={LINK_CLASS}>
                Log in
              </Link>
            </li>
            <li>
              <Link to="/signup" className={LINK_CLASS}>
                Sign up
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-sm text-blue-100/70">Signed in as {user?.name}</li>
            <li>
              <button type="button" onClick={handleLogout} className={LINK_CLASS}>
                Log out
              </button>
            </li>
          </>
        )}
      </FooterColumn>
    </nav>
  )
}

/**
 * Site footer.
 * - `backdrop`: render the campus photo behind the glass. Pass false on pages
 *   whose own background is already the campus photo.
 * - `sitemap`: show the multi-column site map (config/siteNav.js) above the
 *   copyright bar.
 */
export function SiteFooter({ backdrop = true, sitemap = false }) {
  const copyright = (
    <div className={GLASS_BAR}>
      <p className="drop-shadow-[0_1px_6px_rgba(8,17,40,0.5)]">{COPYRIGHT}</p>
    </div>
  )

  if (!backdrop) {
    return <footer className="relative text-white">{copyright}</footer>
  }

  return (
    <footer className="relative isolate overflow-hidden bg-[#1a2b5a] text-white">
      <CampusBackdrop image={FOOTER_IMAGE} />
      {sitemap && <Sitemap />}
      {copyright}
    </footer>
  )
}
