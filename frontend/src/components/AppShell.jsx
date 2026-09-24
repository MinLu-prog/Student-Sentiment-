import { useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { HeroHeader } from '@/components/HeroHeader'
import { HeroTopbar } from '@/components/HeroTopbar'
import { CategoryFilter } from '@/components/CategoryFilter'
import { ScrollManager } from '@/components/ScrollManager'
import { SiteFooter } from '@/components/SiteFooter'
import { CATEGORIES } from '@/data/posts'
import { fetchCampusTourStops, fetchPosts, getStats } from '@/services/postsApi'

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  // The topic filter lives in the URL (?category=...) so menu links, the
  // back button, and shared links all land on the right topic.
  const categoryParam = searchParams.get('category')
  const category = CATEGORIES.includes(categoryParam) ? categoryParam : 'All'
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [navHeight, setNavHeight] = useState(0)
  const [posts, setPosts] = useState([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState('')
  const hasLoadedPostsRef = useRef(false)

  useEffect(() => {
    let isCurrent = true

    async function loadPosts() {
      setIsLoadingPosts(!hasLoadedPostsRef.current)
      setPostsError('')

      try {
        const loaded = await fetchPosts()
        if (isCurrent) {
          setPosts(loaded)
        }
      } catch {
        if (isCurrent) {
          setPostsError('Unable to load posts right now. Please try again.')
          setPosts([])
        }
      } finally {
        if (isCurrent) {
          hasLoadedPostsRef.current = true
          setIsLoadingPosts(false)
        }
      }
    }

    loadPosts()

    return () => {
      isCurrent = false
    }
  }, [refreshKey])

  const [tourStops, setTourStops] = useState([])
  const [isLoadingTourStops, setIsLoadingTourStops] = useState(true)
  const [tourStopsError, setTourStopsError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadTourStops() {
      setIsLoadingTourStops(true)
      setTourStopsError('')

      try {
        const stops = await fetchCampusTourStops()
        if (isCurrent) {
          setTourStops(stops)
        }
      } catch {
        if (isCurrent) {
          setTourStopsError('Unable to load tour stops right now.')
          setTourStops([])
        }
      } finally {
        if (isCurrent) {
          setIsLoadingTourStops(false)
        }
      }
    }

    loadTourStops()

    return () => {
      isCurrent = false
    }
  }, [])

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return posts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [posts, category, search])

  const stats = useMemo(() => getStats(posts), [posts])
  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0]
  const remainingPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id)

  function refreshPosts() {
    setRefreshKey((key) => key + 1)
  }

  function setCategory(next) {
    setSearchParams(
      (current) => {
        const params = new URLSearchParams(current)
        if (next === 'All') params.delete('category')
        else params.set('category', next)
        return params
      },
      { replace: true },
    )
  }

  function handleSearchChange(value) {
    setSearch(value)
    if (location.pathname !== '/blog') {
      navigate({ pathname: '/blog', search: location.search })
    }
  }

  const showHeroContent = location.pathname === '/blog'
  const showCategoryFilter = location.pathname === '/blog' || location.pathname === '/sentiment'

  return (
    <div className="flex min-h-svh flex-col bg-white">
      <ScrollManager offset={navHeight} />

      <HeroTopbar onHeightChange={setNavHeight} />

      <HeroHeader
        search={search}
        onSearchChange={handleSearchChange}
        stats={stats}
        showContent={showHeroContent}
        topInset={navHeight}
      />

      {showCategoryFilter && (
        <div id="topics">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>
      )}

      <main className="flex-1 bg-[#f8f9fa] px-5 py-8 sm:px-8">
        <Outlet
          context={{
            category,
            search,
            posts,
            filteredPosts,
            featuredPost,
            remainingPosts,
            tourStops,
            isLoadingTourStops,
            tourStopsError,
            isLoadingPosts,
            postsError,
            refreshPosts,
          }}
        />
      </main>

      <SiteFooter sitemap />
    </div>
  )
}
