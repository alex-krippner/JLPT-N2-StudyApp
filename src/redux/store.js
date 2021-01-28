import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import rootReducer from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'kanjiCollectionReducer',
    'vocabCollectionReducer',
    'grammarCollectionReducer',
    'readingCollectionReducer',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
    },
  }).concat(logger),
});

export const persistor = persistStore(store);
