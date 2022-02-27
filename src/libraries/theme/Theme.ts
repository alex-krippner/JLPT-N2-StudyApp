export interface ColorTheme {
  /** the default black color */
  black: string;
  /** the color of the button background when\ hovered */
  buttonHover: string;
  /** light shade of the primary color */
  primaryLight: string;
  /** medium shade of the primary color */
  primaryMedium: string;
  /** dark shade of the primary color */
  primaryDark: string;
  /** default red color */
  red: string;
  /** color of the scrollbar */
  scrollbar: string;
  /** medium shade of the secondary color */
  secondaryMedium: string;
  /** a pure white color */
  white: string;
  /** a darker shade of white */
  whiteMedium: string;
  /** a dark shade of white */
  whiteDark: string;
}

export interface SizeTheme {
  /** the width of the kanji and vocab card form */
  cardFormWidth: string;
  /** the left absolute position of the card title in the kanji and vocab cards */
  cardTitleLeft: string;
  /** the top absolute position of the card title in the kanji and vocab cards */
  cardTitleTop: string;
  /** the small font size */
  fontSmall: string;
  /** the medium font size */
  fontMedium: string;
  /** the large font size */
  fontLarge: string;
  /** the huge font size */
  fontHuge: string;
  /** the default height of the ui-kit's basic input */
  inputHeight: string;
  /** the default width of the ui-kit's basic input */
  inputWidth: string;
  /** the large padding size */
  paddingLarge: string;
  /** the font size of small text */
  textSmall: string;
  /** the font size of medium text */
  textMedium: string;
}
