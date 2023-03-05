import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

const isDevelopment = process.env.NODE_ENV !== "production";

const options = {
  extensions: ["js", "jsx", "ts", "tsx"],
  overrideConfigFile: path.resolve(__dirname, "../.eslintrc"),
};

const commonConfigs = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: "ts-loader",
          options: {
            projectReferences: true,
            getCustomTransformers: () => ({
              before: [isDevelopment && ReactRefreshTypeScript()].filter(
                Boolean,
              ),
            }),
            transpileOnly: isDevelopment,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    modules: ["node_modules"],
  },
  output: {
    path: path.join(__dirname, "..", "/dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    new ESLintPlugin(options),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
    new TsconfigPathsPlugin({}),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ],
};

export default commonConfigs;
