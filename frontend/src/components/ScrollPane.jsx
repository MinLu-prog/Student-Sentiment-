import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Scroll container sized to show the first `visibleCount` descendants marked
 * with `data-scroll-item`; anything past that scrolls inside the pane instead
 * of stretching the page. The height is measured from the rendered items, so
 * it follows the layout (e.g. a 2- vs 3-column grid) as the width changes.
 *
 * - `activeIndex`: keeps that item scrolled into view when it changes.
 * - `fadeClassName`: gradient start colour for the "more below" fade; match
 *   it to the background the pane sits on (e.g. `from-white`).
 */
export function ScrollPane({
  visibleCount,
  activeIndex,
  fadeClassName = 'from-white',
  className,
  children,
}) {
  const paneRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState(undefined)
  const [hasMoreBelow, setHasMoreBelow] = useState(false)

  function updateFade() {
    const pane = paneRef.current
    if (!pane) return
    setHasMoreBelow(pane.scrollTop + pane.clientHeight < pane.scrollHeight - 1)
  }

  // ResizeObserver fires once on observe, then on every width/content change.
  useLayoutEffect(() => {
    const pane = paneRef.current
    if (!pane) return undefined

    const observer = new ResizeObserver(() => {
      const items = pane.querySelectorAll('[data-scroll-item]')
      if (items.length <= visibleCount) {
        setMaxHeight(undefined)
      } else {
        const last = items[visibleCount - 1]
        const paddingBottom = parseFloat(getComputedStyle(pane).paddingBottom) || 0
        setMaxHeight(last.offsetTop + last.offsetHeight + paddingBottom)
      }
      updateFade()
    })
    observer.observe(pane)
    if (pane.firstElementChild) observer.observe(pane.firstElementChild)
    return () => observer.disconnect()
  }, [visibleCount])

  // Bring the active item into view by scrolling the pane only — unlike
  // scrollIntoView, this never moves the page itself.
  useEffect(() => {
    const pane = paneRef.current
    if (!pane || activeIndex == null || activeIndex < 0) return

    const item = pane.querySelectorAll('[data-scroll-item]')[activeIndex]
    if (!item) return

    const top = item.offsetTop
    const bottom = top + item.offsetHeight
    if (top < pane.scrollTop) {
      pane.scrollTo({ top, behavior: 'smooth' })
    } else if (bottom > pane.scrollTop + pane.clientHeight) {
      pane.scrollTo({ top: bottom - pane.clientHeight, behavior: 'smooth' })
    }
  }, [activeIndex])

  return (
    <div className="relative">
      <div
        ref={paneRef}
        onScroll={updateFade}
        style={{ maxHeight }}
        className={cn(
          'relative overflow-y-auto overscroll-contain [scrollbar-color:rgb(203_213_225)_transparent] [scrollbar-width:thin]',
          className,
        )}
      >
        {children}
      </div>

      {/* Fade hinting that more items are below; hidden once scrolled to the end. */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t to-transparent transition-opacity duration-200',
          fadeClassName,
          hasMoreBelow ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
