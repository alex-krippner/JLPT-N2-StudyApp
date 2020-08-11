import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import kanjiCollectionReducer from './kanjiCollection/kanjiCollection.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: 'kanjiCollection',
};

const rootReducer = combineReducers({
  kanjiCollection: kanjiCollectionReducer,
});

export default persistReducer(persistConfig, rootReducer);
