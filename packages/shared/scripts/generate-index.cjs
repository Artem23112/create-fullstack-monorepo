const fs = require('fs');
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
      const withoutExt = relativePath.replace(/\.ts$/, '');
      lines.push(`export * from './src/${withoutExt}.js';`);
    }
  }

  return lines;
}

const lines = collectExports(SHARED_DIR);

if (lines.length === 0) {
  console.warn('⚠️ Нет файлов для экспорта. Проверь shared/src');
} else {
  fs.writeFileSync(INDEX_FILE, lines.join('\n') + '\n');
  console.log(`✅ index.ts обновлён: ${lines.length} экспортов`);
}
