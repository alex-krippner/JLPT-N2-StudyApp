import { createSelector } from 'reselect';

const selectReadingCollection = (state) => state.readingCollection;

const selectAllReading = createSelector(
  [selectReadingCollection],
  (reading) => reading,
);

export default selectAllReading;
