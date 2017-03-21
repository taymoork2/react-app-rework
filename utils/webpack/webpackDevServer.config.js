'use strict';

const config = require('../../webpack.development.config');
const paths = require('../paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';

module.exports = {
  compress: true,
  clientLogLevel: 'none',
  contentBase: paths.appPublic,
  watchContentBase: true,
  hot: true,
  publicPath: config.output.publicPath,
  // quiet: true,
  noInfo: false,
  stats: {
    colors: true,
    version: false,
    timings: false,
    chunks: false,
    chunkModules: true,
    errors: true
  },
  watchOptions: {
    ignored: /node_modules/
  },
  https: protocol === "https",
  host: host,
  overlay: false
};
