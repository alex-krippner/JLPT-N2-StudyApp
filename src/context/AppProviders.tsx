import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledComponentsProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import monTheme from "@mon-theme/monDefaultTheme";
import { store, persistor } from "../state-management/redux/store";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto Mono", "monospace"].join(","),
  },
});

const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <Auth0Provider
    domain="dev-o4abqsf2.eu.auth0.com"
    clientId="CnE3o6QEErrkwiCh1nuV6QcFPQonlTsX"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StyledComponentsProvider theme={monTheme}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>{children}</BrowserRouter>
          </ThemeProvider>
        </StyledComponentsProvider>
      </PersistGate>
    </Provider>
  </Auth0Provider>
);

export default AppProviders;
