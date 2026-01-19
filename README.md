# TaskFlow SaaS

TaskFlow is a full-stack project management application designed to demonstrate modern web architecture, robust type safety, and secure authentication patterns. Built with Next.js 14 (App Router), TypeScript, and MongoDB, it simulates a production-grade environment using Docker for local infrastructure orchestration.

## Core Technologies

* **Frontend:** Next.js 16, React Server Components, Tailwind CSS, Shadcn/UI
* **Backend:** Next.js Server Actions, Node.js runtime
* **Database:** MongoDB, Mongoose (ODM)
* **Authentication:** NextAuth.js (OAuth + Session Management)
* **Validation:** Zod schemas for runtime data integrity
* **DevOps:** Docker, Docker Compose, Git Hooks (Husky), Commitlint

## Key Features

* **Secure Authentication:** Implementation of NextAuth.js with GitHub OAuth, utilizing secure HTTP-only cookies and session persistence in MongoDB.
* **Role-Based Route Protection:** Centralized middleware configuration to protect sensitive routes (`/dashboard`) and API endpoints from unauthorized access.
* **Type-Safe Server Actions:** Direct mutation of database records using Server Actions, eliminating the need for a separate REST API layer while maintaining strict input validation via Zod.
* **Optimistic UI Updates:** Utilization of React's `useTransition` hook to provide immediate user feedback during asynchronous CRUD operations (Create, Read, Update, Delete).
* **Containerized Infrastructure:** Fully dockerized MongoDB instance ensures a consistent development environment across different machines and operating systems.

## Engineering Decisions

### 1. Server Actions vs. REST API
Instead of a traditional REST API, this project leverages Next.js Server Actions. This choice allows for end-to-end type safety, as the backend function signatures are directly imported into the frontend components. This reduces serialization overhead and simplifies the mental model for state management.

### 2. Validation Strategy
Data integrity is enforced at the application boundary. All inputs—whether from forms or external sources—are parsed through Zod schemas (`src/lib/validations/task.ts`) before touching the database. This prevents invalid data from corrupting the system and provides granular error reporting to the UI.

### 3. Database Schema Design
The data model uses Mongoose with strict typing. The schema includes relationships between Users and Tasks, designed to support future scalability requirements such as complex Role-Based Access Control (RBAC) and team workspaces.

## Getting Started

### Prerequisites
* Node.js (LTS version)
* Docker and Docker Compose
* Git

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Asani-A/saas-demo.git
    cd saas-demo
    ```

2.  **Environment Configuration**
    Create a `.env.local` file in the root directory and add the following credentials:
    ```bash
    # Database
    MONGODB_URI=mongodb://admin:password@127.0.0.1:27017/taskflow?authSource=admin

    # Authentication
    NEXTAUTH_SECRET=your_generated_secret_here
    NEXTAUTH_URL=http://localhost:3000

    # OAuth Providers
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret
    ```

3.  **Start Infrastructure**
    Spin up the MongoDB container using Docker Compose:
    ```bash
    docker compose up -d
    ```

4.  **Install Dependencies**
    ```bash
    npm install
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## Project Structure

* `src/app`: App Router pages and layouts.
* `src/components`: Reusable UI components (Shadcn) and feature-specific logic.
* `src/lib`: Database connections and utility functions.
* `src/models`: Mongoose database schemas.
* `src/types`: TypeScript type definitions and module augmentations.
