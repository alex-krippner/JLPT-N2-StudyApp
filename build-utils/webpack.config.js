/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

// 'env' environment flag from npm script passed as parameter
// allows for dynamically requiring webpack config file
// to merge with a common config file
module.exports = (env) => {
  const envConfig = require(`./webpack.${env}.js`);

  return merge(commonConfig, envConfig);
};
