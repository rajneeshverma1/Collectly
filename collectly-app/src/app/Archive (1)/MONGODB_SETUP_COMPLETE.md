# ✅ MongoDB Docker Setup - Complete!

## 🎉 Successfully Configured

### Services Running

1. **MongoDB** (Docker Container)
   - Container: `greenpath-mongo`
   - Port: `27017`
   - Database: `greenpath`
   - Status: ✅ Running

2. **Backend** (Python/FastAPI)
   - Port: `8000`
   - Connection: `mongodb://localhost:27017/greenpath`
   - Status: ✅ Connected

3. **Frontend** (Next.js)
   - Port: `3002`
   - Status: ✅ Running

---

## 📊 Database Structure

### Collections Created

#### 1. `aqi_cache` (Primary Collection)
**Purpose**: Cache air quality data from OpenWeatherMap API

**Schema**:
```javascript
{
  location: {
    type: "Point",              // GeoJSON type
    coordinates: [lon, lat]     // [longitude, latitude]
  },
  pm2_5: 142.5,                 // PM2.5 value (double)
  timestamp: ISODate("...")     // When data was fetched
}
```

**Indexes**:
- `location_2dsphere`: Geospatial index for location queries
- `timestamp_ttl`: TTL index (auto-delete after 1 hour)
- `location_timestamp`: Compound index for efficient queries
- `_id_`: Default MongoDB index

**Sample Data**: 4 records for Lucknow locations

---

#### 2. `routes_cache` (Future Use)
**Purpose**: Cache calculated routes to reduce API calls

**Schema**:
```javascript
{
  route_id: "start_lat_lon-end_lat_lon",  // Unique identifier
  start: { lat: 26.8467, lon: 80.9462 },
  end: { lat: 26.8085, lon: 81.0049 },
  routes: [...],                            // Array of scored routes
  timestamp: ISODate("...")                 // When cached
}
```

**Indexes**:
- `route_id_unique`: Unique index on route_id
- `routes_ttl`: TTL index (auto-delete after 30 minutes)

---

#### 3. `user_preferences` (Future Use)
**Purpose**: Store user settings and favorite locations

**Schema**:
```javascript
{
  user_id: "user_123",
  favorite_locations: [
    { name: "Home", lat: 26.8467, lon: 80.9462 },
    { name: "Office", lat: 26.8085, lon: 81.0049 }
  ],
  health_profile: {
    is_vulnerable: false,
    conditions: ["asthma", "copd"]
  },
  created_at: ISODate("..."),
  updated_at: ISODate("...")
}
```

**Indexes**:
- `user_id_unique`: Unique index on user_id

---

## 🔧 Configuration Files

### Backend `.env`
```env
MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
OPENWEATHER_API_KEY=your_openweather_key_here
MONGODB_URL=mongodb://localhost:27017/greenpath
PORT=8000
```

### Docker Compose
Location: `greenPath-backend/docker-compose.yml`
- MongoDB service with health checks
- Backend service with dependency on MongoDB
- Persistent volume for data
- Network isolation

### Initialization Script
Location: `greenPath-backend/mongo-init/01-init-db.js`
- Creates all collections with schema validation
- Creates all indexes
- Inserts sample data
- Verifies setup

---

## 🚀 How to Use

### Start Services

```bash
# Start MongoDB (already running)
docker start greenpath-mongo

# Start Backend (already running)
python3 greenPath-backend/main.py

# Start Frontend (already running)
npm run dev
```

### Stop Services

```bash
# Stop backend
# Press Ctrl+C in terminal

# Stop MongoDB
docker stop greenpath-mongo

# Stop frontend
# Press Ctrl+C in terminal
```

### Restart MongoDB

```bash
docker restart greenpath-mongo
```

---

## 📝 MongoDB Commands

### Connect to MongoDB

```bash
# Using Docker exec
docker exec -it greenpath-mongo mongosh greenpath

# Using local mongosh (if installed)
mongosh mongodb://localhost:27017/greenpath
```

### Useful Queries

```javascript
// View all collections
db.getCollectionNames()

// Count AQI records
db.aqi_cache.countDocuments()

// View sample AQI data
db.aqi_cache.find().limit(5)

// Find AQI near a location (within 5km)
db.aqi_cache.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [80.9462, 26.8467]
      },
      $maxDistance: 5000  // 5km in meters
    }
  }
})

// View indexes
db.aqi_cache.getIndexes()

// Database statistics
db.stats()

// Collection statistics
db.aqi_cache.stats()
```

