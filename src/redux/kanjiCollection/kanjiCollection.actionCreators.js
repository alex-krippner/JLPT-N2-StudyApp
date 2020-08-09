import KanjiCollectionActionTypes from './kanjiCollection.actionTypes';

export const rateKanji = (kanji, rating) => {
  console.log('click');
  return {
    type: KanjiCollectionActionTypes.RATE_KANJI,
    payload: { kanji, rating },
  };
};

export const emptyFunctions = () => {};
