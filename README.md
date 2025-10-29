# Create Fullstack Monorepo

[![npm version](https://img.shields.io/npm/v/create-fullstack-monorepo.svg)](https://www.npmjs.com/package/create-fullstack-monorepo)
[![npm downloads](https://img.shields.io/npm/dm/create-fullstack-monorepo.svg)](https://www.npmjs.com/package/create-fullstack-monorepo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Version 1.2.0** — **MAJOR FIXES and IMPROVEMENTS!** 🚀
All known issues have been resolved, including the `build flow`, `workspace linking`, and `shared exports`.
***Attention:** This version fixes critical build errors when using TypeScript/Vite and also **improves the stability** of the `dev:backend` and `dev:frontend` processes.*

---

## 🚀 Quick Start

Create a new fullstack monorepo project with a single command:

Preferably, use the latest version (`@latest`).

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

### 👀 Preview

- `pnpm run start:frontend` — runs `vite preview` for `frontend` (after build)
- `pnpm run start:backend` — runs `start` for `backend` (after build)

### 🧹 Clean

- `pnpm run clean` — removes all `dist/` folders across packages

---

## 📂 Using the `shared` Package

All variables, types, and utilities declared inside `shared/src` are automatically exported via `shared/index.ts`:
```ts
export * from './src/**/*';
```