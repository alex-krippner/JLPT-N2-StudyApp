import "@mui/material/styles/createPalette";

//FIXME: type is not getting found
declare module "@mui/material/styles/createPalette" {
  export interface Palette {
    surface: {
      main: React.CSSProperties["color"];
    };
  }

  export interface PaletteOptions {
    surface: {
      main: React.CSSProperties["color"];
    };
  }
}
