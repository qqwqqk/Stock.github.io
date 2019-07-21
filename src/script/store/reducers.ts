import { 
  Record, History, HoldState, RecordState, HistoryState,   
  SET_HOLD, BUY_HOLD, SELL_HOLD, INIT_HOLD, ADD_RECORD, ADD_HISTORY, 
  HoldActionType, RecordActionType, HistoryActionType
} from "./types";

export const recordItem = (
  timestamp: number,
  code: string, 
  name: string, 
  type: number, 
  price: number, 
  quantity: number
):Record => {
  return {
    timestamp: timestamp,
    code: code, 
    name: name, 
    type: type, 
    price: price, 
    quantity: quantity,
    amount: price * quantity
  }
}

export const historyItem = (timestamp: number, price: number, hold:number): History => {
  return {
    timestamp: timestamp,
    price: price,
    hold: hold
  }
}

const HoldState: HoldState = {
  hold: 0, price: 0, buytotal: 0, selltotal: 0
}

const RecordState: RecordState = {
  lists: [ ]
};

const HistoryState: HistoryState = {
  lists: [ ]
};

export function HoldReducer(
  state = HoldState,
  action: HoldActionType
): HoldState{
  switch(action.type){
    case SET_HOLD:
      state.price = action.price;
      return state;
    case BUY_HOLD:
      state.price = action.meta.price;
      state.hold = state.hold + action.meta.quantity;
      state.buytotal = state.buytotal + action.meta.price * action.meta.quantity;
      return state;
    case SELL_HOLD:
      state.price = action.meta.price;
      state.hold = state.hold - action.meta.quantity;
      state.selltotal = state.selltotal + action.meta.price * action.meta.quantity;
      return state;
    case INIT_HOLD:
      state.hold = action.meta.hold;
      state.price = action.meta.price;
      state.buytotal = action.meta.buytotal;
      state.selltotal = action.meta.selltotal;
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

export function HistoryReducer(
  state = HistoryState,
  action: HistoryActionType
): HistoryState{
  switch(action.type){
    case ADD_HISTORY:
      const newitem = historyItem(action.meta.timestamp, action.meta.price, action.meta.hold)
      const addlists = [...state.lists, newitem];
      // console.log(addlists);
      return {lists: addlists};
    default:
      return state;
  }
}
