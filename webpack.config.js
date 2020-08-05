const path = require('path');
const webpack = require('webpack');

module.exports = {
  // (1) Use the src/index.js file as entry point to bundle it. If the src/index.js file imports other JavaScript files, bundle them as well.

  entry: './src/index.js',

  module: {
    rules: [
      {
        // Include Babel loader in build process on .js files; exclude the node modules folder
        // Babel loader webpack configuration also requires Babel configuration see https://babeljs.io/docs/en/configuration
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  // (2) The bundled source code files shall result in a bundle.js file in the /dist folder.
  output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  // (3) The /dist folder will be used to serve our application to the browser.
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};
