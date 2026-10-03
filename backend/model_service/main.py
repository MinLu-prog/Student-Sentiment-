from pathlib import Path

import torch
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForSequenceClassification, AutoTokenizer

MODEL_DIR = Path(__file__).resolve().parent.parent / "model"
LABELS = ["negative", "neutral", "positive"]

app = FastAPI(title="Sentiment Model Service")

tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)
model.eval()


class PredictRequest(BaseModel):
    text: str


class PredictResponse(BaseModel):
    label: str
    scores: dict[str, float]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest) -> PredictResponse:
    inputs = tokenizer(req.text, return_tensors="pt", truncation=True, max_length=512)
    with torch.no_grad():
        logits = model(**inputs).logits

    probs = torch.softmax(logits, dim=-1).squeeze(0).tolist()
    scores = {label: round(prob, 6) for label, prob in zip(LABELS, probs)}
    label = LABELS[int(torch.argmax(logits, dim=-1).item())]

    return PredictResponse(label=label, scores=scores)
