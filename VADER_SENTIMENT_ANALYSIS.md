# How VADER Sentiment Analysis Works

*A reference for explaining the comment sentiment analysis feature in this project.*

---

## 1. What is VADER?

**VADER** = **V**alence **A**ware **D**ictionary and s**E**ntiment **R**easoner.

It's a **rule-based, lexicon-based** sentiment analysis tool, originally built for Python/NLTK by
Hutto & Gilbert (2014), specifically designed and validated for **short, informal text** —
social media posts, tweets, product reviews, comments. That makes it a good fit for this project's
comment section, which is exactly that kind of text.

Unlike a machine-learning model, VADER needs **no training data** and **no training step**. It's a
fixed set of rules plus a dictionary — deterministic, fast, and fully explainable, which also
makes it easy to demo and reason about live in a seminar.

This project uses the **JavaScript port** of the original Python tool (`vader-sentiment` on npm),
so it runs directly inside the Node.js backend — no separate Python service required.

---

## 2. The core idea: a scored dictionary

At the heart of VADER is a **lexicon** — a list of roughly **7,500 words, phrases, emoticons, and
slang terms**, each hand-scored by multiple human raters for sentiment intensity on a scale from
**-4 (extremely negative)** to **+4 (extremely positive)**. A few examples of the idea (illustrative,
not the exact lexicon values):

| Word/phrase | Approx. valence |
|---|---|
| `amazing` | +3.4 |
| `good` | +1.9 |
| `okay` | +0.9 |
| `bad` | -2.5 |
| `terrible` | -3.1 |
| `:)` | +2.0 |

To score a sentence, VADER looks up every word it recognizes, sums their valence scores, and then
applies a set of **grammatical rules** on top — this is what separates VADER from a naive
"bag of positive/negative words" counter (which is what this project's *old*, dead
`frontend/src/lib/sentiment.js` file did before it was replaced).

---

## 3. The rules that make it "aware," not just a word-counter

