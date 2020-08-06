import { createSelector } from 'reselect';

const selectKanji = (state) => state.kanji;

const selectAllKanji = createSelector(
  [selectKanji],
  (kanji) => kanji.kanji,
);

// export const selectKanjFavs = createSelector([selectKanji], (kanji) =>
//   kanji.kanji.filter((k) => k.rating),
// );

export default selectAllKanji;
