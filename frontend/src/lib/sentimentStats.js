export function aggregateSentiment(posts) {
  const totals = { positive: 0, neutral: 0, negative: 0 }

  for (const post of posts) {
    totals.positive += post.sentiment?.positive?.count ?? 0
    totals.neutral += post.sentiment?.neutral?.count ?? 0
    totals.negative += post.sentiment?.negative?.count ?? 0
  }

  const total = totals.positive + totals.neutral + totals.negative
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0)

  return {
    total,
    positive: { count: totals.positive, percent: pct(totals.positive) },
    neutral: { count: totals.neutral, percent: pct(totals.neutral) },
    negative: { count: totals.negative, percent: pct(totals.negative) },
  }
}

export function sentimentByCategory(posts) {
  const buckets = new Map()

  for (const post of posts) {
    const key = post.category ?? 'Uncategorized'
    const bucket = buckets.get(key) ?? { positive: 0, neutral: 0, negative: 0 }
    bucket.positive += post.sentiment?.positive?.count ?? 0
    bucket.neutral += post.sentiment?.neutral?.count ?? 0
    bucket.negative += post.sentiment?.negative?.count ?? 0
    buckets.set(key, bucket)
  }

  return [...buckets.entries()]
    .map(([category, counts]) => ({
      category,
      ...counts,
      total: counts.positive + counts.neutral + counts.negative,
    }))
    .filter((row) => row.total > 0)
    .sort((a, b) => b.total - a.total)
}

export function sentimentTrend(posts) {
  return posts
    .map((post) => {
      const date = new Date(post.date)
      const total =
        (post.sentiment?.positive?.count ?? 0) +
        (post.sentiment?.neutral?.count ?? 0) +
        (post.sentiment?.negative?.count ?? 0)

      return {
        id: post.id,
        title: post.title,
        date,
        total,
        positive: post.sentiment?.positive?.percent ?? 0,
        neutral: post.sentiment?.neutral?.percent ?? 0,
        negative: post.sentiment?.negative?.percent ?? 0,
      }
    })
    .filter((point) => point.total > 0 && !Number.isNaN(point.date.getTime()))
    .sort((a, b) => a.date - b.date)
}

export function topStoriesByEngagement(posts, limit = 5) {
  return [...posts]
    .filter((post) => (post.commentCount ?? 0) > 0)
    .sort((a, b) => (b.commentCount ?? 0) - (a.commentCount ?? 0))
    .slice(0, limit)
}
