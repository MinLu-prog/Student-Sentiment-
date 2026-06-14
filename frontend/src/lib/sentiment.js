const POSITIVE = [
  'good',
  'great',
  'excellent',
  'amazing',
  'love',
  'happy',
  'wonderful',
  'fantastic',
  'best',
  'enjoy',
  'helpful',
  'positive',
  'awesome',
  'brilliant',
  'supportive',
]

const NEGATIVE = [
  'bad',
  'terrible',
  'awful',
  'hate',
  'sad',
  'worst',
  'horrible',
  'poor',
  'negative',
  'disappointing',
  'frustrating',
  'stressful',
  'difficult',
  'unhelpful',
  'angry',
]

export function analyzeSentiment(text) {
  const words = text.toLowerCase().match(/[a-z']+/g) ?? []
  let score = 0

  for (const word of words) {
    if (POSITIVE.includes(word)) score += 1
    if (NEGATIVE.includes(word)) score -= 1
  }

  if (score > 0) {
    return {
      label: 'Positive',
      score,
      confidence: Math.min(95, 55 + score * 12),
    }
  }

  if (score < 0) {
    return {
      label: 'Negative',
      score,
      confidence: Math.min(95, 55 + Math.abs(score) * 12),
    }
  }

  return {
    label: 'Neutral',
    score: 0,
    confidence: 50,
  }
}
