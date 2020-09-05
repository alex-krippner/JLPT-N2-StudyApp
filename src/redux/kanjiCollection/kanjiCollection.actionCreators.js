import KanjiCollectionActionTypes from './kanjiCollection.actionTypes';

export const rateKanji = (kanji, cardType, rating) => {
  return {
    type: KanjiCollectionActionTypes.RATE_KANJI,
    payload: { kanji, cardType, rating },
  };
};

export const addKanji = (kanjiData) => {
  return {
    type: KanjiCollectionActionTypes.ADD_KANJI,
    payload: { kanjiData },
  };
};

export const editKanji = (kanjiData) => {
  return {
    type: KanjiCollectionActionTypes.EDIT_KANJI,
    payload: { kanjiData },
  };
};
