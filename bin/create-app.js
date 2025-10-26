#!/usr/bin/env node


const fs = require('fs');
const path = require('path');

function createApp() {
  const appName = process.argv[2] || 'my-app';
  const rootDir = path.join(process.cwd(), appName);
  
  console.log(`🚀 Creating new fullstack app: ${appName}\n`);
  
  // Создаем основную структуру директорий
  const directories = [
    '',
    'packages/backend/src',
    'packages/frontend/src',
    'packages/shared/src',
  ];
  
  console.log('📁 Creating directory structure...');
  directories.forEach(dir => {
    const fullPath = path.join(rootDir, dir);
    fs.mkdirSync(fullPath, { recursive: true });
  });
  // Структура файлов - оставляю пустые файлы по нужным путям
  const files = {
    // Корневые файлы
    'package.json': `{\n  \"name\": ${appName},\n  \"version\": \"1.0.8\",\n  \"description\": \"A fullstack TypeScript monorepo template with React frontend and Node.js backend\",\n  \n  \"scripts\": {\n    \"backend:dev\": \"concurrently -n shared,backend -c cyan,green \\\"pnpm --filter shared watch:index\\\" \\\"pnpm --filter backend dev\\\"\",\n    \"frontend:dev\": \"concurrently -n shared,frontend -c cyan,magenta \\\"pnpm --filter shared watch:index\\\" \\\"pnpm --filter frontend dev\\\"\",\n    \"shared:build\": \"pnpm --filter shared build\"\n  },\n  \"keywords\": [\n    \"fullstack\",\n    \"monorepo\",\n    \"template\",\n    \"react\",\n    \"typescript\",\n    \"nodejs\",\n    \"vite\",\n    \"pnpm\"\n  ],\n  \"author\": \"\",\n  \"devDependencies\": {\n    \"concurrently\": \"^9.2.1\",\n    \"typescript\": \"^5.6.3\"\n  }\n}`,
    'pnpm-workspace.yaml': 'packages:\n  - \'packages/*\'',

    // Backend файлы
    'packages/backend/src/index.ts': 'import express from \'express\';\r\nimport { API_VERSION, greet } from \'shared\';\r\n\r\nconst app = express();\r\nconst PORT = process.env.PORT || 3000;\r\n\r\napp.use(express.json());\r\n\r\napp.get(\'/\', (req, res) => {\r\n  res.json({ \r\n    message: greet(\'Backend\'),\r\n    version: API_VERSION \r\n  });\r\n});\r\n\r\napp.listen(PORT, () => {\r\n  console.log(`Server running on http://localhost:${PORT}`);\r\n});',
    'packages/backend/package.json': '{\r\n  \"name\": \"backend\",\r\n  \"version\": \"1.0.0\",\r\n  \"main\": \"dist/index.js\",\r\n  \"scripts\": {\r\n    \"dev\": \"tsx watch --tsconfig tsconfig.json src/index.ts\",\r\n    \"build\": \"tsc\",\r\n    \"start\": \"node dist/index.js\"\r\n  },\r\n  \"dependencies\": {\r\n    \"express\": \"^4.21.1\",\r\n    \"mongoose\": \"^8.8.3\",\r\n    \"shared\": \"workspace:*\"\r\n  },\r\n  \"devDependencies\": {\r\n    \"@types/express\": \"^5.0.0\",\r\n    \"@types/node\": \"^22.10.1\",\r\n    \"tsx\": \"^4.19.2\",\r\n    \"typescript\": \"^5.6.3\"\r\n  }\r\n}',
    'packages/backend/tsconfig.json': '{\r\n  \"compilerOptions\": {\r\n    \"target\": \"ES2020\",\r\n    \"module\": \"commonjs\",\r\n    \"outDir\": \"./dist\",\r\n     \"rootDir\": \"../..\",\r\n    \"strict\": true,\r\n    \"esModuleInterop\": true,\r\n    \"skipLibCheck\": true,\r\n    \"forceConsistentCasingInFileNames\": true,\r\n    \"resolveJsonModule\": true,\r\n    \"baseUrl\": \".\",\r\n    \"paths\": {\r\n      \"@/*\": [\"./src/*\"],\r\n      \"shared\": [\"../shared/src\"]\r\n    }\r\n  },\r\n  \"include\": [\"src/**/*\"],\r\n  \"exclude\": [\"node_modules\", \"dist\"]\r\n}',

    // Frontend файлы
    'packages/frontend/App.tsx': 'import { API_VERSION, greet } from \'shared\'\r\n\r\nfunction App() {\r\n  return (\r\n    <div style={{ padding: \'2rem\' }}>\r\n      <h1>Frontend App</h1>\r\n      <p>{greet(\'User\')}</p>\r\n      <p>API Version: {API_VERSION}</p>\r\n    </div>\r\n  );\r\n}\r\n\r\nexport default App;',
    'packages/frontend/main.tsx': 'import { StrictMode } from \'react\'\r\nimport { createRoot } from \'react-dom/client\'\r\nimport App from \'./App\'\r\n\r\ncreateRoot(document.getElementById(\'root\')!).render(\r\n  <StrictMode>\r\n    <App />\r\n  </StrictMode>\r\n);',
    'packages/frontend/index.html': '<!doctype html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>Frontend App</title>\r\n  </head>\r\n  <body>\r\n    <div id=\"root\"></div>\r\n    <script type=\"module\" src=\"./main.tsx\"></script>\r\n  </body>\r\n</html>',
    'packages/frontend/package.json': '{\r\n  \"name\": \"frontend\",\r\n  \"private\": true,\r\n  \"version\": \"1.0.0\",\r\n  \"type\": \"module\",\r\n  \"scripts\": {\r\n    \"dev\": \"vite\",\r\n    \"build\": \"tsc -b \&\& vite build\",\r\n    \"preview\": \"vite preview\"\r\n  },\r\n  \"dependencies\": {\r\n    \"react\": \"^18.3.1\",\r\n    \"react-dom\": \"^18.3.1\",\r\n    \"shared\": \"workspace:*\"\r\n  },\r\n  \"devDependencies\": {\r\n    \"@types/react\": \"^18.3.12\",\r\n    \"@types/react-dom\": \"^18.3.1\",\r\n    \"@vitejs/plugin-react\": \"^4.3.4\",\r\n    \"typescript\": \"~5.6.2\",\r\n    \"vite\": \"^6.0.1\"\r\n  }\r\n}',
    'packages/frontend/tsconfig.json': '{\r\n  \"compilerOptions\": {\r\n    \"target\": \"ES2020\",\r\n    \"useDefineForClassFields\": true,\r\n    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"],\r\n    \"module\": \"ESNext\",\r\n    \"skipLibCheck\": true,\r\n    \"moduleResolution\": \"bundler\",\r\n    \"allowImportingTsExtensions\": true,\r\n    \"isolatedModules\": true,\r\n    \"moduleDetection\": \"force\",\r\n    \"noEmit\": true,\r\n    \"jsx\": \"react-jsx\",\r\n    \"strict\": true,\r\n    \"noUnusedLocals\": true,\r\n    \"noUnusedParameters\": true,\r\n    \"noFallthroughCasesInSwitch\": true,\r\n    \"noUncheckedSideEffectImports\": true,\r\n    \"baseUrl\": \".\",\r\n    \"paths\": {\r\n      \"@/*\": [\"./src/*\"],\r\n      \"shared\": [\"../shared/src\"]\r\n    }\r\n  },\r\n  \"include\": [\"src\", \"main.tsx\", \"App.tsx\"]\r\n}',
    'packages/frontend/vite.config.ts': 'import react from \'@vitejs/plugin-react\'\r\nimport { defineConfig } from \'vite\'\r\n\r\nexport default defineConfig({\r\n  plugins: [react()],\r\n  resolve: {\r\n    alias: {\r\n      \'shared\': \'../shared/src\',\r\n      \'@app\': \'/src/app\',\r\n      \'@components\': \'/src/components\',\r\n      \'@features\': \'/src/features\',\r\n      \'@layout\': \'/src/layout\',\r\n      \'@utils\': \'/src/utils\',\r\n      \'@assets\': \'/src/assets\',\r\n      \'@pages\': \'/src/pages\',\r\n    },\r\n  },\r\n});',

    // Shared файлы
    'packages/shared/src/index.ts': 'export const API_VERSION = \'v1\';\r\n\r\nexport interface User {\r\n  id: string;\r\n  name: string;\r\n  email: string;\r\n}\r\n\r\nexport const greet = (name: string): string => {\r\n  return `Hello, ${name}!`;\r\n};',
    'packages/shared/package.json': '{\n  \"name\": \"shared\",\n  \"version\": \"1.0.0\",\n  \"main\": \"./dist/index.js\",\n  \"types\": \"./dist/index.d.ts\",\n  \"scripts\": {\n    \"generate:index\": \"node scripts/generate-index.cjs\",\n    \"watch:index\": \"chokidar \\\"src/**/*.ts\\\" -i \\\"src/index.ts\\\" -c \\\"pnpm generate:index\\\"\"\n  },\n  \"devDependencies\": {\n    \"@types/node\": \"^22.18.12\",\n    \"chokidar-cli\": \"^3.0.0\",\n    \"tsx\": \"^4.20.6\",\n    \"typescript\": \"^5.6.3\"\n  }\n}',
    'packages/shared/tsconfig.json': '{\r\n  \"compilerOptions\": {\r\n    \"target\": \"ES2020\",\r\n    \"module\": \"commonjs\",\r\n    \"declaration\": true,\r\n    \"outDir\": \"./dist\",\r\n    \"strict\": true,\r\n    \"esModuleInterop\": true,\r\n    \"skipLibCheck\": true,\r\n    \"forceConsistentCasingInFileNames\": true\r\n  },\r\n  \"include\": [\"src/**/*\"],\r\n  \"exclude\": [\"node_modules\", \"dist\"]\r\n}',
    'packages/shared/scripts/generate-index.cjs': 'const fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst SHARED_DIR = path.resolve(__dirname, \'../src\');\nconst INDEX_FILE = path.join(SHARED_DIR, \'../index.ts\');\n\nfunction collectExports(dir, base = \'\') {\n  const entries = fs.readdirSync(dir, { withFileTypes: true });\n  const lines = [];\n\n  for (const entry of entries) {\n    const fullPath = path.join(dir, entry.name);\n    const relativePath = path.posix.join(base, entry.name);\n\n    if (entry.isDirectory()) {\n      lines.push(...collectExports(fullPath, relativePath));\n    } else if (\n      entry.isFile() &&\n      entry.name.endsWith(\'.ts\') &&\n      entry.name !== \'index.ts\'\n    ) {\n      const withoutExt = relativePath.replace(/\\.ts$/, \'\');\n      lines.push(`export * from \'./src/${withoutExt}\';`);\n    }\n  }\n\n  return lines;\n}\n\nconst lines = collectExports(SHARED_DIR);\n\nif (lines.length === 0) {\n  console.warn(\'⚠️ Нет файлов для экспорта. Проверь shared/src\');\n} else {\n  fs.writeFileSync(INDEX_FILE, lines.join(\'\\n\') + \'\\n\');\n  console.log(`✅ index.ts обновлён: ${lines.length} экспортов`);\n}'
  };

  // Индикатор прогресса
  console.log('📄 Creating files...');
  const filePaths = Object.keys(files);
  filePaths.forEach((filePath, index) => {
    const fullPath = path.join(rootDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, files[filePath]);
    const progress = Math.round((index + 1) / filePaths.length * 100);
    console.log(`  [${progress}%] ${filePath}`);
  });

  console.log('\n✅ App created successfully!');
  console.log('\n📋 Quick start:');
  console.log(`  cd ${appName}`);
  console.log('  pnpm install');
  console.log('  pnpm run dev');
  console.log('\n🎯 Available scripts:');
  console.log('  pnpm run frontend:dev - Start only frontend');
  console.log('  pnpm run backend:dev  - Start only backend');
  console.log('\n📖 Check README for more details!');
}

createApp();