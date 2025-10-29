const fs = require('fs');
const path = require('path');

function validateAppName(name) {
  if (!name) {
    throw new Error('App name is required. Usage: create-fullstack-app <app-name>');
  }

  const invalidChars = /[<>:"/\\|?*\s]/;
  if (invalidChars.test(name)) {
    throw new Error(`Invalid app name "${name}". Avoid spaces and special characters.`);
  }

  return true;
}

function checkDirectoryExists(dirPath) {
  if (fs.existsSync(dirPath)) {
    throw new Error(`Directory "${dirPath}" already exists. Choose a different name or remove the existing directory.`);
  }
}

module.exports = {
  validateAppName,
  checkDirectoryExists
};