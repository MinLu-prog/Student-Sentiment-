# Sentiment Model Service

Serves the fine-tuned DistilBERT model in `backend/model/` over HTTP so the
Node backend can call it for real comment sentiment analysis, instead of the
VADER lexicon fallback in `src/utils/sentiment.ts`.

3-class output, in id order: `negative`, `neutral`, `positive`.

## Setup

```bash
cd backend/model_service
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --port 8000
```

The Node backend calls `http://localhost:8000/predict` by default — override
with `SENTIMENT_MODEL_URL` in `backend/.env` if you run it elsewhere.

## API

```
POST /predict
{ "text": "the campus wifi is amazing" }

-> { "label": "positive", "scores": { "negative": 0.01, "neutral": 0.03, "positive": 0.96 } }
```

If this service isn't running, comment creation still works — the backend
falls back to VADER and logs a warning.
