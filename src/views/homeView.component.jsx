import React from 'react';
import styled from 'styled-components';
import daruma from '../img/daruma.svg';

const Daruma = styled.div`
  background-image: url(${daruma});
  height: 10rem;
  width: 10rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: contain;
`;

const Home = () => (
  <>
    <h1>home</h1>
    <Daruma />
  </>
);

export default Home;
