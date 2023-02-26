import "@mui/material/styles";

//FIXME: type is not getting found when in root directory
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
