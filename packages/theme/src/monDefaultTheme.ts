import { ColorTheme } from "./Theme";
import COLORS from "./styleConstants";
import { SizeTheme } from "./Theme";

export const colorTheme: ColorTheme = {
  black: COLORS.black,
  buttonHover: COLORS.greyLight,
  primaryLight: COLORS.uranianBlue,
  primaryMedium: COLORS.blueMedium,
  primaryDark: COLORS.blueDark,
  red: COLORS.red,
  scrollbar: COLORS.blueCadet,
  secondaryMedium: COLORS.greenSeaMedium,
  white: COLORS.white,
  whiteMedium: COLORS.whiteMedium,
  whiteDark: COLORS.whiteDark,
  surface: COLORS.whiteGhost,
};

export const sizeTheme: SizeTheme = {
  borderRadiusContainer: "5px",
  cardFormWidth: "35rem",
  cardTitleLeft: "-1rem",
  cardTitleTop: "35rem",
  fontHuge: "15rem",
  fontLarge: "3.5rem",
  fontLarger: "7.5rem",
  fontMedium: "2.5rem",
  fontSmall: "1.75rem",
  fontSmaller: "1.5rem",
  inputHeight: "2rem",
  inputWidth: "5rem",
  paddingLarge: "3rem",
  textSmall: "1rem",
  textMedium: "1.5rem",
};

export const monTheme: MonDefaultTheme = {
  sizeOf: sizeTheme,
  colorOf: colorTheme,
};

export interface MonDefaultTheme {
  sizeOf: SizeTheme;
  colorOf: ColorTheme;
}
