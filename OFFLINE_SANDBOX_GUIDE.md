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

### 3. Payment Gateway Webhook Testing 💳

During offline sandbox development, you can trigger, mock, and test the secure Stripe and Razorpay webhook capture endpoints directly using the following standard terminal `curl` requests (replacing `<INVOICE_UUID>` with a valid ID from your local SQLite instance):

#### Trigger Stripe Simulated Payment:
```bash
curl -X POST http://localhost:5001/api/v1/payments/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d '{
    "type": "checkout.session.completed",
    "data": {
      "object": {
        "id": "cs_test_simulated_webhook_'$(date +%s)'",
        "amount_total": 45000,
        "metadata": {
          "invoiceId": "<INVOICE_UUID>"
        }
      }
    }
  }'
```

#### Trigger Razorpay Simulated Payment:
```bash
curl -X POST http://localhost:5001/api/v1/payments/webhooks/razorpay \
  -H "Content-Type: application/json" \
  -d '{
    "event": "payment.captured",
    "payload": {
      "payment": {
        "entity": {
          "id": "pay_test_simulated_webhook_'$(date +%s)'",
          "amount": 45000,
          "notes": {
            "invoiceId": "<INVOICE_UUID>"
          }
        }
      }
    }
  }'
```
