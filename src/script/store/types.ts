export const SET_HOLD = "SET_HOLD";
export const BUY_HOLD = "BUY_HOLD";
export const SELL_HOLD = "SELL_HOLD";
export const INIT_HOLD = "INIT_HOLD";
export const ADD_RECORD = "ADD_RECORD";
export const ADD_HISTORY = "ADD_HISTORY";

export interface SetHold{
  type: typeof SET_HOLD;
  price: number;
}

export interface BuyHold{
  type: typeof BUY_HOLD;
  meta:{
    quantity: number;
    price: number;
  }
}

export interface SellHold{
  type: typeof SELL_HOLD;
  meta:{
    quantity: number;
    price: number;
  }
}

export interface InitHold{
  type: typeof INIT_HOLD;
  meta:{
    hold: number;
    price: number;
    buytotal: number;
    selltotal: number;
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

export interface AddHistory{
  type: typeof ADD_HISTORY;
  meta:{
    timestamp: number;
    price: number;
    hold: number;
  }
}

export interface Record{
  timestamp: number;
  code: string;
  name: string;
  type: number;
  price: number;
  quantity: number;
  amount: number;
}

export interface History{
  timestamp: number;
  price: number;
  hold: number;
}

export interface HoldState{
  hold: number;
  price: number;
  buytotal: number;
  selltotal: number;
}

export interface HistoryState{
  lists: Array<History>;
}

export interface RecordState{
  lists: Array<Record>;
}

export type HoldActionType = SetHold | BuyHold | SellHold | InitHold;
export type RecordActionType = AddRecord ;
export type HistoryActionType = AddHistory;
