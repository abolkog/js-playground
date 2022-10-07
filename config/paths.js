const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: path.resolve(__dirname, '../', 'src/index.tsx'),
  templatePath: path.resolve(__dirname, '../', 'public/index.html'),
  favIconPath: path.resolve(__dirname, '../', 'public/favicon.ico'),
};
