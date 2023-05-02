import createTheme from "@mui/material/styles/createTheme";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { monTheme } from "@mon/mon-theme";

export const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        message: {
          fontSize: monTheme.sizeOf.fontSmaller,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: monTheme.colorOf.buttonHover,
            borderColor: "transparent",
          },
          "&.MuiButton-sizeSmall": { fontSize: monTheme.sizeOf.fontSmall },
          "&.MuiButton-sizeMedium": { fontSize: monTheme.sizeOf.fontMedium },
          "&.MuiButton-sizeLarge": { fontSize: monTheme.sizeOf.fontLarge },
        },
        outlined: {
          color: monTheme.colorOf.black,
          border: `solid 1px ${monTheme.colorOf.black}`,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
          ".MuiSvgIcon-fontSizeSmall": { fontSize: monTheme.sizeOf.iconSmall },
          ".MuiSvgIcon-fontSizeMedium": {
            fontSize: monTheme.sizeOf.iconMedium,
          },
          ".MuiSvgIcon-fontSizeLarge": { fontSize: monTheme.sizeOf.iconLarge },
          ".MuiTablePagination-displayedRows": {
            fontSize: monTheme.sizeOf.fontSmaller,
          },
          ".MuiTablePagination-selectLabel": {
            fontSize: monTheme.sizeOf.fontSmaller,
          },
          ".MuiTablePagination-toolbar": {
            fontSize: monTheme.sizeOf.fontSmaller,
          },
        },
        columnHeader: {
          fontSize: monTheme.sizeOf.fontSmall,
        },
        row: {
          fontSize: monTheme.sizeOf.fontSmaller,
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
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: monTheme.sizeOf.fontSmaller,
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
    body1: {
      fontSize: monTheme.sizeOf.fontSmall,
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
