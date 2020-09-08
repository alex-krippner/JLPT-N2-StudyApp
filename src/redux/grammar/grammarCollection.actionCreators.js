import GrammarCollectionActionTypes from './grammarCollection.actionTypes';

export const rateGrammar = (文法, cardType, rating) => ({
  type: GrammarCollectionActionTypes.RATE_GRAMMAR,
  payload: { 文法, cardType, rating },
});

export const addGrammar = (grammarData) => ({
  type: GrammarCollectionActionTypes.ADD_GRAMMAR,
  payload: grammarData,
});

export const editGrammar = (grammarData) => ({
  type: GrammarCollectionActionTypes.EDIT_GRAMMAR,
  payload: grammarData,
});
