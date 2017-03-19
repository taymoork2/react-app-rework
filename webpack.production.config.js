const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const SubresourceIntegrityPlugin = require('webpack-subresource-integrity');
const url = require('url');
const paths = require('./utils/paths');
const getClientEnvironment = require('./utils/env');

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return path + '/';
  } else {
    return path;
  }
}

const homepagePath = require(paths.appPackageJson).homepage;
const homepagePathname = homepagePath ? url.parse(homepagePath).pathname : '/';
const publicPath = ensureSlash(homepagePathname, true);
const shouldUseRelativeAssetPaths = publicPath === './';
const publicUrl = ensureSlash(homepagePathname, false);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'assets/css/[name].[contenthash:8].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths ?
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    app: [
      require.resolve('./utils/polyfills'),
      paths.appIndexJs,
    ],
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-loadable', 'react-helmet', 'react-router', 'react-router-dom', 'connected-react-router', 'history', 'redux-thunk', 'redux-persist']
  },
  output: {
    path: paths.appBuild,
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    crossOriginLoading: 'anonymous',
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
        use: [{
          loader: 'eslint-loader',
          options: {
            configFile: './.eslintrc',
            useEslintrc: false,
          },
        }],
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
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          Object.assign({
            fallback: 'style-loader',
            use: [
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
          }, extractTextPluginOptions),
        ),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          Object.assign({
            fallback: 'style-loader',
            use: [
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
          }, extractTextPluginOptions),
        ),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(
          Object.assign({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: 'less-loader',
              },
            ]
          }, extractTextPluginOptions),
        ),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/media/[name].[hash:8].[ext]',
          },
        }],
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
    new webpack.optimize.DedupePlugin(),
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
      filename: 'assets/css/[name].[contenthash:8].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'manifest'],
      filename: 'assets/js/[name].[hash:8].js',
      minChunks: Infinity,
    }),
    new SubresourceIntegrityPlugin({ // I'm getting integrity errors on my end
      hashFuncNames: ['sha256', 'sha384'],
      enabled: false,
    }),
    new ResourceHintWebpackPlugin(),
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
