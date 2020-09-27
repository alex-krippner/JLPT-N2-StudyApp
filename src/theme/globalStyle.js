import { createGlobalStyle } from 'styled-components';

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

    --color-blue-cadet:#5f9ea0;
    --color-blue-light: #508DC6;
    --color-blue-medium:#32587C;
    --color-blue-dark: #3f51b5;
    --color-green-light: #66cdaa;
    --color-grey-medium: #708090;
    --color-white: #ffffff;
    --color-white-medium: #fffafa;
    --color-white-dark: #f5f5f5;

    --font-size-small: 1.75rem;
    --font-size-medium: 2.5rem;
    --font-size-large: 3.5rem;
    --font-size-huge: 15rem;

    --padding-large: 3rem;

   
    --font-family-main: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}


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

  @media only screen and (max-width: 425px) {                             
    :root {
    --padding-large: 2rem;
    }
  }
`;

export default GlobalStyle;
