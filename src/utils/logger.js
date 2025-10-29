const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logProgress(current, total, filename) {
  const progress = Math.round((current / total) * 100);
  console.log(`  [${progress}%] ${filename}`);
}

function logSuccess(appName) {
  log('\n✅ App created successfully!', 'green');
  log('\n📋 Quick start:', 'bright');
  console.log(`  cd ${appName}`);
  console.log('  pnpm install');
  console.log('  pnpm run dev:frontend  # or dev:backend');
  log('\n🎯 Available scripts:', 'bright');
  console.log('  pnpm run dev:frontend  - Start frontend + shared watch');
  console.log('  pnpm run dev:backend   - Start backend + shared watch');
  console.log('  pnpm run build         - Build all packages');
  console.log('  pnpm run clean         - Clean all dist folders');
}

module.exports = {
  log,
  logProgress,
  logSuccess
};
