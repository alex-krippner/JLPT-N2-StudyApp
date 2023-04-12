import { RouterProvider } from "react-router-dom";
import React from "react";
import { monRouter } from "./core/context/RouterProvider";
import AppProviders from "./core/context/AppProviders";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={monRouter} />
    </AppProviders>
  );
}

export default App;
