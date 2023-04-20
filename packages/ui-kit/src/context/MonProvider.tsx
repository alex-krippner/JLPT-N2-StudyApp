import React from "react";
import MuiThemeProvider from "@mui/system/ThemeProvider";
import { ThemeProvider } from "@emotion/react";
import { monTheme, globalStyles } from "@mon/mon-theme";
import GlobalStyles from "@mui/material/GlobalStyles";
import { theme } from "../theme";

export function MonProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles styles={{ globalStyles }} />
      <ThemeProvider theme={monTheme}>{children}</ThemeProvider>
    </MuiThemeProvider>
  );
}
