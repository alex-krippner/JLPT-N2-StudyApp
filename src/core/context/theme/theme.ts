import createTheme from "@mui/material/styles/createTheme";
// eslint-disable-next-line import/no-extraneous-dependencies
import { monTheme } from "@mon/mon-theme";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: monTheme.colorOf.buttonHover,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ".MuiSvgIcon-fontSizeLarge": { fontSize: monTheme.sizeOf.iconLarge },
          ".MuiSvgIcon-fontSizeMedium": {
            fontSize: monTheme.sizeOf.iconMedium,
          },
          ".MuiSvgIcon-fontSizeSmall": { fontSize: monTheme.sizeOf.iconSmall },
        },
      },
    },
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
    h4: { color: monTheme.colorOf.black },
    h5: {
      color: monTheme.colorOf.black,
    },
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
