# TaskFlow (SaaS MVP)

> A modern, scalable project management tool designed for agile teams.

![CI/CD Status](https://img.shields.io/badge/build-passing-brightgreen) ![Docker](https://img.shields.io/badge/docker-ready-blue)

## The Mission
To build a full-stack application that demonstrates robust architecture, security best practices (RBAC), and efficient state management.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** MongoDB (via Docker)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Validation:** Zod

## Quick Start
1. **Clone the repo**
2. **Start Infrastructure:** `docker compose up -d`
3. **Install Dependencies:** `npm install`
4. **Run App:** `npm run dev`

## Security & Data Protection
- **Authentication:** Implemented via NextAuth.js with GitHub OAuth.
- **Route Protection:** Used Next.js Proxy for centralized session validation.
- **Type Safety:** Extended NextAuth module definitions to ensure strict typing for User Roles and IDs across the application.
- **Data Integrity:** Implemented Zod schema validation for all incoming API requests (Next Step).
