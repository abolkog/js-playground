const commonPaths = require('./paths');

module.exports = {
  mode: 'production',
  output: {
    globalObject: 'self',
    filename: '[name].[fullhash].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },
  devtool: 'source-map',
};
