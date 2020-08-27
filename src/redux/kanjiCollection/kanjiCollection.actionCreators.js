import KanjiCollectionActionTypes from './kanjiCollection.actionTypes';

export const rateKanji = (kanji, rating) => {
  return {
    type: KanjiCollectionActionTypes.RATE_KANJI,
    payload: { kanji, rating },
  };
};

export const addKanji = (kanjiData) => {
  return {
    type: KanjiCollectionActionTypes.ADD_KANJI,
    payload: { kanjiData },
  };
};
