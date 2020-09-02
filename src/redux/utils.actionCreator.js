export const deleteCard = (card, cardId) => {
  return {
    type: 'DELETE_CARD',
    payload: { card, cardId },
  };
};

export default deleteCard;
