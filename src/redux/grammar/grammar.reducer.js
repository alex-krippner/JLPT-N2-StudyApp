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
        文法: action.payload.文法,
        variations: [...action.payload.variations],
        意味: [...action.payload.意味],
        接続: [...action.payload.接続],
        用例: [...action.payload.用例],
        rating: 0,
      };

    case 'EDIT_GRAMMAR':
      return { ...action.payload };
    default:
      return state;
  }
};

export default grammarReducer;
