const path = require('path');
const { validateAppName, checkDirectoryExists } = require('./utils/validation');
const { log, logSuccess } = require('./utils/logger');
const { createDirectories, createFiles } = require('./utils/fileSystem');
const { directories } = require('./config/directories');
const { getRootPackageJson, getWorkspaceYaml } = require('./templates/root');
const { getBackendFiles } = require('./templates/backend');
const { getFrontendFiles } = require('./templates/frontend');
const { getSharedFiles } = require('./templates/shared');
const { getReadme } = require('./templates/readme');

function createApp(appName = 'my-app') {
  try {
    // Валидация
    validateAppName(appName);
    const rootDir = path.join(process.cwd(), appName);
    checkDirectoryExists(rootDir);

    log(`🚀 Creating new fullstack app: ${appName}\n`, 'cyan');

    // Создание директорий
    log('📁 Creating directory structure...', 'bright');
    createDirectories(rootDir, directories);

    // Подготовка файлов
    const backendFiles = getBackendFiles();
    const frontendFiles = getFrontendFiles();
    const sharedFiles = getSharedFiles();

    const allFiles = {
      'package.json': JSON.stringify(getRootPackageJson(appName), null, 2),
      'pnpm-workspace.yaml': getWorkspaceYaml(),
      'README.md': getReadme(appName),
      ...Object.fromEntries(
        Object.entries(backendFiles).map(([k, v]) => [`packages/backend/${k}`, v])
      ),
      ...Object.fromEntries(
        Object.entries(frontendFiles).map(([k, v]) => [`packages/frontend/${k}`, v])
      ),
      ...Object.fromEntries(
        Object.entries(sharedFiles).map(([k, v]) => [`packages/shared/${k}`, v])
      ),
    };

    // Создание файлов
    log('\n📄 Creating files...', 'bright');
    createFiles(rootDir, allFiles);

    // Успех
    logSuccess(appName);

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'reset');
    process.exit(1);
  }
}

module.exports = { createApp };