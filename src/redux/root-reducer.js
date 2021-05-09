import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import kanjiCollectionReducer from './kanjiCollection/kanjiCollection.reducer';
import vocabCollectionReducer from './vocabCollection/vocabCollection.reducer';
import grammarCollectionReducer from './grammarCollection.reducer';
import readingCollectionReducer from './readingCollection/readingCollection.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'kanjiCollection',
    'vocabCollection',
    'grammarCollection',
    'readingCollection',
  ],
};

const rootReducer = combineReducers({
  kanjiCollection: kanjiCollectionReducer,
  vocabCollection: vocabCollectionReducer,
  grammarCollection: grammarCollectionReducer,
  readingCollection: readingCollectionReducer,
});

export default persistReducer(persistConfig, rootReducer);
