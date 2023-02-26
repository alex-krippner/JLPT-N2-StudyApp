import { monTheme } from "@mon/mon-theme";
import { createTheme, ThemeOptions } from "@mui/material";

interface CustomThemeOptions extends ThemeOptions {
  status: {
    danger: React.CSSProperties["color"];
  };
}

export const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          flex: 1,
          ".MuiSvgIcon-root": {
            fontSize: "3rem",
          },
          ":hover": {
            backgroundColor: monTheme.colorOf.buttonHover,
          },
          ":active": {
            backgroundColor: monTheme.colorOf.primaryLight,
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "1.75rem",
          color: monTheme.colorOf.black,
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto Mono",
    h6: {
      color: monTheme.colorOf.black,
    },
  },
  palette: {
    primary: {
      light: monTheme.colorOf.primaryLight,
      main: monTheme.colorOf.primaryMedium,
      dark: monTheme.colorOf.primaryDark,
    },
    surface: {
      main: monTheme.colorOf.surface,
    },
  },
  spacing: 4,
});
