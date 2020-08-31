import { createSelector } from 'reselect';

const selectGrammarCollection = (state) =>
  Object.values(state.grammarCollection);

const selectAllGrammar = createSelector(
  [selectGrammarCollection],
  (grammar) => grammar,
);

export default selectAllGrammar;
