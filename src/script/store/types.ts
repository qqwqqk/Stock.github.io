export const ADD_HISTORY = "ADD_HISTORY";
export const ADD_RECORD = "ADD_RECORD";

export interface AddHistory{
  type: typeof ADD_HISTORY;
  meta:{
    timestamp: number;
    price: number;
  }
}

export interface AddRecord{
  type: typeof ADD_RECORD;
  meta:{
    timestamp: number;
    code: string;
    name: string;
    type: number;
    price: number;
    quantity: number;
  }
}

export interface History{
  timestamp: number;
  price: number;
  hold: number;
}

export interface Transaction{
  timestamp: number;
  code: string;
  name: string;
  type: number;
  price: number;
  quantity: number;
}

export interface HistoryState{
  lists: Array<History>;
}

export interface RecordState{
  lists: Array<Transaction>;
}

export interface HoldState{
  hold: number;
  price: number;
  buytotal: number;
  selltotal: number;
}

export type HistoryActionType = AddHistory;
export type RecordActionType = AddRecord ;