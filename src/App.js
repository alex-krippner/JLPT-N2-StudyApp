import React, { useState } from 'react';
import styled from 'styled-components';

import Main from './layouts/main.component';
import Sidebar from './layouts/sidebar.component';
import FlyingCharsBackground from './components/backgroundAnimation.component';

import GlobalStyle from './theme/globalStyle';
import hero from './img/hero.svg';
import Hamburger from './components/hamburger/hamburger.component';
import HamburgerNav from './components/hamburger/hamburgerNav.component';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  padding: var(--padding-large);
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  background-image: url(${hero});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <FlyingCharsBackground iconSize="5rem" />
      <GlobalStyle />
      <Sidebar />
      <Hamburger open={open} setOpen={setOpen} />
      <HamburgerNav open={open} setOpen={setOpen} />
      <Main />
    </Wrapper>
  );
};

export default App;
