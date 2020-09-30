import { createGlobalStyle } from 'styled-components';

import COLORS from './styleConstants';

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}



:root {
    font-size: 62.5%; 

    --color-scrollbar: ${COLORS.blueCadet};
    --color-primary-light: ${COLORS.blueLight};
    --color-primary-medium: ${COLORS.blueMedium};
    --color-primary-dark: ${COLORS.blueDark};
    --color-secondary-medium: ${COLORS.greenSeaMedium};
    --color-grey-medium: #708090;
    --color-white: #ffffff;
    --color-white-medium: #fffafa;
    --color-white-dark: #f5f5f5;

    --font-size-small: 1.75rem;
    --font-size-medium: 2.5rem;
    --font-size-large: 3.5rem;
    --font-size-huge: 15rem;

    --left-cardTitle: -1rem;

    --padding-large: 3rem;

    --top-cardTitle: -2rem;

    --width-cardForm: 35rem;

   
    --font-family-main: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}


body {

  height: 100vh;
  width: 100vw;
    
    
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


  @media only screen and (min-width: 1800px) {
    :root {
      font-size: 75%;
    }
  }

  
  @media only screen and (max-width: 1200px) {
    :root {

      font-size: 56.25%;
    }
  }

  
  @media only screen and (max-width: 900px){

    :root {
      font-size: 50%;
    }
  }


  @media only screen and (max-width: 770px){

    :root {
      font-size: 45%;
      --left-cardTitle: 25%;
    --padding-large: 2rem;
    --top-cardTitle: -2rem;
    --width-cardForm: 55rem;
    }
  }

 

`;

export default GlobalStyle;
