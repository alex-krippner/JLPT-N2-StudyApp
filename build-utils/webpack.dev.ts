import webpack from "webpack";

const devConfigs = {
  mode: "development",
  devtool: "eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    static: "../dist",
    hot: true,
    host: "localhost",
    port: 8081,
    historyApiFallback: true,
    open: true,
  },
};

export default devConfigs;