---

## 🔍 Verification

### Check MongoDB Status

```bash
docker ps | grep greenpath-mongo
```

### Check Backend Connection

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "greenpath-backend-2",
  "routing": "Mapbox Directions API",
  "mongodb": "connected"
}
```

### Check Collections

```bash
docker exec greenpath-mongo mongosh greenpath --quiet --eval "db.getCollectionNames()"
```

Expected output:
```
[ 'routes_cache', 'user_preferences', 'aqi_cache' ]
```

---

## 📊 Current Data

### AQI Cache
- **Records**: 4 sample locations in Lucknow
- **Locations**:
  1. [80.9462, 26.8467] - PM2.5: 142.5
  2. [80.9168, 26.8550] - PM2.5: 248.3
  3. [81.0049, 26.8085] - PM2.5: 89.7
  4. [80.9750, 26.8500] - PM2.5: 65.2

### Routes Cache
- **Records**: 0 (will be populated when routes are requested)

### User Preferences
- **Records**: 0 (will be populated when users save preferences)

---

## 🎯 Features

### Auto-Expiration (TTL)
- **AQI Cache**: Data expires after 1 hour
- **Routes Cache**: Data expires after 30 minutes
- MongoDB automatically deletes expired documents

### Geospatial Queries
- Find AQI data near a location
- Calculate distance between points
- Efficient location-based searches

### Schema Validation
- Ensures data integrity
- Prevents invalid data insertion
- Type checking on all fields

---

## 🔧 Maintenance

### Backup Database

```bash
# Backup to file
docker exec greenpath-mongo mongodump --db greenpath --out /tmp/backup

# Copy backup from container
docker cp greenpath-mongo:/tmp/backup ./mongodb-backup
```

### Restore Database

```bash
# Copy backup to container
docker cp ./mongodb-backup greenpath-mongo:/tmp/backup

# Restore from backup
docker exec greenpath-mongo mongorestore --db greenpath /tmp/backup/greenpath
```

### Clear Cache

```bash
# Clear AQI cache
docker exec greenpath-mongo mongosh greenpath --eval "db.aqi_cache.deleteMany({})"

# Clear routes cache
docker exec greenpath-mongo mongosh greenpath --eval "db.routes_cache.deleteMany({})"
```

### View Logs

```bash
# MongoDB logs
docker logs greenpath-mongo

# Follow logs
docker logs -f greenpath-mongo
```

---

## 🚨 Troubleshooting

### MongoDB Not Starting

```bash
# Check if port 27017 is already in use
lsof -i :27017

# Remove existing container
docker rm -f greenpath-mongo

# Start fresh
docker run --name greenpath-mongo -p 27017:27017 -d mongo:7
```

### Backend Can't Connect

1. Check MongoDB is running: `docker ps | grep mongo`
2. Check connection string in `.env`
3. Restart backend

### Data Not Persisting

- Current setup doesn't use volumes (data lost on container restart)
- To persist data, use Docker Compose with volumes

---

## 📈 Next Steps

### Production Deployment

1. **Add Authentication**
   ```bash
   docker run --name greenpath-mongo \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=secure_password \
     -p 27017:27017 -d mongo:7
   ```

2. **Use Docker Compose**
   ```bash
   cd greenPath-backend
   docker compose up -d
   ```

3. **Add Persistent Volumes**
   - Already configured in docker-compose.yml
   - Data survives container restarts

4. **Enable Monitoring**
   - Add MongoDB monitoring tools
   - Set up alerts for disk space
   - Monitor query performance

---

## ✅ Summary

**What's Working:**
- ✅ MongoDB running in Docker
- ✅ 3 collections created with schema validation
- ✅ 7 indexes created for performance
- ✅ 4 sample AQI records inserted
- ✅ Backend connected to MongoDB
- ✅ TTL indexes for auto-cleanup
- ✅ Geospatial indexing for location queries

**Ready for:**
- ✅ Development
- ✅ Testing
- ✅ Production (with authentication)

---

**All systems operational! 🚀**
