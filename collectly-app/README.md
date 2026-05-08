# Collectly - AI-Powered Billing Automation Platform

Collectly is a full-stack SaaS platform for B2B billing automation. It features a modern landing page, secure authentication, organization onboarding, and a comprehensive dashboard with real-time financial analytics.

## Key Features

### Landing Page
- Premium UI/UX with dark/light hybrid aesthetic
- Interactive workflow cards with animations
- AI-powered insights visualization
- Responsive navigation with scroll-reactive navbar
- Brand logos section (Stripe, Authorize.net, Adyen)

### Authentication & Onboarding
- Email/password authentication with JWT
- Google OAuth integration
- Organization creation (Freelancer/Agency)
- Protected routes with middleware

### Dashboard
- Real-time financial summary cards:
  - Total Outstanding
  - Overdue
  - Due This Week
  - Collected This Month (with trend)
- Invoice management system
- Payment tracking
- Responsive sidebar navigation

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Recharts

### Backend
- Express.js 5
- PostgreSQL (Neon)
- Sequelize ORM
- JWT Authentication
- Passport.js (Google OAuth)
- Helmet (security headers)
- Express Rate Limit

## Getting Started

### Prerequisites
- Node.js 18.x or later
- PostgreSQL database

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file:
   ```
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=your_postgresql_url
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   FRONTEND_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend folder:
   ```bash
   cd collectly-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env.local file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## API Endpoints

### Authentication
- POST /api/v1/users/signup - Register new user
- POST /api/v1/users/login - User login
- GET /api/v1/users/logout - User logout
- GET /api/v1/users/auth/google - Google OAuth
- GET /api/v1/users/me - Get current user

### Organization
- POST /api/v1/users/create-organization - Create organization

### Dashboard
- GET /api/v1/dashboard/summary - Get financial summary
- GET /api/v1/dashboard/activity - Get recent activity

## Project Structure

```
Collectly/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth, validation, error handling
│   ├── models/         # Sequelize models
│   ├── routes/         # API routes
│   └── utils/          # Utilities (rate limiter, AppError)
│
└── collectly-app/
    ├── src/
    │   ├── app/        # Next.js pages
    │   ├── components/ # React components
    │   ├── context/    # Auth context
    │   └── lib/        # Utilities
    └── public/         # Static assets
```

## Security Features

- Input validation with express-validator
- Rate limiting (10 auth attempts/hour)
- Helmet security headers
- JWT token authentication
- Password strength requirements
- SQL injection protection via Sequelize

## License

All rights reserved.
