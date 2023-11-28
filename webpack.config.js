/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Variables for project configurations
const project = {
  theme_name: '',
  base_url: '', // local url for BrowserSync
};

module.exports = {
  mode: 'development', // change to 'production' for production
  devtool: 'source-map', // remove for production
  entry: {
    bundle: './src/scripts/scripts.js',
    styles: './src/styles/styles.scss',
    admin: './src/styles/admin.scss',
    // Additional stylesheets/scripts can be added here
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    assetModuleFilename: 'assets/[name][ext][query]',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? `/wp-content/themes/${project.theme_name}/app/`
        : '/',
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 50,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      grid: true,
                      flexbox: true,
                      overrideBrowserslist: [
                        '>0.2%', // global coverage
                        'not dead', // exclude dead browsers
                        'not op_mini all', // exclude Opera Mini
                      ],
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['js'],
      context: './src',
      exclude: 'node_modules',
      fix: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new IgnoreEmitPlugin(['styles.js', 'admin.js']),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      files: ['**/*.php', '**/*.+(png|jpg|jpeg|gif|svg)', '**/*.{woff,woff2}'],
      proxy: project.base_url,
      reloadDelay: 0,
      https: {
        key: path.resolve(process.env.HOME, '.localhost.key'),
        cert: path.resolve(process.env.HOME, '.localhost.crt'),
      },
    }),
  ],
};
