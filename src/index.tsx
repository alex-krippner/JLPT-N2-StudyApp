import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledComponentsProvider } from "styled-components";

import { createMuiTheme } from "@material-ui/core";
import monTheme from "@mon-theme/monDefaultTheme";
import { store, persistor } from "./state-management/redux/store";

import App from "./App";
import "@mon-theme/swiper-styles.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto Mono", "monospace"].join(","),
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <StyledComponentsProvider theme={monTheme}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledComponentsProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

// @ts-ignore
module.hot.accept();
