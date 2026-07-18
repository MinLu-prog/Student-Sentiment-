/**
 * Single source of truth for sentiment color coding across the app.
 * Validated for CVD-safe separation and contrast on a white surface via the
 * dataviz skill's palette checker (emerald-600 / amber-600 / red-600 — the
 * lighter Tailwind defaults used previously failed the lightness/contrast
 * checks). Amber's contrast lands just under the 3:1 relief threshold, so
 * amber is always paired with a visible label, never color alone.
 */
export const SENTIMENT_ORDER = ['positive', 'neutral', 'negative']

export const SENTIMENT_COLORS = {
  positive: {
    label: 'Positive',
    hex: '#059669',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    bar: 'bg-emerald-600',
    dot: 'bg-emerald-600',
  },
  neutral: {
    label: 'Neutral',
    hex: '#ca8a04',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    bar: 'bg-amber-600',
    dot: 'bg-amber-600',
  },
  negative: {
    label: 'Negative',
    hex: '#dc2626',
    bg: 'bg-red-50',
    text: 'text-red-700',
    bar: 'bg-red-600',
    dot: 'bg-red-600',
  },
}
