export const globalStyles = `
  * {
  
  /* The emerging W3C standard
   that is currently Firefox-only */

  scrollbar-width: thin;

  scrollbar-color: var(--color-scrollbar);

  /* Works on Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: var(--color-scrollbar);
  }
  &::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 20px;
  }

  &::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 20px;
  }
  }
  
  *,
  *::after,
  *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }



  :root {
      font-size: 62.5%;
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
    height: 100%;

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
    }
  }
`;
