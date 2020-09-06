export const deleteCard = (state, card) => {
  const { [card]: omit, ...res } = state;
  return res;
};

export const editCard = (state, action) => {
  const newKanji = state[action.payload.kanjiData.漢字].漢字;

  console.log(newKanji);

  return {
    ...state,
    [newKanji]: { ...action.payload.kanjiData },
  };
};
