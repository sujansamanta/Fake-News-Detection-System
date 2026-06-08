# Fake News Detection Backend

This backend serves a Flask API for fake news detection. It uses an evidence-based check first, then falls back to an LSTM model if evidence does not support the claim.

## Features

- `GET /` - health check endpoint
- `POST /predict` - predicts whether given text is FAKE or REAL
- `POST /extract` - extracts readable text from a provided URL
- Evidence search uses NewsAPI and Wikipedia to support claims before model inference

## Requirements

- Python 3.8+
- `fake_news_lstm_model.h5`
- `tokenizer.pkl`

## Install dependencies

From the `Backend/` folder:

```bash
pip install -r requirements.txt
```

## Environment variables

Create a `.env` file in the `Backend/` folder if you want evidence search support.

Example:

```env
NEWS_API_KEY=your_newsapi_key_here
SUPPORT_THRESHOLD=0.50
```

- `NEWS_API_KEY`: optional, used by `evidence.py` to search NewsAPI.
- `SUPPORT_THRESHOLD`: optional, default is `0.50`.

If `NEWS_API_KEY` is missing, evidence search will still run using Wikipedia only.

## Run the backend

From the `Backend/` folder:

```bash
python app.py
```

The app starts on `http://0.0.0.0:5000` by default.

## API Usage

### Health check

```http
GET /
```

### Predict

```http
POST /predict
Content-Type: application/json

{
  "text": "Your article or claim text here"
}
```

Response:

- `prediction`: `REAL` or `FAKE`
- `confidence`: model/evidence confidence score
- `K`: `0` when evidence supported the claim, `1` when the LSTM model was used

### Extract text

```http
POST /extract
Content-Type: application/json

{
  "url": "https://example.com/article"
}
```

Response:

- `text`: extracted article text

## Model training

The `model.py` script shows how the LSTM model can be trained and saved as `fake_news_lstm_model.h5` with a `tokenizer.pkl`.

## Notes

- Heavy libraries like TensorFlow and newspaper are loaded lazily to reduce startup time.
- The evidence pipeline is optional and fallbacks to model prediction when it fails.
- Use `gunicorn` for production deployment if desired.
