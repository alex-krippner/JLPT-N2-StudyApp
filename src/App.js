import React from 'react';
import styled from 'styled-components';

import Main from './layouts/main.component';
import Sidebar from './layouts/sidebar.component';

import GlobalStyle from './theme/globalStyle';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 95%;
  padding: 3rem;
  border-radius: 3rem;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  background-color: #fff5ee;
`;

const App = () => (
  <Wrapper>
    <GlobalStyle />
    <Sidebar />
    <Main />
  </Wrapper>
);

export default App;
