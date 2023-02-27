import React from "react";
import * as ReactDom from "react-dom/client";
import App from "./App";
import AppProviders from "./core/context/AppProviders";

const rootNode = document.getElementById("root");
ReactDom.createRoot(rootNode).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
