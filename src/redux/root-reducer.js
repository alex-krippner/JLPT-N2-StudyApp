import { combineReducers } from 'redux';

import kanjiReducer from './kanji/kanji.reducer';

const rootReducer = combineReducers({
  kanji: kanjiReducer,
});

export default rootReducer;
