# Create Fullstack Monorepo

[![npm version](https://img.shields.io/npm/v/create-fullstack-monorepo.svg)](https://www.npmjs.com/package/create-fullstack-monorepo)
[![npm downloads](https://img.shields.io/npm/dm/create-fullstack-monorepo.svg)](https://www.npmjs.com/package/create-fullstack-monorepo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Version **1.0.16** — all known issues have been resolved, including build flow, workspace linking, and shared exports.

---

## 🚀 Quick Start

Create a new fullstack monorepo project with a single command:

### Using npx (npm 5.2+)
```bash
npx create-fullstack-monorepo my-app
```

### Using pnpm
```bash
pnpm create fullstack-monorepo my-app
```

### Using npm
```bash
npm create fullstack-monorepo my-app
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

### 🧹 Clean

- `pnpm run clean` — removes all `dist/` folders across packages

### 👀 Preview

- `pnpm run start:frontend` — runs `vite preview` for `frontend` (after build)

---

## 📂 Using the `shared` Package

All variables, types, and utilities declared inside `shared/src` are automatically exported via `shared/index.ts`:
```ts
export * from './src/**/*';
```