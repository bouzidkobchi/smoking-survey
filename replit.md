# Smoking Survey Application

## Overview

This is a full-stack web application designed to collect and display smoking-related survey data. The application has two main interfaces: a user-facing survey form (in Arabic) and an administrative results dashboard for healthcare providers to view aggregated survey responses. Built with React, Express, and TypeScript, it uses a modern component-based architecture with shadcn/ui components and supports both dark and light themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Client-side routing using Wouter (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and API data fetching

**UI Component System**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Support for both light and dark themes with CSS variables
- Responsive design with mobile-first approach

**Design Decisions**
- Component library choice: shadcn/ui was chosen for its accessibility, customizability, and modern design patterns
- Theme implementation: CSS variables enable dynamic theme switching without JavaScript overhead
- Form handling: React Hook Form with Zod validation for type-safe form state management

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript throughout for type safety
- ESM (ES Modules) module system

**Data Storage Strategy**
- In-memory storage implementation (`MemStorage` class) for development/demo purposes
- Abstracted storage interface (`IStorage`) allows easy swapping to persistent storage
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver) for production use
- Schema defined with Drizzle and validated with Zod

**API Design**
- RESTful endpoints:
  - `POST /api/surveys` - Submit new survey responses
  - `GET /api/surveys` - Retrieve all surveys (admin)
  - `GET /api/surveys/:id` - Retrieve specific survey by ID
- Request/response validation using Zod schemas
- Centralized error handling middleware

**Architecture Rationale**
- Memory storage for rapid prototyping; interface abstraction enables seamless migration to PostgreSQL
- Drizzle ORM provides type-safe database queries and migrations
- Separation of concerns: storage layer is abstracted from route handlers

### Page Structure

**User Survey Page (`/`)**
- Multi-section form collecting demographic data, smoking habits, health awareness, and cessation intentions
- Conditional field rendering based on smoking status (current vs. ex-smoker)
- Form validation and submission with user feedback via toasts

**Admin Results Page (`/results`)**
- Dashboard displaying aggregated survey statistics
- Visual data representation (demographics, smoking patterns, health impacts)
- Real-time data fetching with loading and error states

### State Management

**Client State**
- React Query manages all server state (surveys data)
- Local component state for form inputs and UI interactions
- Theme state persisted in localStorage

**Server State**
- In-memory Map structure stores survey responses (development)
- Survey data includes comprehensive fields: demographics, smoking history, health awareness, quit intentions

### Schema Design

**Survey Data Model**
- Core demographics: gender, age, marital status, education, occupation, residence
- Smoking status: boolean flag determining conditional field requirements
- Current smokers: smoking history, tobacco type, frequency, quit attempts
- Ex-smokers: quit duration, reasons, difficulty, relapse history
- Health data: chronic symptoms, doctor visits, family history
- Awareness: disease knowledge, information sources
- Open-ended feedback fields

**Validation Strategy**
- Zod schemas define expected data shapes at runtime
- TypeScript types derived from Drizzle schema for compile-time safety
- Drizzle-Zod integration ensures database and validation schemas stay synchronized

## External Dependencies

### Database & ORM
- **Neon Serverless PostgreSQL** (`@neondatabase/serverless`): Serverless PostgreSQL provider
- **Drizzle ORM** (`drizzle-orm`, `drizzle-kit`): Type-safe ORM with schema migrations
- **Drizzle-Zod** (`drizzle-zod`): Automatic Zod schema generation from Drizzle schemas

### UI Component Libraries
- **Radix UI**: Headless component primitives (dialogs, dropdowns, forms, etc.)
- **shadcn/ui**: Pre-styled components built on Radix UI
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework

### Form Management
- **React Hook Form**: Performant form state management
- **Zod**: Schema validation library
- **@hookform/resolvers**: Integrates Zod with React Hook Form

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across the stack
- **ESBuild**: JavaScript/TypeScript bundler for production builds

### Session Management
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used in current implementation)

### Routing & Data Fetching
- **Wouter**: Minimalist client-side router
- **TanStack Query**: Async state management for API calls

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit code intelligence
- **@replit/vite-plugin-dev-banner**: Development mode indicator