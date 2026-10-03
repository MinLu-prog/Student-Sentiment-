import vader from "vader-sentiment";

export type SentimentLabel = "positive" | "neutral" | "negative";

// VADER's own documented thresholds for classifying its compound score
// (-1..1) into three buckets — https://github.com/cjhutto/vaderSentiment
const POSITIVE_THRESHOLD = 0.05;
const NEGATIVE_THRESHOLD = -0.05;

const MODEL_SERVICE_URL =
  process.env.SENTIMENT_MODEL_URL || "http://localhost:8000/predict";
const MODEL_SERVICE_TIMEOUT_MS = 5000;

function analyzeSentimentVader(text: string): SentimentLabel {
  const { compound } = vader.SentimentIntensityAnalyzer.polarity_scores(text);

  if (compound >= POSITIVE_THRESHOLD) return "positive";
  if (compound <= NEGATIVE_THRESHOLD) return "negative";
  return "neutral";
}

// Scores with the fine-tuned DistilBERT model served by model_service/, so
// labels reflect real model predictions rather than a keyword lexicon. Falls
// back to VADER if that service is unreachable, so comment creation never
// hard-fails on it.
export async function analyzeSentiment(text: string): Promise<SentimentLabel> {
  try {
    const response = await fetch(MODEL_SERVICE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(MODEL_SERVICE_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`model service responded with ${response.status}`);
    }

    const { label } = (await response.json()) as { label: SentimentLabel };
    return label;
  } catch (error) {
    console.warn(
      "Sentiment model service unavailable, falling back to VADER:",
      (error as Error).message
    );
    return analyzeSentimentVader(text);
  }
}
