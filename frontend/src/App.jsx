import { useMemo, useState } from 'react'
import { GlobalNav } from '@/components/GlobalNav'
import { HeroHeader } from '@/components/HeroHeader'
import { CategoryFilter } from '@/components/CategoryFilter'
import { FeaturedPost } from '@/components/FeaturedPost'
import { PostCard } from '@/components/PostCard'
import { PostDetail } from '@/components/PostDetail'
import { SentimentSnapshot } from '@/components/SentimentSnapshot'
import { EmptyState } from '@/components/EmptyState'
import { CampusTour } from '@/components/CampusTour'
import {
  fetchCampusTourStops,
  fetchPosts,
  getStats,
  togglePostLike,
} from '@/services/postsApi'

function App() {
  const [campus, setCampus] = useState('main')
  const [view, setView] = useState('feed')
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const campusPosts = useMemo(
    () => fetchPosts({ campus }),
    [campus, refreshKey],
  )

  const selectedPost = useMemo(
    () => campusPosts.find((post) => post.id === selectedPostId) ?? null,
    [campusPosts, selectedPostId],
  )

  const tourStops = useMemo(
    () => fetchCampusTourStops(campus),
    [campus],
  )

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return campusPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [campusPosts, category, search])

  const stats = getStats(campusPosts)
  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0]
  const remainingPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id)

  function refreshPosts() {
    setRefreshKey((key) => key + 1)
  }

  function handleCategoryChange(nextCategory) {
    setCategory(nextCategory)
    setSelectedPostId(null)
    setView('feed')
  }

  function handleSearchChange(value) {
    setSearch(value)
    setSelectedPostId(null)
    setView('feed')
  }

  function handleCampusChange(value) {
    setCampus(value)
    setSelectedPostId(null)
    setCategory('All')
    setSearch('')
    setView('feed')
  }

  function handleToggleLike(postId) {
    togglePostLike(postId)
    refreshPosts()
  }

  function handleCampusTour() {
    setSelectedPostId(null)
    setView((current) => (current === 'tour' ? 'feed' : 'tour'))
  }

  return (
    <div className="min-h-svh bg-white">
      <GlobalNav
        campus={campus}
        onCampusChange={handleCampusChange}
        onCampusTour={handleCampusTour}
        activeView={view}
      />

      {view !== 'tour' && (
        <>
          <HeroHeader
            view={view}
            onViewChange={(nextView) => {
              setView(nextView)
              setSelectedPostId(null)
            }}
            search={search}
            onSearchChange={handleSearchChange}
            stats={stats}
            campus={campus}
          />

          <CategoryFilter active={category} onChange={handleCategoryChange} />
        </>
      )}

      <main className="bg-[#f8f9fa] px-5 py-8 sm:px-8">
        {view === 'tour' ? (
          <CampusTour stops={tourStops} campus={campus} />
        ) : selectedPost ? (
          <PostDetail
            post={selectedPost}
            onBack={() => setSelectedPostId(null)}
            onToggleLike={handleToggleLike}
          />
        ) : view === 'analysis' ? (
          filteredPosts.length > 0 ? (
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-[#1a2b5a]">Comment Analysis</h2>
                <p className="mt-2 text-slate-600">
                  Sentiment breakdown derived from comment records — ready to swap
                  for your backend API.
                </p>
              </div>
              {filteredPosts.map((post) => (
                <div key={post.id} className="text-left">
                  <button
                    type="button"
                    onClick={() => setSelectedPostId(post.id)}
                    className="mb-3 text-left text-base font-semibold text-[#1a2b5a] hover:underline"
                  >
                    {post.title}
                  </button>
                  <SentimentSnapshot sentiment={post.sentiment} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )
        ) : filteredPosts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {featuredPost && (
              <FeaturedPost
                post={featuredPost}
                onSelect={(post) => setSelectedPostId(post.id)}
              />
            )}

            {remainingPosts.length > 0 && (
              <section>
                <h2 className="mb-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
                  More Stories
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onSelect={(item) => setSelectedPostId(item.id)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
