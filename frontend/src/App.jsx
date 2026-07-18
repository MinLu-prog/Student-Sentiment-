import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { HeroHeader } from '@/components/HeroHeader'
import { CategoryFilter } from '@/components/CategoryFilter'
import { FeaturedPost } from '@/components/FeaturedPost'
import { PostCard } from '@/components/PostCard'
import { PostDetail } from '@/components/PostDetail'
import { SentimentSnapshot } from '@/components/SentimentSnapshot'
import { EmptyState } from '@/components/EmptyState'
import { CampusTour } from '@/components/CampusTour'
import {
  addComment,
  fetchCampusTourStops,
  fetchPosts,
  getStats,
  togglePostLike,
} from '@/services/postsApi'

function App() {
  const campus = 'main'
  const [view, setView] = useState('feed')
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [campusPosts, setCampusPosts] = useState([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState('')
  const [isAddingComment, setIsAddingComment] = useState(false)
  const hasLoadedPostsRef = useRef(false)

  useEffect(() => {
    let isCurrent = true

    async function loadPosts() {
      setIsLoadingPosts(!hasLoadedPostsRef.current)
      setPostsError('')

      try {
        const posts = await fetchPosts({ campus })
        if (isCurrent) {
          setCampusPosts(posts)
        }
      } catch {
        if (isCurrent) {
          setPostsError('Unable to load posts right now. Please try again.')
          setCampusPosts([])
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
  }, [campus, refreshKey])

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
  }

  function handleSearchChange(value) {
    setSearch(value)
    setSelectedPostId(null)
    setView('feed')
  }

  async function handleToggleLike(postId) {
    await togglePostLike(postId)
    refreshPosts()
  }

  async function handleAddComment(postId, content) {
    setIsAddingComment(true)

    try {
      await addComment(postId, content)
      refreshPosts()
    } finally {
      setIsAddingComment(false)
    }
  }

  function handleBackToFeed() {
    setView('feed')
    setSelectedPostId(null)
  }


  return (
    <div className="min-h-svh bg-white">
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
        showContent={view === 'feed'}
      />

      {view !== 'tour' && (
        <CategoryFilter active={category} onChange={handleCategoryChange} />
      )}

      <main className="bg-[#f8f9fa] px-5 py-8 sm:px-8">
        {view === 'tour' ? (
          <div className="mx-auto max-w-5xl">
            <BackToFeedButton onClick={handleBackToFeed} className="mb-6" />
            <CampusTour stops={tourStops} campus={campus} />
          </div>
        ) : isLoadingPosts ? (
          <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Loading campus stories...
          </div>
        ) : postsError ? (
          <div className="mx-auto max-w-3xl rounded-xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600">
            {postsError}
          </div>
        ) : selectedPost ? (
          <PostDetail
            post={selectedPost}
            onBack={handleBackToFeed}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
            isAddingComment={isAddingComment}
          />
        ) : view === 'analysis' ? (
          <div className="mx-auto max-w-3xl space-y-6">
            <BackToFeedButton onClick={handleBackToFeed} />
            {filteredPosts.length > 0 ? (
              <>
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-[#1a2b5a]">Comment Analysis</h2>
                  <p className="mt-2 text-slate-600">
                    A quick read on how people are responding to each story.
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
              </>
            ) : (
              <EmptyState />
            )}
          </div>
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

function BackToFeedButton({ onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a2b5a] shadow-sm transition hover:border-[#1a2b5a]/30 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#1a2b5a]/25 ${className}`}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b5a] text-white">
        <ArrowLeft className="h-3.5 w-3.5" />
      </span>
      Back to feed
    </button>
  )
}

export default App
