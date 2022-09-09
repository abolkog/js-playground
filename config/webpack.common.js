const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
  entry: commonPaths.entryPath,
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: /(node_modules)/,
      //   options: {
      //     emitWarning: process.env.NODE_ENV !== 'production',
      //   },
      // },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: commonPaths.publicPath,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      favicon: commonPaths.favIconPath,
    }),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
