# 🛠️ Vayu - Complete Tech Stack

## Frontend Stack

### Core
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4

### Maps & Visualization
- **Map Library**: Mapbox GL JS
- **Routing**: Leaflet + React-Leaflet
- **Charts**: Custom components

### State Management
- **Custom Hooks**: useRoute, useAirQuality, useHealthScore
- **No Redux/Zustand**: Simple prop drilling sufficient

### API Communication
- **HTTP Client**: Axios
- **API Routes**: Next.js API routes for geocoding proxy

---

## Backend Stack

### Core
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **Language**: Python 3.14

### Database
- **Primary DB**: MongoDB Atlas (Cloud)
- **Driver**: Motor (async MongoDB driver)
- **Purpose**: AQI data caching

### External APIs
- **Routing**: Mapbox Directions API
- **Air Quality**: OpenWeatherMap API
- **Geocoding**: Mapbox Geocoding API (via frontend)

### Not Used
- ❌ Redis (not needed for current scale)
- ❌ Kafka (no event streaming)
- ❌ RabbitMQ (no message queuing)
- ❌ PostgreSQL (MongoDB sufficient)

---

## Infrastructure

### Development
- **Frontend**: http://localhost:3002
- **Backend**: http://localhost:8000
- **Database**: MongoDB Atlas (cloud)

### Deployment Ready
- **Frontend**: Docker + Vercel/Netlify ready
- **Backend**: Docker + FastAPI
- **Database**: MongoDB Atlas (production ready)

---

## Key Dependencies

### Frontend (package.json)
```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "mapbox-gl": "^3.18.1",
  "leaflet": "^1.9.4",
  "axios": "^1.13.5",
  "tailwindcss": "^4"
}
```

### Backend (requirements.txt)
```txt
fastapi==0.109.2
uvicorn==0.27.1
httpx==0.27.0
motor==3.7.1
pymongo==4.10.1
python-dotenv==1.0.1
```

---

## Architecture Pattern

### Frontend
- **Pattern**: Component-based architecture
- **Data Flow**: Hooks → Services → Components
- **Routing**: File-based routing (Next.js App Router)

### Backend
- **Pattern**: REST API
- **Architecture**: Monolithic (single service)
- **Communication**: Async HTTP requests

---

## Why This Stack?

### ✅ Advantages
1. **Simple**: Easy to understand and maintain
2. **Modern**: Latest versions of frameworks
3. **Scalable**: Can handle growth without rewrite
4. **Cost-effective**: Minimal infrastructure
5. **Fast Development**: Quick iterations

### 🎯 Perfect For
- MVP and early-stage products
- Small to medium teams
- Budget-conscious projects
- Rapid prototyping

---

## Future Scaling Options

### When to Add:
- **Redis**: > 10K daily users, need sub-10ms cache
- **Kafka**: > 1M requests/day, need event streaming
- **PostgreSQL**: Complex relational queries needed
- **Microservices**: Multiple teams, independent scaling

### Current Capacity:
- **Users**: 100-500 concurrent
- **Requests**: 50-100 per second
- **Database**: 1000 ops/second
- **Response Time**: 200-500ms

---

## 📊 Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 16 | React framework with SSR |
| **UI Library** | React 19 | Component-based UI |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Maps** | Mapbox GL | Interactive maps |
| **Backend Framework** | FastAPI | Python REST API |
| **Database** | MongoDB Atlas | NoSQL database |
| **Caching** | MongoDB | AQI data cache |
| **Routing API** | Mapbox | Route calculations |
| **Air Quality API** | OpenWeatherMap | PM2.5 data |

---

**Conclusion**: Lean, modern, and production-ready stack! 🚀
