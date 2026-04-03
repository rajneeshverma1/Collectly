# 🚀 Vayu - Running Services

## ✅ Services Status

### Frontend (Next.js)
- **Status**: ✅ Running
- **URL**: http://localhost:3002
- **Landing Page**: http://localhost:3002
- **Main App**: http://localhost:3002/app

### Backend (FastAPI)
- **Status**: ✅ Running  
- **URL**: http://localhost:8000
- **Health Check**: http://localhost:8000/health
- **MongoDB**: ✅ Connected

## 🎯 How to Use

### 1. Access Landing Page
Open your browser and go to:
```
http://localhost:3002
```

You'll see:
- Beautiful animated landing page
- Feature showcase
- Dashboard mockup
- Call-to-action buttons

### 2. Navigate to Main App
Click any of these buttons on landing page:
- "Try Free" (top right)
- "Find My Clean Route" (hero section)
- "Launch App" (bottom CTA)

Or directly visit:
```
http://localhost:3002/app
```

### 3. Use the App
1. **Search for locations**: Type in start and destination
2. **View routes**: App will show multiple route options
3. **Compare pollution**: See AQI data for each route
4. **Choose cleanest route**: Select the route with lowest pollution exposure

## 🔧 Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key_here
```

### Backend (.env)
```env
MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
OPENWEATHER_API_KEY=your_openweather_key_here
MONGODB_URL=mongodb+srv://admin:admin@navigation.v2omejy.mongodb.net/?appName=navigation
PORT=8000
```

## 📊 API Endpoints

### Backend Endpoints
- `GET /health` - Health check
- `POST /score-routes` - Score multiple routes by pollution
- `POST /get-clean-route` - Get cleanest route between two points

### Frontend API Routes
- `GET /api/geocode` - Geocoding proxy to Mapbox

## 🛠️ Development Commands

### Frontend
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Backend
```bash
# Start server
python3 main.py

# Or with uvicorn directly
uvicorn main:app --reload --port 8000
```

## 🔍 Testing the Integration

### Test 1: Landing Page
1. Visit http://localhost:3002
2. Should see animated landing page
3. All sections should load properly

### Test 2: Navigation
1. Click "Try Free" button
2. Should redirect to http://localhost:3002/app
3. Map should load with Mapbox

### Test 3: Route Planning
1. On /app page, enter start location (e.g., "Polytechnic Chauraha")
2. Enter destination (e.g., "SRMU")
3. Click search or press Enter
4. Should see multiple routes with AQI data

### Test 4: Backend Connection
```bash
# Test health endpoint
curl http://localhost:8000/health

# Should return:
# {"status":"healthy","service":"greenpath-backend-2","routing":"Mapbox Directions API","mongodb":"connected"}
```

## 🐛 Troubleshooting

### Frontend Issues
- **Port 3002 instead of 3000**: Port 3000 was busy, app auto-selected 3002
- **Map not loading**: Check Mapbox token in `.env.local`
- **Routes not showing**: Check backend is running at port 8000

### Backend Issues
- **Module not found**: Run `pip3 install -r requirements.txt`
- **MongoDB connection failed**: Check MONGODB_URL in `.env`
- **Port already in use**: Change PORT in `.env`

## 📝 Notes

- Frontend uses port 3002 (auto-selected because 3000 was busy)
- Backend uses port 8000
- Both services must be running for full functionality
- Landing page works without backend
- Main app requires backend for route planning

## 🎉 Success!

Both frontend and backend are successfully running and connected!

**Next Steps:**
1. Test the app by planning a route
2. Explore different features
3. Check the documentation for more details

---

**Happy Coding!** 🚀
