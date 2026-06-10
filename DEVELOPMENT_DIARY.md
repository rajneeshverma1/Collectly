# Collectly Development & Architecture Diary

This diary documents the design patterns, architectural choices, and technical implementation details of the Collectly platform.

## Backend Routing Architecture
The Express backend utilizes modular route handlers mounted under /api/v1 for clean namespace separation.

## SQLite Database System
Sequelize ORM connects to a local SQLite database file in development to allow zero-config offline operations.

## Models & DB Relationships
Defines primary entities including Users, Organizations, Clients, and Invoices with fully mapped constraints.

## Middleware Pipeline
Includes rate limiters, CORS handlers, unified error interceptors, and JWT token validators.

## Invoice Automation Logic
Invoices are created in sent status and transition to paid or overdue based on transaction callbacks.

## Client-Side Next.js Architecture
Uses Next.js App Router with layout segmentation for public pay-portals vs protected dashboard screens.

## Glassmorphic Styling System
Employs high-contrast dark color palettes with border-white/10 and backdrop-blur styling classes.

## PDF Generation Hook
Uses jsPDF and jspdf-autotable to compile transaction rows into printable layout documents dynamically.

## Offline Sandbox Strategy
Uses a NEXT_PUBLIC_MOCK_AUTH flag to bypass Clerk CDN loads and execute dashboard tasks offline.

## Mock Authentication Provider
MockClerkProvider mimics UserButton and useUser hooks, maintaining login state in localStorage.

## Local Webhook Simulations
Documented local curl triggers simulating Stripe and Razorpay payment capture events.

## Stripe Integration API
Utilizes checkout.session.completed webhook structures to credit client invoices upon payment.

## Razorpay API Schema
Processes razorpayKeyId signatures and webhook body payloads to confirm local transactions.

## Automated Email Reminders
Integrates NodeMailer (or mock fallbacks) to send payment reminder emails on schedule.

## Framer Motion Animations
Integrates exit and entry animations for modal displays and list updates using AnimatePresence.

## Reminder Schedule Worker
Starts a background worker interval running every 12 hours to flag overdue invoices.

## Testing & Verification
Ensures type safety across the application using npx tsc compiler before commit.

## Production Target Environment
Configured for deployment with environment variable injection and secure SSL redirects.

## Security Best Practices
Implements strict HTTP headers, CORS configurations, rate-limiting on sensitive endpoints, and encrypted mock JWT signatures in development.

## Data Validation & Sanitization
Leverages Sequelize schema constraints (e.g. isEmail, allowNull) and express-level check pipelines to ensure incoming request data is sanitized before database insertions.

## Performance Optimization
Optimizes database query overhead by using selective model attributes projections and defining index hooks on foreign key references (e.g. organizationId, createdBy).

## Developer Operations Workflow
Documents processes for clearing local SQLite lockfiles, solving Next.js port conflicts, and checking types with the TypeScript compiler (tsc).

## Future Roadmap
Planned milestones include Twilio Voice/SMS real-time AI conversation integrations, automated Stripe payout reconciliation, and interactive chart visualizations.


## Frontend State Management Hook
Maintains dashboard context using standard React Context and custom `useAuth` wrappers.

## Global Custom Theme Configurations
Uses CSS custom variables for glassmorphism tokens, border opacity, and color palette schemes.

## Database Migration Strategy
Applies Sequelize migration scripts to handle incremental PostgreSQL schema updates in production.

## Unified API Request Handler
Standardizes fetch calls with authorization header attachments and custom error parsing.

## SMTP Mail Template Engine
Compiles HTML emails for payment notifications, receipts, and invoice links.

## Double-Payment Guard Logic
Inspects transaction tables before processing payment success webhooks to prevent duplicate credits.

## Interactive Dashboard Charts
Renders financial statistics using lightweight CSS/SVG charting modules for smooth scaling.

## Client Search Indexing
Maintains local search arrays to enable instant client directory filtering and matching.

## Organization Onboarding Flow
Coordinates registration steps to setup organizations and configure payment connection keys.

## Invoice Lifecycle State Machine
Restricts invoice status updates to valid transitions (e.g. from draft to sent, paid, or overdue).

## Local Sandbox Database Seeder
Populates SQLite with realistic mock data for local offline developer evaluation.

## Helmet Header Protections
Uses security middleware configurations to harden backend responses against XSS attacks.

## Express Rate Limiting Policies
Applies request rate-limit buckets to secure sensitive endpoints against brute-force attempts.

## Custom SMTP Relay Security
Implements secure SMTP connection layers using SSL/TLS configurations.

## Clerk JWT Decryption Hook
Decodes external authentication tokens inside Express routing middleware.

## Razorpay Signature HMAC Verification
Computes SHA256 HMAC values to validate payload origins from Razorpay servers.

## Stripe Webhook Cryptographic Handshake
Constructs Stripe events securely using official SDK verification methods.

## Next.js Turbopack Configurations
Optimizes build setup flags to speed up local hot-module reloading during development.

## Sequelize Database Connection Pool
Implements database connection recycling to maintain backend stability under load.

## Global Application Error Handler
Intercepts server exceptions to output structured, user-friendly JSON messages.

## Dynamic YC Light Theme Custom CSS Variables
Implements dynamic CSS custom variables mapping to soft, low-glare silver-grey canvas backgrounds and high-contrast charcoal typography.

## Dynamic Invoices Form Modals Theme Conversion
Redesigns the Create Invoice and Record Payment dialogs from dark-themed boxes to high-contrast white card segments.

## Client Deck Onboard Directory Theme Restyle
Overhauls client listings, directory filters, and search bar inputs to match the silver-grey design guidelines.

## Analytics Page Responsive Recharts Visual Settings
Configures the financial analytics line charts and tooltips to support clean, light-mode background and grid borders.

## Credentials and Reminders Settings Layout Overhaul
Aligns settings page credentials inputs, connector indicators, and reminder configuration options with YC styling.

## Client Checkout Pay Portal Design Integration
Updates public payment checkout screens to feature clean, light-grey boxes and high-contrast transaction logs.

## Sidebar Navigation Active State Indicators
Implements active black menu highlights, category markers, and profile widget cards inside the main dashboard sidebar.

## Dashboard Header Dynamic Payments Notification System
Implements a real-time polling webhook listener filtering successful full-payment transactions into an animated notifications drawer.
