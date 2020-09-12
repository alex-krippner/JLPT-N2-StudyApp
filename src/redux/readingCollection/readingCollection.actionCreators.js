import ReadingCollectionActionTypes from './readingCollection.actionTypes';

export const rateReading = (readingId, rating) => {
  return {
    type: ReadingCollectionActionTypes.RATE_READING,
    payload: { readingId, rating },
  };
};

export const addReading = (readingData) => ({
  type: ReadingCollectionActionTypes.ADD_READING,
  payload: readingData,
});

export const editReading = (readingData) => ({
  type: ReadingCollectionActionTypes.EDIT_READING,
  payload: readingData,
});
