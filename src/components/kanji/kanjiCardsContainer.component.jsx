import React from 'react';

import { CardsContainerStyled } from '../cardsContainer.component';
import KanjiCards from './kanjiCards.component';

const KanjiCardsContainer = () => (
  <CardsContainerStyled>
    <KanjiCards />
  </CardsContainerStyled>
);

export default KanjiCardsContainer;
