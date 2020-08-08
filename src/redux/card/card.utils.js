export const flipCard = ({ cards }, payload) => {
  const { cardType, cardId } = payload;

  if (!cards[cardType].find((id) => id === cardId)) {
    return cards[cardType].map();
  }

  return;
};

export const emptyFunction = () => {};
