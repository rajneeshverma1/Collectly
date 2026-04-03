# Vayu UI - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Mapbox token:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_actual_mapbox_token_here
```

### 3. Get Your Mapbox Token

1. Go to [Mapbox Account](https://account.mapbox.com/)
2. Sign up or log in
3. Navigate to [Access Tokens](https://account.mapbox.com/access-tokens/)
4. Copy your default public token OR create a new one
5. Paste it in `.env.local`

**Note**: The free tier includes 50,000 map loads per month, which is plenty for development!

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at:
- **Landing Page**: http://localhost:3000
- **Main App**: http://localhost:3000/app

## Project Structure

```
vayu-ui/
├── app/
│   ├── page.tsx              # Landing page (/)
│   ├── app/page.tsx          # Main app (/app)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── landing/              # Landing page components
│   └── ...                   # Main app components
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities and constants
├── public/                   # Static assets
└── .env.local               # Environment variables (create this!)
```

## Features

### Landing Page (/)
- Beautiful animated hero section
- Interactive dashboard mockup
- Feature showcase
- Call-to-action buttons linking to main app

### Main App (/app)
- Real-time air quality visualization
- Pollution-aware route planning
- Health exposure metrics
- Interactive map with AQI data

## Troubleshooting

### "Mapbox token is required" Error
- Make sure you created `.env.local` file
- Verify your Mapbox token is correct
- Restart the dev server after adding the token

### Port Already in Use
- The app will automatically use the next available port (e.g., 3001, 3002)
- Check the terminal output for the actual URL

### Backend Not Connected
- Make sure the backend is running at `http://localhost:8000`
- Update `NEXT_PUBLIC_API_URL` in `.env.local` if using a different port

## Building for Production

```bash
npm run build
npm run start
```

## Docker Deployment

```bash
docker compose up --build
```

Make sure to set environment variables in `docker-compose.yml` or pass them at runtime.

## Need Help?

- Check the [README.md](./README.md) for more details
- Review [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md) for integration details
- Visit [Mapbox Documentation](https://docs.mapbox.com/) for API help
