const deleteCard = (state, card) => {
  const { [card]: omit, ...res } = state;
  return res;
};

export default deleteCard;
