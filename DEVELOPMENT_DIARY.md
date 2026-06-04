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

