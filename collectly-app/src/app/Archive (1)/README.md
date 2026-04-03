# Vayu UI (Next.js)

Frontend for Vayu: pollution-aware route discovery and comparison UI with integrated landing page.

## Features

- **Landing Page**: Beautiful marketing page at `/` with animations and feature showcase
- **Main App**: Full-featured pollution-aware navigation at `/app`
- Seamless navigation between landing and app
- Real-time air quality data visualization
- Route comparison with health metrics

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Mapbox GL + Leaflet ecosystem
- Axios for backend integration

## Project Architecture

```
vayu-ui/
├─ app/
│  ├─ page.tsx                     # landing page (home route)
│  ├─ app/page.tsx                 # main app experience
│  └─ api/geocode/route.ts         # proxy to Nominatim geocoding API
├─ components/
│  ├─ landing/                     # landing page components
│  │  ├─ Navbar.tsx
│  │  ├─ HeroSection.tsx
│  │  ├─ DashboardMockup.tsx
│  │  └─ ...
│  ├─ Map.tsx                      # base map + route rendering
│  ├─ SearchBar.tsx                # origin/destination search + suggestions
│  ├─ RouteComparisonPanel.tsx     # route cards and route switching
│  ├─ HealthExposureWidget.tsx     # exposure delta card
│  └─ ...                          # UI/supporting widgets
├─ hooks/
│  ├─ useRoute.ts                  # route fetch lifecycle + dedupe
│  ├─ useGeocoder.ts               # debounced geocoder
│  ├─ useHealthScore.ts            # route exposure calculations
│  └─ useUserLocation.ts           # GPS/manual source of truth
├─ lib/
│  ├─ constants.ts                 # endpoints + app constants
│  └─ exposure.ts                  # pure exposure logic
├─ public/
│  └─ images/                      # landing page assets
├─ Dockerfile
└─ docker-compose.yml
```

## Data Flow

1. **Landing Page** (`/`): User lands on marketing page with feature showcase
2. **Navigate to App**: Click "Try Free", "Find My Clean Route", or "Launch App" buttons
3. **Main App** (`/app`): User sets start/destination in `SearchBar`
4. `useRoute` requests route candidates from Mapbox through `routeService`
5. UI sends all candidates to backend `/score-routes` for AQI scoring
6. Backend returns fully sorted routes; UI renders map + comparison cards + health widgets

## Prerequisites

- Node.js 20+
- npm 10+
- Backend running (`backend-2`) reachable by UI
- **Mapbox Access Token** (free tier available)

## Quick Setup

**See [SETUP.md](./SETUP.md) for detailed setup instructions.**

### TL;DR

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local and add your Mapbox token
cp .env.example .env.local
# Edit .env.local and add: NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here

# 3. Start dev server
npm run dev
```

Get your free Mapbox token at: https://account.mapbox.com/access-tokens/

## Environment Variables

Create `.env.local` in this folder:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token
```

**Important**: Get your free Mapbox token from https://account.mapbox.com/access-tokens/

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## Local Initialization (Team Setup)

```bash
npm install

# Create and configure .env.local (see SETUP.md)
cp .env.example .env.local
# Add your Mapbox token to .env.local

npm run dev
```

Open: `http://localhost:3000` (Landing Page)
App: `http://localhost:3000/app` (Main Application)

**First time setup?** See [SETUP.md](./SETUP.md) for step-by-step instructions.

## Quality Commands

```bash
npm run lint
npm run build
npm run start
```

## Docker

### Build & Run (direct)

```bash
docker build -t vayu-ui .
docker run --rm -p 3000:3000 \
	-e NEXT_PUBLIC_API_URL=http://host.docker.internal:8000 \
	-e NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token \
	vayu-ui
```

### Docker Compose

```bash
docker compose up --build
```

## Notes for Team

- `NEXT_PUBLIC_*` variables are baked into client output at build/runtime boundaries.
- Keep UI endpoint aligned with backend host/port (`NEXT_PUBLIC_API_URL`).
- For same-place-name ambiguity, suggestions show primary + city/state context.

## Troubleshooting

- **No routes shown**: check backend health at `http://localhost:8000/health`.
- **Wrong location selected**: verify geocoder dropdown secondary text and choose full match.
- **Map not loading**: ensure valid `NEXT_PUBLIC_MAPBOX_TOKEN`.
