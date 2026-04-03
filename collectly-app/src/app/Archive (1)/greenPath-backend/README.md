# GreenPath Backend-2 (FastAPI)

AQI-aware routing backend that scores all route candidates and returns them sorted from greenest to most polluted.

## Stack

- Python 3.11+
- FastAPI
- Uvicorn
- HTTPX
- MongoDB (optional but recommended for AQI cache)

## Project Architecture

```
backend-2/
├─ main.py
│  ├─ API app + CORS
│  ├─ Models
│  │  ├─ RouteRequest
│  │  ├─ ScoreRoutesRequest
│  │  ├─ RouteCandidate
│  │  └─ RouteResponse
│  ├─ Integrations
│  │  ├─ Mapbox Directions API
│  │  └─ OpenWeather Air Pollution API
│  ├─ Scoring pipeline
│  │  ├─ sample route points
│  │  ├─ fetch PM2.5 for each sample
│  │  ├─ average per route
│  │  └─ sort by PM2.5 ascending
│  └─ Endpoints
│     ├─ POST /get-clean-route
│     ├─ POST /score-routes
│     └─ GET  /health
├─ requirements.txt
├─ .env / .env.example
├─ Dockerfile
└─ docker-compose.yml
```

## API Endpoints

### `POST /get-clean-route`
Fetches map routes from Mapbox and returns scored routes.

### `POST /score-routes`
Accepts routes sent by frontend, scores all routes, returns all sorted.

### `GET /health`
Health status and dependency summary.

## Environment Variables

Create `.env` file in this folder:

```bash
MAPBOX_ACCESS_TOKEN=your_mapbox_server_token
OPENWEATHER_API_KEY=your_openweather_api_key
MONGODB_URL=mongodb://mongo:27017/greenpath
HOST=0.0.0.0
PORT=8000
```

## Local Initialization (Team Setup)

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Health check:

```bash
curl http://localhost:8000/health
```

## Docker

### Build & Run (direct)

```bash
docker build -t greenpath-backend-2 .
docker run --rm -p 8000:8000 \
  --env-file .env \
  greenpath-backend-2
```

### Docker Compose

```bash
docker compose up --build
```

This compose file starts:

- `greenpath-backend-2` on `:8000`
- `mongo` on `:27017`

## Example Request (`/score-routes`)

```json
{
  "start_lat": 26.85,
  "start_lon": 80.95,
  "end_lat": 26.82,
  "end_lon": 80.93,
  "routes": [
    {
      "geometry": { "type": "LineString", "coordinates": [[80.95, 26.85], [80.93, 26.82]] },
      "duration": 1800,
      "distance": 12000
    }
  ]
}
```

## Troubleshooting

- **`MAPBOX_ACCESS_TOKEN not configured`**: add token to `.env`.
- **All AQI values 0.0**: check `OPENWEATHER_API_KEY`.
- **Mongo disconnected**: backend still runs, but AQI caching is disabled.
