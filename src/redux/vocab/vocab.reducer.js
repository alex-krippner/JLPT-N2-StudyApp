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
        id: uuidv4(),
        kana: action.payload.kana,
        kanji: action.payload.kanji,
        parts_of_speech: action.payload.parts_of_speech,
        definitions: action.payload.definitions,
        sentenceSample: action.payload.sentenceSample,
        rating: 0,
      };
    default:
      return state;
  }
};

export default vocabReducer;
