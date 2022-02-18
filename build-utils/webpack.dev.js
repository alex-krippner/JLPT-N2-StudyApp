const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    static: './dist',
    hot: true,
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    open: true,
  },
};
