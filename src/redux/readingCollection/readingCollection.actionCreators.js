import ReadingCollectionActionTypes from './readingCollection.actionTypes';

export const rateReading = (readingId, rating) => ({
  type: ReadingCollectionActionTypes.RATE_READING,
  payload: { readingId, rating },
});

export const addReading = (readingData) => ({
  type: ReadingCollectionActionTypes.ADD_READING,
  payload: readingData,
});
