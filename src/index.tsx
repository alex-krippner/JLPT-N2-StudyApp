import React from "react";
import ReactDOM from "react-dom";

import "@mon-theme/swiper-styles.css";

import App from "./App";
import AppProviders from "./context/AppProviders";

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root"),
);

// @ts-ignore
module.hot.accept();
