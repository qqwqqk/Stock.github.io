import { createStore, combineReducers } from "redux";

import { HoldReducer, RecordReducer, HistoryReducer } from "./reducers";

const rootReducer = combineReducers({ holdState:HoldReducer, recordState: RecordReducer, historyState: HistoryReducer });

export type MainState = ReturnType<typeof rootReducer>;

export default function configureStore() {

  const store = createStore(
    rootReducer
  );

  return store;
}
