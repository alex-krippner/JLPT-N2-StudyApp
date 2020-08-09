import { createSelector } from 'reselect';

const selectKanjiCollection = (state) => state.kanjiCollection;

const selectAllKanji = createSelector(
  [selectKanjiCollection],
  (kanji) => kanji,
);

export default selectAllKanji;
