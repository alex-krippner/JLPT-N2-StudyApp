import KanjiActionTypes from './kanji.actionTypes';

export const rateKanji = (rating) => ({
  type: KanjiActionTypes.RATE_KANJI,
  payload: rating,
});

export const emptyFunctions = () => {};
