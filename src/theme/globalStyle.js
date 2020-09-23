import { createGlobalStyle } from 'styled-components';

import { COLORS, FONT_SIZE } from './styleConstants';

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}



html {
    font-size: 62.5%; 

    --color-blue-cadet:${COLORS.blueCadet};
    --color-blue-light: ${COLORS.blueLight};
    --color-blue-medium: ${COLORS.blueMedium};
    --color-blue-dark: ${COLORS.blueDark};
    --color-green-light: ${COLORS.greenLight};
    --color-grey-medium: ${COLORS.greyMedium};
    --color-white: ${COLORS.white};
    --color-white-medium: ${COLORS.whiteMedium};
    --color-white-dark: ${COLORS.whiteDark};

    --font-size-small: ${FONT_SIZE.small};
    --font-size-medium: ${FONT_SIZE.medium};
    --font-size-large: ${FONT_SIZE.large};
    --font-size-huge: ${FONT_SIZE.huge};

   
    --font-family-main: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;


body {
    
    
    box-sizing: border-box;
    font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow:hidden;

}

#root{

  display: flex;
  justify-content: center;

}
 
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export default GlobalStyle;
