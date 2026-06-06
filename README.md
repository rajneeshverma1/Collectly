# Collectly 🚀 — Premium SaaS Billing & Automated Reminders

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-SQLite%20%7C%20Postgres-blue?logo=sequelize)](https://sequelize.org/)

Collectly is a high-fidelity, premium SaaS billing, invoicing, and payment collection platform built for modern freelancers and agencies. It features sleek glassmorphic dashboards, robust dual-gateway checkouts, custom automated reminder policies, and unified client directory profiles.

## 📋 Table of Contents
1. [🎨 Premium Features & Architecture](#-premium-features--architecture)
2. [ERD Diagram](#-architectural-associations)
3. [📂 Project Directory Structure](#-project-directory-structure)
4. [📡 REST API Endpoint Directory](#-rest-api-endpoint-directory)
5. [⚙️ Fast-Track Developer Setup](#-fast-track-developer-setup)
6. [🛡️ Premium UI Aesthetics](#-premium-ui-aesthetics)
7. [🤝 Contributing](#-contributing)
8. [📄 License](#-license)

## 🎨 Premium Features & Architecture

### 1. Interactive Freelancer Workspace
- **Glassmorphic KPI Cards**: Live outstanding dues, paid this month, upcoming balances, and overdue count.
- **Client Search & Directory**: Dynamic fuzzy search, responsive directory list, and floating onboarding modals.
- **Client Profiles**: Instant ledger aggregation tracking unpaid/paid invoices, visual SMTP communication timelines, and payment histories.
- **Cashflow Analytics**: Visual cash flow charts and real-time activity streams of notifications.

### 2. Dual-Reminders Synchronization Tunnel
- **Automated Policies**: Custom schedule parameters (`reminderBeforeDueDays`, `reminderOnDueDate`, `reminderAfterDueDays`) managed directly in settings. A background daily scheduler worker evaluates unpaid balances, translates states to overdue, and dispatches proximity email notifications.
- **Manual Reminders**: Direct inline checkouts instantly matching templates (upcoming, due-today, overdue) based on due date proximity, writing communication logs, and rendering visual duplicate indicators.
- **Payment Hooks Sync**: Automatically silences scheduled notifications the instant a checkout succeeds.

### 3. Multi-Gateway Payment Checkouts
- Unified checkout forms utilizing **Stripe Connect** and **Razorpay Secure**.
- Webhook signature validation (`constructEvent` & `validateWebhookSignature`) hardens endpoints against spoofing.
- Strict double-payment guards check transaction IDs before persisting ledgers, eliminating duplicate logs or credits.
- Dynamic offline mock checkout simulator for frictionless development.

### 4. Zero-Dependency Developer Offline Sandbox
- High-fidelity **Mock Authentication Sandbox** completely skips Clerk CDN scripts during outages.
- Local SQLite database pre-seeded with mockup parameters enables offline sandbox runs immediately.
