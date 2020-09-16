import React from 'react';
import styled from 'styled-components';

import Main from './layouts/main.component';
import Sidebar from './layouts/sidebar.component';

import GlobalStyle from './theme/globalStyle';
import hero from './img/hero.svg';
import AkitaOniImage from './img/akita_oni.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
  padding: 3rem;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  background-image: url(${hero});
  overflow: hidden;
`;

const AkitaOni = styled.img`
  display: flex;
  height: 7rem;
  width: 5rem;
  position: absolute;

  top: 50%;
  left: 50%;
  z-index: 999999;
`;
const App = () => (
  <Wrapper>
    <AkitaOni className="flying-icon" src={AkitaOniImage} />
    <GlobalStyle />
    <Sidebar />
    <Main />
  </Wrapper>
);

export default App;
