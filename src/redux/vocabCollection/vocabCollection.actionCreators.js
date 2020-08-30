import VocabCollectionActionTypes from './vocabCollection.actionTypes';

export const rateVocab = (kana, rating) => {
  return {
    type: VocabCollectionActionTypes.RATE_VOCAB,
    payload: { kana, rating },
  };
};

export const addVocab = (vocabData) => {
  return {
    type: VocabCollectionActionTypes.ADD_VOCAB,
    payload: vocabData,
  };
};
