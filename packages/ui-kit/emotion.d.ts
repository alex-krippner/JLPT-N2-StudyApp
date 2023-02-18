import "@emotion/react";
import { MonDefaultTheme } from "@mon/mon-theme";

declare module "@emotion/react" {
  export interface Theme extends MonDefaultTheme {}
}
