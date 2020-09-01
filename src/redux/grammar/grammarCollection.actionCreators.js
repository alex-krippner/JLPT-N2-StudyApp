import GrammarCollectionActionTypes from './grammarCollection.actionTypes';

export const rateGrammar = (grammar, cardType, rating) => {
  return {
    type: GrammarCollectionActionTypes.RATE_GRAMMAR,
    payload: { grammar, cardType, rating },
  };
};

export const addGrammar = (grammarData) => {
  return {
    type: GrammarCollectionActionTypes.ADD_GRAMMAR,
    payload: { grammarData },
  };
};
