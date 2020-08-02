const commonPaths = require('./paths');

module.exports = {
  mode: 'production',
  output: {
    globalObject: 'self',
    filename: '[name].[hash].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },

  devtool: 'source-map',
};
