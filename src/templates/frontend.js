function getFrontendFiles() {
  return {
    'App.tsx': `import { user } from 'shared'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Frontend App</h1>
      <p>Hello, {user}!</p>
      <p>API Version: 1.0.0</p>
    </div>
  );
}

export default App;`,

    'main.tsx': `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,

    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Frontend App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>`,

    'package.json': JSON.stringify({
      name: "frontend",
      type: "module",
      scripts: {
        "dev": "vite",
        "prebuild": "rimraf dist",
        "build": "tsc -b && vite build",
        "preview": "vite preview"
      },
      dependencies: {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "shared": "workspace:*"
      },
      devDependencies: {
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.4",
        "typescript": "~5.6.2",
        "vite": "^6.0.1"
      }
    }, null, 2),

    'tsconfig.json': JSON.stringify({
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        isolatedModules: true,
        moduleDetection: "force",
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedSideEffectImports: true,
        paths: {
          "@/*": ["./src/*"],
          "shared": ["../shared/*"]
        }
      },
      include: ["src", "main.tsx", "App.tsx"]
    }, null, 2),

    'vite.config.ts': `import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'shared': '../shared/',
      '@app': '/src/app',
      '@components': '/src/components',
      '@features': '/src/features',
      '@layout': '/src/layout',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
    },
  },
});`
  };
}

module.exports = { getFrontendFiles };

