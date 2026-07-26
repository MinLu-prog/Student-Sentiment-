import vader from "vader-sentiment";

export type SentimentLabel = "positive" | "neutral" | "negative";

// VADER's own documented thresholds for classifying its compound score
// (-1..1) into three buckets — https://github.com/cjhutto/vaderSentiment
const POSITIVE_THRESHOLD = 0.05;
const NEGATIVE_THRESHOLD = -0.05;

export function analyzeSentiment(text: string): SentimentLabel {
  const { compound } = vader.SentimentIntensityAnalyzer.polarity_scores(text);

  if (compound >= POSITIVE_THRESHOLD) return "positive";
  if (compound <= NEGATIVE_THRESHOLD) return "negative";
  return "neutral";
}
