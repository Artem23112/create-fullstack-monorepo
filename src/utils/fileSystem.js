const fs = require('fs');
const path = require('path');
const { logProgress } = require('./logger');

function createDirectories(rootDir, directories) {
  directories.forEach(dir => {
    const fullPath = path.join(rootDir, dir);
    fs.mkdirSync(fullPath, { recursive: true });
  });
}

function createFiles(rootDir, files) {
  const filePaths = Object.keys(files);
  
  filePaths.forEach((filePath, index) => {
    const fullPath = path.join(rootDir, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, files[filePath]);
    logProgress(index + 1, filePaths.length, filePath);
  });
}

module.exports = {
  createDirectories,
  createFiles
};