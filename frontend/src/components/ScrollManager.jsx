import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const WAIT_FOR_TARGET_MS = 4000
const GAP_BELOW_NAV = 16

/**
 * Router scroll behaviour for the app shells:
 * - a `#hash` scrolls its element into view just below the sticky nav
 *   (`offset`), waiting briefly for it if the page is still loading data;
 *   targets marked `data-focus-on-jump` also focus their first input;
 * - moving to a different page without a hash starts at the top.
 * Query-only changes (e.g. picking a topic filter) keep the scroll position.
 */
export function ScrollManager({ offset = 0 }) {
  const { pathname, hash, key } = useLocation()
  const previousPathname = useRef(pathname)
  const offsetRef = useRef(offset)

  useEffect(() => {
    offsetRef.current = offset
  }, [offset])

  useEffect(() => {
    const pathnameChanged = previousPathname.current !== pathname
    previousPathname.current = pathname

    if (!hash) {
      if (pathnameChanged) window.scrollTo({ top: 0 })
      return undefined
    }

    const targetId = decodeURIComponent(hash.slice(1))

    function jumpTo(element) {
      const top =
        element.getBoundingClientRect().top + window.scrollY - offsetRef.current - GAP_BELOW_NAV
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
      if (element.hasAttribute('data-focus-on-jump')) {
        element.querySelector('input, textarea')?.focus({ preventScroll: true })
      }
    }

    const existing = document.getElementById(targetId)
    if (existing) {
      jumpTo(existing)
      return undefined
    }

    const observer = new MutationObserver(() => {
      const element = document.getElementById(targetId)
      if (!element) return
      observer.disconnect()
      clearTimeout(timeout)
      jumpTo(element)
    })
    observer.observe(document.body, { childList: true, subtree: true })
    const timeout = setTimeout(() => observer.disconnect(), WAIT_FOR_TARGET_MS)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [pathname, hash, key])

  return null
}
