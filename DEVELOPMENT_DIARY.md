# Collectly Development & Architecture Diary

This diary documents the design patterns, architectural choices, and technical implementation details of the Collectly platform.

## Backend Routing Architecture
The Express backend utilizes modular route handlers mounted under /api/v1 for clean namespace separation.

## SQLite Database System
Sequelize ORM connects to a local SQLite database file in development to allow zero-config offline operations.

## Models & DB Relationships
Defines primary entities including Users, Organizations, Clients, and Invoices with fully mapped constraints.

