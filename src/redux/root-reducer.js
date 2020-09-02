import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import kanjiCollectionReducer from './kanjiCollection/kanjiCollection.reducer';
import vocabCollectionReducer from './vocabCollection/vocabCollection.reducer';
import grammarCollectionReducer from './grammar/grammarCollection.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'kanjiCollection',
    'vocabCollection',
    'grammarCollection',
  ],
};

const rootReducer = combineReducers({
  kanjiCollection: kanjiCollectionReducer,
  vocabCollection: vocabCollectionReducer,
  grammarCollection: grammarCollectionReducer,
});

export default persistReducer(persistConfig, rootReducer);
