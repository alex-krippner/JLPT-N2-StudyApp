import React, { useState } from "react";
import styled from "styled-components";

import GlobalStyle from "@mon-theme/globalStyle";
import hero from "@mon-assets/img/hero.svg";
import Main from "./layouts/main.component";
import FlyingCharsBackground from "./components/organisms/BackgroundAnimation";

import Hamburger from "./components/atoms/Hamburger";
import HamburgerNav from "./components/molecules/HamburgerNav";

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
  const handleOpen = () => setOpen(!open);

  return (
    <Wrapper>
      <FlyingCharsBackground iconSize="5rem" />
      <GlobalStyle />
      <Hamburger handleOpen={handleOpen} />
      <HamburgerNav open={open} handleOpen={handleOpen} />
      <Main />
    </Wrapper>
  );
};

export default App;
