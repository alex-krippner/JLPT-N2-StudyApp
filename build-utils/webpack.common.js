const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


const options = {
  overrideConfigFile: path.resolve(__dirname, '..', '.eslintrc'),
};

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre',

      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            output: 'img',
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          'style-loader', // Inject CSS into the DOM.
          'css-loader', //  interprets @import and url() like import/require() and will resolve them.
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts','.tsx', '.js', ],
  },
  output: {
    path: path.join(__dirname, '..', '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new ESLintPlugin(options),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
      favicon: './assets/img/favicon.png',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
  ],
};
