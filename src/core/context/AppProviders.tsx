import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@emotion/react";
import GlobalStyles from "@mui/material/GlobalStyles";
import MuiThemeProvider from "@mui/system/ThemeProvider";
// eslint-disable-next-line import/no-extraneous-dependencies
import { monTheme, globalStyles } from "@mon/mon-theme";
import { theme } from "./theme/theme";

const queryClient = new QueryClient();
function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles styles={{ globalStyles }} />
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={monTheme}>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}

export default AppProviders;
