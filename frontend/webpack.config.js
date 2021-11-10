const webpack = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = dir => path.join(__dirname, dir);

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

const WebpackDefinePluginConfig = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(env),
  },
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: resolve('public/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: [
    resolve('public/index.css'),
    resolve('src/index.js'),
  ],
  output: {
    filename: isDev ? '[name].js' : '[name].[fullhash].js',
    path: resolve('dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    modules: ['node_modules', resolve('src'), resolve('public')]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'icons/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)|ttf|eot|otf)?(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    WebpackDefinePluginConfig,
  ]
};
