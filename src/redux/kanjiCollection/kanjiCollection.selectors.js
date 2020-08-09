import { createSelector } from 'reselect';

const selectKanjiCollection = (state) =>
  Object.values(state.kanjiCollection);

const selectAllKanji = createSelector(
  [selectKanjiCollection],
  (kanji) => kanji,
);

export default selectAllKanji;
