const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const SubresourceIntegrityPlugin = require('webpack-subresource-integrity');
const url = require('url');
const paths = require('./utils/paths');
const getClientEnvironment = require('./utils/env');

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'assets/css/[name].[contenthash:8].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    app: [require.resolve('./utils/polyfills'), paths.appIndexJs],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-immutable',
      'immutable',
      'connected-react-router',
    ],
  },
  output: {
    path: paths.appBuild,
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js',
    publicPath,
    crossOriginLoading: 'anonymous',
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(paths.nodePaths),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        parser: {
          requireEnsure: false,
        },
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              configFile: './.eslintrc',
              useEslintrc: false,
            },
          },
        ],
        include: paths.appSrc,
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.scss$/,
          /\.less$/,
          /\.json$/,
          /\.svg$/,
          /\.graphql$/,
          /\.gql$/,
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    sourceMap: 'inline',
                    plugins: () => [
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9',
                        ],
                      }),
                    ],
                  },
                },
              ],
            },
            extractTextPluginOptions
          )
        ),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            },
            extractTextPluginOptions
          )
        ),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: true,
                  },
                },
                {
                  loader: 'less-loader',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            },
            extractTextPluginOptions
          )
        ),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
    // ** STOP ** Are you adding a new loader?
    // Remember to add the new extension(s) to the "url" loader exclusion list
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourcemap: true,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'manifest'],
      filename: 'assets/js/[name].[hash:8].js',
      minChunks: Infinity,
    }),
    new SubresourceIntegrityPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: false,
    }),
    new ResourceHintWebpackPlugin(),
    new BitBarWebpackProgressPlugin(),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
