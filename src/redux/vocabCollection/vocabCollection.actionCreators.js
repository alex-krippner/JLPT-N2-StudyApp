import VocabCollectionActionTypes from './vocabCollection.actionTypes';

export const rateVocab = (kana, cardType, rating) => {
  return {
    type: VocabCollectionActionTypes.RATE_VOCAB,
    payload: { kana, cardType, rating },
  };
};

export const addVocab = (vocabData) => {
  return {
    type: VocabCollectionActionTypes.ADD_VOCAB,
    payload: vocabData,
  };
};
