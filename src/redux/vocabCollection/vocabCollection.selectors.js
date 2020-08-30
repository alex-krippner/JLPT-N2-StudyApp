import { createSelector } from 'reselect';

const selectVocabCollection = (state) =>
  Object.values(state.vocabCollection);

const selectAllVocab = createSelector(
  [selectVocabCollection],
  (vocab) => vocab,
);

export default selectAllVocab;
