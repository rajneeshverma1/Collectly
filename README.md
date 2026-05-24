# Collectly 🚀

Collectly is a premium full-stack AI-assisted invoicing and payment collection platform designed to streamline billing, client onboarding, and automated payment reminders for freelancers and agencies.

## 📂 Repository Structure

- `collectly-app/`: Next.js 16.1.6 (Turbopack) frontend styled with custom responsive CSS.
- `backend/`: Node.js Express server using Sequelize (SQLite/PostgreSQL) and automated reminder schedules.

## 🔒 Offline Sandbox Development Mode

To allow rapid development during external service or CDN outages, Collectly features a robust **Offline Mock Authentication Sandbox**. When enabled:
- The Next.js frontend skips Clerk JS remote CDN script injection entirely.
- The app automatically signs in using a mock local developer profile.
- All backend JWT authentications gracefully resolve through a development decoder fallback.

### Enabling Offline Mode
1. Open `.env.local` in `collectly-app/`.
2. Add:
   ```env
   NEXT_PUBLIC_MOCK_AUTH=true
   ```
3. Restart the Next.js dev server.
