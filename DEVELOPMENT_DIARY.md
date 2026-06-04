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

