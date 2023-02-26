import React from "react";
import { RouterProvider } from "react-router-dom";
import { monRouter } from "./core/routing/RouterProvider";

const App = () => {
  return <RouterProvider router={monRouter} />;
};

export default App;
