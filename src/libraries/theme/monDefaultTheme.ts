import { ColorTheme, SizeTheme } from "./Theme";
import COLORS from "./styleConstants";

export const colorTheme: ColorTheme = {
  black: COLORS.black,
  buttonHover: COLORS.greyLight,
  primaryLight: COLORS.blueLight,
  primaryMedium: COLORS.blueMedium,
  primaryDark: COLORS.blueDark,
  red: COLORS.red,
  scrollbar: COLORS.blueCadet,
  secondaryMedium: COLORS.greenSeaMedium,
  white: COLORS.white,
  whiteMedium: COLORS.whiteMedium,
  whiteDark: COLORS.whiteDark,
};

export const sizeTheme: SizeTheme = {
  borderRadiusContainer: "5px",
  cardFormWidth: "35rem",
  cardTitleLeft: "-1rem",
  cardTitleTop: "35rem",
  fontSmall: "1.75rem",
  fontMedium: "2.5rem",
  fontLarge: "3.5rem",
  fontHuge: "15rem",
  inputHeight: "2rem",
  inputWidth: "5rem",
  paddingLarge: "3rem",
  textSmall: "1rem",
  textMedium: "1.5rem",
};

const monTheme = {
  sizeOf: sizeTheme,
  colorOf: colorTheme,
};

export default monTheme;
