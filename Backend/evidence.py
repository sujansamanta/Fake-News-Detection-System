# evidence.py
import os
import requests
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

# lazy import globals
_tokenizer = None
_model = None
_torch = None

load_dotenv()  # loads .env in project root

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
NEWS_API_URL = "https://newsapi.org/v2/everything"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
SUPPORT_THRESHOLD = float(os.getenv("SUPPORT_THRESHOLD", 0.50))

def _ensure_transformers():
    global _tokenizer, _model, _torch
    if _tokenizer is None or _model is None:
        import torch as _t
        from transformers import AutoTokenizer, AutoModel
        _torch = _t
        _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        _model = AutoModel.from_pretrained(MODEL_NAME)
    return _tokenizer, _model, _torch

def _mean_pooling(texts):
    texts = [t for t in texts if t]
    if not texts:
        return np.array([])
    tokenizer, model, torch = _ensure_transformers()
    encoded = tokenizer(texts, padding=True, truncation=True, return_tensors="pt", max_length=512)
    with torch.no_grad():
        out = model(**encoded)
    token_embeddings = out.last_hidden_state
    mask = encoded["attention_mask"].unsqueeze(-1).expand(token_embeddings.size()).float()
    summed = (token_embeddings * mask).sum(1)
    summed_mask = mask.sum(1).clamp(min=1e-9)
    return (summed / summed_mask).numpy()

def _search_news_api(query, language="en", max_articles=3):
    if not NEWS_API_KEY:
        return []
    params = {"q": query, "language": language, "pageSize": max_articles, "apiKey": NEWS_API_KEY}
    try:
        r = requests.get(NEWS_API_URL, params=params, timeout=7)
        r.raise_for_status()
        data = r.json()
        articles = []
        for a in data.get("articles", []):
            content = a.get("content") or a.get("description") or a.get("title")
            if content:
                articles.append(content.split(" [+")[0])
        return articles
    except Exception:
        return []

def _search_wikipedia(query, max_summaries=2):
    out = []
    try:
        import wikipedia
        titles = wikipedia.search(query, results=max_summaries)
        for t in titles:
            try:
                page = wikipedia.page(t, auto_suggest=False)
                out.append(page.content[:500])
            except (wikipedia.exceptions.DisambiguationError, wikipedia.exceptions.PageError):
                continue
    except Exception:
        pass
    return out

def process_single_claim(claim):
    """
    Call this from your Flask app.
    Returns: {'claim':..., 'confidence_score':float, 'status': 'Supported'|'Not Supported'|...}
    """
    news = _search_news_api(claim)
    wiki = _search_wikipedia(claim)
    evidence = news + wiki
    if not evidence:
        return {"claim": claim, "confidence_score": 0.0, "status": "Not Supported (No Evidence Found)"}

    texts = [claim] + evidence
    emb = _mean_pooling(texts)
    if emb.size == 0:
        return {"claim": claim, "confidence_score": 0.0, "status": "Not Supported (Embedding Error)"}

    claim_emb = emb[0].reshape(1, -1)
    ev_embs = emb[1:]
    sims = cosine_similarity(claim_emb, ev_embs)[0]
    avg = float(np.mean(sims))
    status = "Supported" if avg >= SUPPORT_THRESHOLD else "Not Supported"
    return {"claim": claim, "confidence_score": round(avg, 4), "status": status}