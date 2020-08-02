const { merge } = require('webpack-merge');
const common = require('./config/webpack.common');

const envs = {
  development: 'dev',
  production: 'prod',
};

const env = envs[process.env.NODE_ENV || 'development'];
/* eslint-disable import/no-dynamic-require */
const envConfig = require(`./config/webpack.${env}.js`);
module.exports = merge(common, envConfig);
