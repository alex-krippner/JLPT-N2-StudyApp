import { combineReducers } from 'redux';

import kanjiCollectionReducer from './kanjiCollection/kanjiCollection.reducer';

const rootReducer = combineReducers({
  kanjiCollection: kanjiCollectionReducer,
});

export default rootReducer;
