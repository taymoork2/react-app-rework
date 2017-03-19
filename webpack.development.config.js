const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const getClientEnvironment = require('./utils/env');
const paths = require('./utils/paths');
const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      // Note: instead of the default WebpackDevServer client, we use a custom one
      // to bring better experience for Create React App users. You can replace
      // the line below with these two lines if you prefer the stock client:
      // require.resolve('webpack-dev-server/client') + '?/',
      // require.resolve('webpack/hot/dev-server'),
      require.resolve('react-dev-utils/webpackHotDevClient'),
      require.resolve('./utils/polyfills'),
      // require.resolve('react-dev-utils/crashOverlay'),
      paths.appIndexJs,
    ],
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-helmet', 'react-router', 'react-router-dom', 'connected-react-router', 'history', 'redux-thunk', 'react-loadable', 'react-loading', 'redux-persist'],
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'assets/js/[name].js',
    publicPath: publicPath,
  },
  resolve: {
    modules: ['node_modules'].concat(paths.nodePaths),
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
  },
  module: {
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
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/media/[name].[hash:8].[ext]',
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        }],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
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
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
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
      // ** STOP ** Are you adding a new loader?
      // Remember to add the new extension(s) to the "url" loader exclusion list
    ],
  },
  plugins: [
    new DashboardPlugin(),
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3001,
        proxy: 'http://localhost:3000',
        open: false,
      },
      {
        reload: false,
        notify: true,
        tunnel: true,
        xip: true,
        open: false,
      }
    ),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new FlowStatusWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'manifest'],
      filename: 'assets/js/[name].js',
      minChunks: Infinity,
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
