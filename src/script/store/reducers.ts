import { HistoryState, RecordState, HoldState, ADD_HISTORY, ADD_RECORD, HistoryActionType, RecordActionType } from "./types";

const HoldState: HoldState = {
  hold: 1000000, price: 100, buytotal: 0, selltotal: 0
}

const HistoryState: HistoryState = {
  lists: [ ]
};

const RecordState: RecordState = {
  lists: [ ]
};

export const historyItem = (timestamp: number, price: number) => {
  return {
    timestamp: timestamp,
    price: price,
    hold: HoldState.hold
  }
}

export const recordItem = (
  timestamp: number,
  code: string, 
  name: string, 
  type: number, 
  price: number, 
  quantity: number
) => {
  return {
    timestamp: timestamp,
    code: code, 
    name: name, 
    type: type, 
    price: price, 
    quantity: quantity
  }
}

export function HistoryReducer(
  state = HistoryState,
  action: HistoryActionType
): HistoryState{
  switch(action.type){
    case ADD_HISTORY:
      const addlists = [...state.lists, historyItem(action.meta.timestamp, action.meta.price)];
      // console.log(addlists);
      HoldState.price = action.meta.price;
      return {lists: addlists};
    default:
      return state;
  }
}

export function RecordReducer(
  state = RecordState,
  action: RecordActionType
): RecordState{
  switch(action.type){
    case ADD_RECORD:
      const newitem = recordItem(
        action.meta.timestamp,
        action.meta.code,
        action.meta.name,
        action.meta.type,
        action.meta.price,
        action.meta.quantity
      )
      const addlists = [...state.lists, newitem];
      // console.log(addlists);
      if(action.meta.type === 1){ 
        HoldState.hold = HoldState.hold + action.meta.quantity;
        HoldState.buytotal = HoldState.buytotal + action.meta.quantity * action.meta.price;
      }
      if(action.meta.type === 2){ 
        HoldState.hold = HoldState.hold - action.meta.quantity;
        HoldState.selltotal = HoldState.selltotal + action.meta.quantity * action.meta.price;
      }
      return {lists: addlists};
    default:
      return state;
  }
}
