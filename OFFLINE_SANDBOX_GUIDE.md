# Collectly Offline Sandbox Guide 📴

This guide explains how to run, test, and develop on the **Collectly** codebase completely offline or during external service CDN outages.

## 🧱 Sandbox Architecture

The offline sandbox works via two primary structural components:

### 1. Frontend Integration Layer (`auth-wrapper.ts`)
Instead of referencing Clerk directly across the application pages and components, all files import from `@/lib/auth-wrapper`. 
- When `NEXT_PUBLIC_MOCK_AUTH=true` is set in `.env.local`, the wrapper transparently substitutes all Clerk hooks and elements with local mock components (`OfflineAuth.tsx`).
- This completely prevents Next.js from injecting or downloading the remote `clerk.browser.js` scripts, bypassing CDN connectivity checks entirely.

### 2. Backend Middleware Fallback (`clerkAuth.js`)
If the Next.js frontend is offline, it generates unsigned mock tokens.
- The Express authentication middleware (`clerkAuth.js`) catches the verification warning and, during development (`NODE_ENV=development`), automatically falls back to manual base64 token payload decoding.
- This allows local SQLite transactions and profile attachments to continue operating completely unimpeded.

## ⚙️ Enabling the Sandbox

1. In the frontend app folder `collectly-app/`, open `.env.local` and add:
   ```env
   NEXT_PUBLIC_MOCK_AUTH=true
   ```
2. Restart the Next.js dev server.
3. Open [http://localhost:3000](http://localhost:3000). You will be instantly logged in as the mock developer profile.
