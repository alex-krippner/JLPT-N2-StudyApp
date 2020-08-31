import GrammarCollectionActionTypes from './grammarCollection.actionTypes';

export const rateGrammar = (grammar, rating) => {
  return {
    type: GrammarCollectionActionTypes.RATE_GRAMMAR,
    payload: { grammar, rating },
  };
};

export const addGrammar = (grammarData) => {
  return {
    type: GrammarCollectionActionTypes.ADD_GRAMMAR,
    payload: { grammarData },
  };
};
