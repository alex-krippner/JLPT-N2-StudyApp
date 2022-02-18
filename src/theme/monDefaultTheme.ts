import { ColorTheme, SizeTheme } from './Theme';
import COLORS from './styleConstants';

export const colorTheme: ColorTheme = {
  primaryLight: COLORS.blueLight,
  primaryMedium: COLORS.blueMedium,
  primaryDark: COLORS.blueDark,
  scrollbar: COLORS.blueCadet,
  secondaryMedium: COLORS.greenSeaMedium,
  white: COLORS.white,
  whiteMedium: COLORS.whiteMedium,
  whiteDark: COLORS.whiteDark,
};

export const sizeTheme: SizeTheme = {
  cardFormWidth: '35rem',
  cardTitleLeft: '-1rem',
  cardTitleTop: '35rem',
  fontSmall: '1.75rem',
  fontMedium: '2.5rem',
  fontLarge: '3.5rem',
  fontHuge: '15rem',
  paddingLarge: '3rem',
};

const monTheme = {
  sizeOf: sizeTheme,
  colorOf: colorTheme,
};

export default monTheme;
