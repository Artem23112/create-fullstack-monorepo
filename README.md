# Create Fullstack App

A fullstack TypeScript monorepo template with React frontend and Node.js backend.

## Quick Start

```bash
pnpm create fullstack-monorepo my-app
cd my-app
pnpm install
pnpm run dev


Structure

my-app/
├── packages/
│   ├── frontend/    # React + Vite + TypeScript
│   ├── backend/     # Node.js + TypeScript  
│   └── shared/      # Shared types and utilities
├── pnpm-workspace.yaml
└── package.json


Scripts

pnpm run dev - Start both frontend and backend in development

pnpm run frontend:dev - Start only frontend

pnpm run backend:dev - Start only backend

pnpm run frontend:build - Build frontend

pnpm run backend:build - Build backend

pnpm run frontend:preview - Preview frontend build

pnpm run backend:start - Start backend in production

pnpm run shared:build - Build shared package