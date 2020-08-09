const INITIAL_STATE = {};

const kanjiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'RATE_KANJI':
      return state.kanji !== action.payload.kanji
        ? state
        : {
            ...state,
            rating:
              action.payload.rating === 1 && state.rating === 1
                ? 0
                : action.payload.rating,
          };

    default:
      return state;
  }
};

export default kanjiReducer;
