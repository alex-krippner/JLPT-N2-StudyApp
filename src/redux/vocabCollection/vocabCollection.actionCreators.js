import VocabCollectionActionTypes from './vocabCollection.actionTypes';

export const rateVocab = (vocab, rating) => {
  return {
    type: VocabCollectionActionTypes.RATE_VOCAB,
    payload: { vocab, rating },
  };
};

export const addVocab = (vocabData) => {
  return {
    type: VocabCollectionActionTypes.ADD_VOCAB,
    payload: vocabData,
  };
};
