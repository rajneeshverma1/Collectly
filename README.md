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

## 💳 Payment Gateway System Architecture

Collectly integrates a robust, dual-gateway payment checkout tunnel supporting both **Stripe Connect** and **Razorpay Secure**.

### Key Security & Reliability Features:
1. **Double-Payment Prevention**: Webhook handlers for both Stripe and Razorpay perform atomic checks on the `transactionId` against our database before processing and logging payments. This completely prevents duplicate credits or ledger records caused by network retries or overlapping webhook triggers.
2. **Paid Status Guards**: Transitioning invoice states is guarded dynamically. If an invoice has already been fully paid, webhook events exit early without redundant database writes or logs.
3. **Webhook Signature Validation**: Security-hardened checks verify webhook authenticity in production/live environments.
   - **Stripe**: Utilizes `stripe.webhooks.constructEvent` to validate headers using the `STRIPE_WEBHOOK_SECRET` key.
   - **Razorpay**: Utilizes `Razorpay.validateWebhookSignature` to authenticate payloads using the `RAZORPAY_WEBHOOK_SECRET` key.
   - **Development Fallback**: Gracefully falls back to unverified payload processing if secrets are omitted in development/sandbox environments, keeping development cycles frictionless.
4. **Mock Offline Checkout**: Features a fully-interactive development mode sandbox that simulates secure redirects and webhook callbacks locally when gateways are unconfigured.
