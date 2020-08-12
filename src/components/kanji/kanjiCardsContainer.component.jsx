import React from 'react';

import CardsContainer, {
  CardsContainerStyled,
} from '../cardsContainer.component';
import KanjiCards from './kanjiCards.component';

const KanjiCardsContainer = () => {
  return (
    <CardsContainerStyled>
      <CardsContainer>
        {(
          HEIGHT,
          MAX,
          draggedIndex,
          dragOrder,
          order,
          handleDrag,
          handleDragEnd,
        ) => (
          <KanjiCards
            draggedIndex={draggedIndex}
            dragOrder={dragOrder}
            order={order}
            height={HEIGHT}
            max={MAX}
            handleDrag={handleDrag}
            handleDragEnd={handleDragEnd}
          />
        )}
      </CardsContainer>
    </CardsContainerStyled>
  );
};

export default KanjiCardsContainer;
