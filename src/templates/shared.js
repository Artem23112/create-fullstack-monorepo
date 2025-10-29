function getSharedFiles() {
  return {
    "package.json": JSON.stringify(
      {
        name: "shared",
        type: "module",
        main: "./dist/index.js",
        types: "./dist/index.d.ts",
        scripts: {
          prebuild: "rimraf dist",
          build: "tsc -b",
          "generate:index": "node scripts/generate-index.cjs",
          "watch:index":
            'chokidar "src/**/*.ts" -i "src/index.ts" -c "pnpm generate:index"',
        },
        devDependencies: {
          "@types/node": "^22.18.12",
          "chokidar-cli": "^3.0.0",
          tsx: "^4.20.6",
          typescript: "^5.6.3",
        },
      },
      null,
      2,
    ),

    "tsconfig.json": JSON.stringify(
      {
        compilerOptions: {
          module: "ESNext",
          target: "ES2020",
          moduleResolution: "bundler",
          isolatedModules: true,
          esModuleInterop: true,
          declaration: true,
          outDir: "./dist",
          strict: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
        },
        include: ["src/**/*", "index.ts"],
        exclude: ["node_modules", "dist"],
      },
      null,
      2,
    ),

    "scripts/generate-index.cjs": `const fs = require('fs');
const path = require('path');

const SHARED_DIR = path.resolve(__dirname, '../src');
const INDEX_FILE = path.join(SHARED_DIR, '../index.ts');

function collectExports(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const lines = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.posix.join(base, entry.name);

    if (entry.isDirectory()) {
      lines.push(...collectExports(fullPath, relativePath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.ts') &&
      entry.name !== 'index.ts'
    ) {
      const withoutExt = relativePath.replace(/\\.ts$/, '');
      lines.push(\`export * from './src/\${withoutExt}.js';\`);
    }
  }

  return lines;
}

const lines = collectExports(SHARED_DIR);

if (lines.length === 0) {
  console.warn('⚠️ No files for export. Check shared/src');
} else {
  fs.writeFileSync(INDEX_FILE, lines.join('\\n') + '\\n');
  console.log(\`✅ index.ts updated: \${lines.length} exports\`);
}`,

    "index.ts": `export * from './src/user.js';\n`,
    "src/user.ts": `export const user = 'Dear User'`,
  };
}

module.exports = { getSharedFiles };
