# Create Fullstack Monorepo

[![npm version](https://img.shields.io/npm/v/create-fullstack-monorepo.svg)](https://www.npmjs.com/package/create-fullstack-monorepo)
[![npm downloads](https://img.shields.io/npm/dm/create-fullstack-monorepo.svg)](https://www.npmjs.com/package/create-fullstack-monorepo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Version 1.2.3** — **CRITICAL FIX!** 🎉

> ⚠️ **Versions before 1.2.3 are broken. Always use `@latest`**

This version resolves the installation error where the `src` directory was missing from the published package, causing `Cannot find module '../src/index.js'` errors.

### What's Fixed in 1.2.3:

- ✅ **Installation works correctly** - `your-package-manager create fullstack-monorepo` now works without errors

### Previous Fixes (1.2.0):

- All known issues resolved, including `build flow`, `workspace linking`, and `shared exports`
- Fixed critical build errors when using TypeScript/Vite
- Improved stability of `dev:backend` and `dev:frontend` processes

---

## 🚀 Quick Start

Create a new fullstack monorepo project with a single command:

**Always use the latest version:**

### Using npx (npm 5.2+)

```bash
npx create-fullstack-monorepo@latest my-app
```

### Using pnpm

```bash
pnpm create fullstack-monorepo@latest my-app
```

### Using npm

```bash
npm create fullstack-monorepo@latest my-app
```

### Using yarn

```bash
yarn create fullstack-monorepo my-app
```

After creation, navigate to your project and install dependencies:

```bash
cd my-app
pnpm install
```

---

## 📦 Project Scripts

### 🚀 Development

- `pnpm run dev:frontend` — runs `shared` (watch:index) and `frontend` (vite dev)
- `pnpm run dev:backend` — runs `shared` (watch:index) and `backend` (dev server)

### 🛠️ Build

- `pnpm run build` — builds all packages with a `build` script
- `pnpm run build:shared` — builds only `shared`
- `pnpm run build:backend` — builds only `backend`
- `pnpm run build:frontend` — builds only `frontend`

### 👀 Preview

- `pnpm run start:frontend` — runs `vite preview` for `frontend` (after build)
- `pnpm run start:backend` — runs `start` for `backend` (after build)

### 🧹 Clean

- `pnpm run clean` — removes all `dist/` folders across packages

---

## 📂 Using the `shared` Package

All variables, types, and utilities declared inside `shared/src` are automatically exported via `shared/index.ts`:

```ts
export * from "./src/**/*";
```

This means any file you create in `shared/src` will be automatically available for import in both `frontend` and `backend`:

```ts
// shared/src/user.ts
export const user = "Dear User";

// backend/src/index.ts or frontend/App.tsx
import { user } from "shared";
```

---

## 🏗️ Project Structure

```
my-app/
├── packages/
│   ├── backend/       # Express.js API server
│   ├── frontend/      # React + Vite application
│   └── shared/        # Shared types, utilities, and constants
├── package.json       # Root workspace configuration
└── pnpm-workspace.yaml
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Shared**: TypeScript with auto-generated exports
- **Package Manager**: pnpm with workspaces
- **Dev Tools**: tsx, concurrently, chokidar

---

## 📝 License

MIT © [Artem23112](https://github.com/Artem23112)

---

## 🐛 Issues & Contributions

Found a bug or want to contribute? Please visit the [GitHub repository](https://github.com/Artem23112/create-fullstack-monorepo).

---

## 📋 Changelog

### [1.2.3] - 2024-10-30

- **Fixed**: Critical installation error - `src/` directory now properly included in npm package
- **Fixed**: Removed `.npmignore` that was preventing `src/` from being published
- **Improved**: Package structure now uses `files` field in package.json for better control

### [1.2.0] - Previous Release

- Fixed build flow, workspace linking, and shared exports
- Improved TypeScript/Vite build stability
- Enhanced dev process reliability
