import { Link, useOutletContext } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SentimentSnapshot } from '@/components/SentimentSnapshot'
import { EmptyState } from '@/components/EmptyState'
import { SentimentHero } from '@/components/sentiment/SentimentHero'
import { OverallSentimentCard } from '@/components/sentiment/OverallSentimentCard'
import { CategoryBreakdownChart } from '@/components/sentiment/CategoryBreakdownChart'
import { SentimentTrendChart } from '@/components/sentiment/SentimentTrendChart'
import { TopStoriesList } from '@/components/sentiment/TopStoriesList'
import {
  aggregateSentiment,
  sentimentByCategory,
  sentimentTrend,
  topStoriesByEngagement,
} from '@/lib/sentimentStats'

export function SentimentPage() {
  const { filteredPosts, isLoadingPosts, postsError } = useOutletContext()

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
    return (
      <div className="mx-auto max-w-3xl">
        <EmptyState />
      </div>
    )
  }

  const overall = aggregateSentiment(filteredPosts)
  const categoryRows = sentimentByCategory(filteredPosts)
  const trendPoints = sentimentTrend(filteredPosts)
  const topStories = topStoriesByEngagement(filteredPosts)

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#1a2b5a] shadow-sm transition hover:border-[#1a2b5a]/30 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#1a2b5a]/25"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a2b5a] text-white">
          <ArrowLeft className="h-3.5 w-3.5" />
        </span>
        Back to feed
      </Link>

      <SentimentHero overall={overall} storyCount={filteredPosts.length} />

      <OverallSentimentCard overall={overall} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryBreakdownChart rows={categoryRows} />
        <SentimentTrendChart points={trendPoints} />
      </div>

      <TopStoriesList posts={topStories} />

      <div className="space-y-4 text-left">
        <div>
          <h2 className="text-2xl font-bold text-[#1a2b5a]">All Stories</h2>
          <p className="mt-1 text-slate-600">Full sentiment breakdown for every story.</p>
        </div>
        {filteredPosts.map((post) => (
          <div key={post.id}>
            <Link
              to={`/blog/${post.id}`}
              className="mb-3 inline-block text-left text-base font-semibold text-[#1a2b5a] hover:underline"
            >
              {post.title}
            </Link>
            <SentimentSnapshot sentiment={post.sentiment} />
          </div>
        ))}
      </div>
    </div>
  )
}
