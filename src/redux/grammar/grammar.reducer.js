import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {};

const grammarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RATE_GRAMMAR':
      return {
        ...state,
        rating:
          action.payload.rating === state.rating
            ? state.rating - 1
            : action.payload.rating,
      };
    case 'ADD_GRAMMAR':
      return {
        cardType: 'grammar',
        id: uuidv4(),
        variations: [...action.payload.grammarData.variations],
        意味: [...action.payload.grammarData.意味],
        接続: [...action.payload.grammarData.接続],
        用例: [...action.payload.grammarData.用例],
        rating: 0,
      };
    default:
      return state;
  }
};

export default grammarReducer;
