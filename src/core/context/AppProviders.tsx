import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@emotion/react";
import { ThemeProvider as MuiThemeProvider } from "@mui/system";
import { monTheme, GlobalStyle } from "@mon/mon-theme";
import { theme } from "./theme/theme";

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
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={monTheme}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
          </ThemeProvider>
        </MuiThemeProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
};

export default AppProviders;
