import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { monTheme, GlobalStyle } from "@mon/mon-theme";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain="dev-o4abqsf2.eu.auth0.com"
        clientId="CnE3o6QEErrkwiCh1nuV6QcFPQonlTsX"
        redirectUri={window.location.origin}
      >
        <GlobalStyle />
        <ThemeProvider theme={monTheme}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
};

export default AppProviders;
