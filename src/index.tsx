import React from "react";
import * as ReactDom from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppProviders from "./core/context/AppProviders";
import { monRouter } from "./core/routing/RouterProvider";

const rootNode = document.getElementById("root");
ReactDom.createRoot(rootNode).render(
  <AppProviders>
    <RouterProvider router={monRouter} />
  </AppProviders>,
);
