import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {};

const vocabReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RATE_VOCAB':
      return {
        ...state,
        rating:
          action.payload.rating === 1 && state.rating === 1
            ? 0
            : action.payload.rating,
      };
    case 'ADD_VOCAB':
      return {
        cardType: 'vocab',
        id: uuidv4(),
        kana: action.payload.kana,
        漢字:
          action.payload.漢字.length > 0
            ? action.payload.漢字
            : ['No Kanji Provided'],
        語類: [...action.payload.語類],
        定義: [...action.payload.定義],
        用例: [...action.payload.用例],
        rating: 0,
      };

    case 'EDIT_VOCAB':
      return { ...state, ...action.payload.vocabData };
    default:
      return state;
  }
};

export default vocabReducer;
