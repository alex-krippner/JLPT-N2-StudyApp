import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import accountsReducer from "../../modules/account/accountReducer";
import loginFormReducer from "../../modules/account/loginFormReducer";
import kanjiCollectionReducer from "./kanjiCollection.reducer";
import vocabCollectionReducer from "./vocabCollection.reducer";
import grammarCollectionReducer from "./grammarCollection.reducer";
import readingCollectionReducer from "./readingCollection.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "kanjiCollection",
    "vocabCollection",
    "grammarCollection",
    "readingCollection",
    "accountsReducer",
    "loginFormReducer",
  ],
};

const rootReducer = combineReducers({
  kanjiCollection: kanjiCollectionReducer,
  vocabCollection: vocabCollectionReducer,
  grammarCollection: grammarCollectionReducer,
  readingCollection: readingCollectionReducer,
  accounts: accountsReducer,
  loginForm: loginFormReducer,
});

export default persistReducer(persistConfig, rootReducer);
