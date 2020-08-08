/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import KanjiCards from './kanjiCards.component';
import { CardsContainerStyled } from '../cardsContainer.component';

import selectAllKanji from '../../redux/kanji/kanji.selectors';
import { flipCard } from '../../redux/card/card.actionCreators';

const KanjiCardsContainer = ({ kanji, flipCard }) => (
  <CardsContainerStyled>
    <KanjiCards kanji={kanji} flipCard={flipCard} />
  </CardsContainerStyled>
);
const mapStateToProps = createStructuredSelector({
  kanji: selectAllKanji,
});

const mapDispatchToProps = (dispatch) => ({
  flipCard: () => dispatch(flipCard()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanjiCardsContainer);
