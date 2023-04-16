import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    surface: {
      main: React.CSSProperties["color"];
    };
  }

  interface PaletteOptions {
    surface: {
      main: React.CSSProperties["color"];
    };
  }
}
