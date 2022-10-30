import { merge } from "webpack-merge";

import commonConfig from "./webpack.common";
import devConfigs from "./webpack.dev";

// 'env' environment flag from npm script passed as parameter
// allows for dynamically requiring webpack config file
// to merge with a common config file
const configs = (env) => {
  let envConfig;
  if (env.dev) {
    envConfig = devConfigs;
  }

  return merge(commonConfig, envConfig);
};

export default configs;
