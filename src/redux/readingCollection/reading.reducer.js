import { v4 as uuidv4 } from 'uuid';

import ReadingCollectionActionTypes from './readingCollection.actionTypes';

const INITIAL_STATE = {};

const readingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReadingCollectionActionTypes.RATE_READING:
      return state.id !== action.payload.readingId
        ? state
        : {
            ...state,
            rating:
              action.payload.rating === state.rating
                ? state.rating - 1
                : action.payload.rating,
          };
    case ReadingCollectionActionTypes.ADD_READING:
      return {
        cardType: 'reading',
        id: uuidv4(),
        passage: [...action.payload.passage],
        question: [...action.payload.question],
        choices: [...action.payload.choices],
        solution: [...action.payload.solution],
        rating: 0,
      };
    default:
      return state;
  }
};

export default readingReducer;
