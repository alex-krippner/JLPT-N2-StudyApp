import CardActionTypes from '../kanji/kanji.actionCreators';
import { flipCard } from './card.utils';

const INITIAL_STATE = {
  cards: { kanjiCards: [], vocabCards: [] },
};

const cardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CardActionTypes.FLIP_CARD:
      return {
        ...state,
        cards: flipCard(state, action.payload),
      };

    default:
      return state;
  }
};

export default cardReducer;
