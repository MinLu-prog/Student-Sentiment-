import { useOutletContext } from 'react-router-dom'
import { FeaturedPost } from '@/components/FeaturedPost'
import { PostCard } from '@/components/PostCard'
import { EmptyState } from '@/components/EmptyState'

export function BlogFeedPage() {
  const { filteredPosts, featuredPost, remainingPosts, isLoadingPosts, postsError } =
    useOutletContext()

  if (isLoadingPosts) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Loading campus stories...
      </div>
    )
  }

  if (postsError) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600">
        {postsError}
      </div>
    )
  }

  if (filteredPosts.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      {featuredPost && <FeaturedPost post={featuredPost} />}

      {remainingPosts.length > 0 && (
        <section>
          <h2 className="mb-4 text-left text-xs font-bold uppercase tracking-[0.15em] text-[#1a2b5a]">
            More Stories
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