| Rule | Effect | Example |
|---|---|---|
| **Punctuation emphasis** | Each `!` boosts intensity | `"Great!!!"` scores higher than `"Great."` |
| **Capitalization emphasis** | ALL-CAPS words boost intensity (when the rest of the sentence isn't also caps) | `"This is GREAT"` > `"This is great"` |
| **Degree modifiers (intensifiers/dampeners)** | Adverbs scale the next word's score up or down | `"extremely good"` > `"good"` > `"slightly good"` |
| **Negation flips polarity** | A negation word within ~3 tokens of a sentiment word inverts and dampens it | `"not good"` → negative, not just "less positive" |
| **The "but" rule** | Conjunctions shift weight toward the clause that follows | `"The food was great, but the service was slow"` leans negative — the part after "but" dominates |
| **Emoticons, slang, acronyms** | Included directly in the lexicon | `"lol"`, `":)"`, `":("` all carry real scores |

None of this requires understanding meaning the way a human does — it's pattern matching against
the lexicon plus these fixed grammar rules. That's both VADER's strength (fast, predictable, no
training needed) and its limitation (see §6).

---

## 4. The compound score

After scoring every token and applying the rules above, VADER sums everything into one number and
**normalizes** it into a fixed range using:

```
compound = sum / sqrt(sum² + α)          (α = 15, a tuning constant)
```

This squashes the raw sum into a range of **-1 (most negative) to +1 (most positive)**, no matter
how long the text is. VADER also reports `pos`, `neu`, and `neg` — the *proportion* of the text
that falls into each bucket — but this project only uses `compound`, since a single clean number is
all that's needed to classify a comment.

### Classifying the compound score

VADER's own documentation recommends these thresholds, and that's exactly what this project uses
(`backend/src/utils/sentiment.ts`):

| Compound score | Label |
|---|---|
| `>= 0.05` | **Positive** |
| `<= -0.05` | **Negative** |
| between | **Neutral** |

---

## 5. How it's wired into this project

**File: `backend/src/utils/sentiment.ts`**

```ts
import vader from "vader-sentiment";

export type SentimentLabel = "positive" | "neutral" | "negative";

const POSITIVE_THRESHOLD = 0.05;
const NEGATIVE_THRESHOLD = -0.05;

export function analyzeSentiment(text: string): SentimentLabel {
  const { compound } = vader.SentimentIntensityAnalyzer.polarity_scores(text);

  if (compound >= POSITIVE_THRESHOLD) return "positive";
  if (compound <= NEGATIVE_THRESHOLD) return "negative";
  return "neutral";
}
```

**File: `backend/src/routes/comment.ts`** — called when a comment is created:

```ts
const sentiment = analyzeSentiment(trimmedContent);

const comment = await prisma.comment.create({
  data: { content: trimmedContent, sentiment, postId, userId },
  ...
});
```

**Important design point for the seminar:** sentiment is computed **on the server**, from the
actual comment text — the client never sends a sentiment value, and even if it tried to, the
server would ignore it and compute its own. This matters because a client-supplied sentiment label
can't be trusted (a user could just claim their comment is "positive" regardless of what it says);
computing it server-side from the real text is the only way the label is actually meaningful.

That real (not simulated) result then flows into:
- The sentiment dot next to each comment (`frontend/src/components/CommentsList.jsx`)
- The per-post sentiment snapshot bar (`frontend/src/components/SentimentSnapshot.jsx`)
- The full analytics dashboard at `/sentiment` — overall breakdown, sentiment-by-topic chart,
  sentiment-over-time trend line, all computed from these real per-comment labels
  (`frontend/src/lib/sentimentStats.js`)

---

## 6. Real examples from this project

Tested directly against the live API (`POST /api/comments`):

| Comment text | Compound score behavior | Result |
|---|---|---|
| *"This is absolutely fantastic, I love it so much!"* | Strong positive words + `!` emphasis | **Positive** |
| *"This was terrible and a complete waste of time."* | Strong negative words | **Negative** |
| *"The event starts at 3pm in the main hall."* | No sentiment-bearing words at all | **Neutral** |
| *"I hate this, it is the worst thing ever."* (client also sent a fake `"sentiment":"positive"` tag) | Strong negative words — the fake client tag was ignored entirely | **Negative** (server computed its own answer) |

That last row is a good live demo moment: it proves the server isn't trusting the client.

---

## 7. Known limitations — worth being upfront about

This is real, not idealized, so it's worth showing where VADER actually struggles — it's a good
seminar talking point about the difference between lexicon-based and deep-learning-based NLP.

When this project's seed data was originally hand-labeled and later re-scored with real VADER,
**7 of 18 comments (39%) came out differently** than the human-picked label. The interesting
pattern: VADER tends to mis-score **polite, mild criticism** as positive, because it has no real
understanding of context — it just sees individual words:

| Comment | Human read | VADER's call | Why |
|---|---|---|---|
| *"Sound quality at the outdoor stage needs improvement."* | Negative (it's a complaint) | **Positive** | The word "improvement" itself carries a positive valence score in the lexicon — VADER can't tell that "needs improvement" is a polite way of saying something is bad |
| *"2035 feels far away — hope interim targets are shared soon."* | Negative/skeptical | **Positive** | "hope" scores positive, and VADER doesn't model the skepticism in "feels far away" |
| *"Curious how it handles stairs and narrow corridors."* | Neutral (a genuine question) | **Positive** | "Curious" carries a mildly positive valence in the lexicon |

**The takeaway for the seminar:** VADER is a *lexicon* + *grammar rules* system — it has no concept
of sarcasm, implied meaning, domain-specific context, or genuinely novel phrasing outside its rule
set. It's fast, free, deterministic, and good enough for a real product signal at scale, but it is
not "understanding" the comment the way a human (or a large language model) would. That tradeoff —
speed and simplicity vs. true comprehension — is the central thing to communicate about
lexicon-based sentiment analysis.

---

## 8. Why VADER was chosen over the alternatives

| Option | Tradeoff |
|---|---|
| **VADER (chosen)** | Pure JS port available — runs directly in the existing Node/Express backend, zero new infrastructure. Purpose-built for short informal text like comments. |
| **TextBlob** | Python-only — would require standing up and maintaining a separate Python microservice that the Node backend calls over HTTP, just to run one function. |
| **A trained ML/transformer model** | Much more accurate on nuanced text, but needs a model, inference infrastructure, and (for a custom-trained one) labeled training data — heavy for this project's scope. |
| **The old keyword-matcher** (removed) | What this project used to have: a 30-word hardcoded positive/negative list with no grammar rules at all — worse accuracy, and it was never actually wired up to anything. |

---

## Quick reference for slides

- **VADER** = lexicon (~7,500 scored words/phrases) + grammar rules (negation, intensifiers,
  punctuation, capitalization, "but") + a normalized **compound score** in `[-1, 1]`.
- Classification: `≥ 0.05` positive · `≤ -0.05` negative · else neutral.
- Runs **server-side**, per comment, on real text — not trusted from the client.
- Strength: fast, free, no training, great for short informal text.
- Weakness: no real language understanding — struggles with polite criticism, sarcasm, and
  implied meaning (empirically: ~39% mismatch against human judgment on this project's own seed
  comments).
