function getReadme(appName) {
  return `# ${appName}

Fullstack monorepo application with shared code between frontend and backend.

## Structure

\`\`\`
${appName}/
├── packages/
│   ├── backend/       # Express.js API
│   ├── frontend/      # React + Vite
│   └── shared/        # Shared types and utilities
└── package.json       # Root workspace config
\`\`\`

## Getting Started

\`\`\`bash
# Install dependencies
pnpm install

# Start frontend development
pnpm run dev:frontend

# Start backend development
pnpm run dev:backend
\`\`\`

## Available Scripts

- \`pnpm run dev:frontend\` - Start frontend with shared watch
- \`pnpm run dev:backend\` - Start backend with shared watch
- \`pnpm run build\` - Build all packages
- \`pnpm run clean\` - Remove all dist folders

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Shared**: TypeScript with auto-generated exports
- **Package Manager**: pnpm with workspaces
`;
}

module.exports = { getReadme };