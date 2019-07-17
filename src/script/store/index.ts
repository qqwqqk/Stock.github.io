import { createStore, combineReducers } from "redux";

import { HistoryReducer, RecordReducer } from "./reducers";

const rootReducer = combineReducers({ historyState: HistoryReducer, recordState: RecordReducer });

export type MainState = ReturnType<typeof rootReducer>;

export default function configureStore() {

  const store = createStore(
    rootReducer
  );

  return store;
}
