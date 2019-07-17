import { HistoryState, RecordState, ADD_HISTORY, ADD_RECORD, HistoryActionType, RecordActionType } from "./types";

export const historyItem = (timestamp: number, price: number) => {
  return {
    timestamp: timestamp,
    price: price
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

const HistoryState: HistoryState = {
  lists: [ ]
};

const RecordState: RecordState = {
  lists: [ ]
};

export function HistoryReducer(
  state = HistoryState,
  action: HistoryActionType
): HistoryState{
  switch(action.type){
    case ADD_HISTORY:
      const addlists = [...state.lists, historyItem(action.meta.timestamp, action.meta.price)];
      // console.log(addlists);
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
      return {lists: addlists};
    default:
      return state;
  }
}
