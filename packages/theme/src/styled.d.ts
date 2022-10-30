import { ColorTheme, SizeTheme } from "./Theme";

declare module "styled-components" {
  export interface DefaultTheme {
    sizeOf: SizeTheme;
    colorOf: ColorTheme;
  }
}
