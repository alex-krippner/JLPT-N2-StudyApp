import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {};

const kanjiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RATE_KANJI':
      return {
        ...state,
        rating:
          action.payload.rating === 1 && state.rating === 1
            ? 0
            : action.payload.rating,
      };
    case 'ADD_KANJI':
      return {
        cardType: 'kanji',
        漢字: action.payload.kanjiData.漢字,
        id: uuidv4(),
        読み: [...action.payload.kanjiData.読み],
        単語例: [...action.payload.kanjiData.単語例],
        用例: [...action.payload.kanjiData.用例],
        rating: 0,
      };
    case 'EDIT_KANJI':
      return { ...action.payload.kanjiData };

    default:
      return state;
  }
};

export default kanjiReducer;
