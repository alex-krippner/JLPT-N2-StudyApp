import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import Cards from './cards.component';
import selectAllKanji from '../redux/kanji/kanji.selectors';

const CardsContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 7rem;
  height: 100vh;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.6);
`;

const CardsContainer = ({ kanji }) => {
  return (
    <CardsContainerStyled>
      <Cards kanji={kanji} />
    </CardsContainerStyled>
  );
};

const mapStateToProps = createStructuredSelector({
  kanji: selectAllKanji,
});
export default connect(mapStateToProps)(CardsContainer);
