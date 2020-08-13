import React from 'react';

import CardsContainerStyled from '../cardsContainer.component';
import KanjiCards from './kanjiCards.component';

const KanjiCardsContainer = () => {
  return (
    <CardsContainerStyled>
      <KanjiCards />
    </CardsContainerStyled>
  );
};

export default KanjiCardsContainer;
