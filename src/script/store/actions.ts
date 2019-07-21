import { 
  SetHold, BuyHold , SellHold , InitHold, AddRecord, AddHistory,
  SET_HOLD, BUY_HOLD, SELL_HOLD, INIT_HOLD, ADD_RECORD, ADD_HISTORY,
} from "./types";

export function setHold( price: number): SetHold{
  return {
    type: SET_HOLD,
    price: price
  }
}

export function buyHold( quantity: number, price: number): BuyHold{
  return {
    type: BUY_HOLD,
    meta:{
      quantity: quantity,
      price: price
    }
  }
}

export function sellHold( quantity: number, price: number): SellHold{
  return {
    type: SELL_HOLD,
    meta:{
      quantity: quantity,
      price: price
    }
  }
}

export function initHold( hold: number, price: number): InitHold{
  return {
    type: INIT_HOLD,
    meta:{
      hold: hold,
      price: price,
      buytotal: 0,
      selltotal: 0
    }
  }
}

export function addRecord(
  timestamp: number,
  code: string, 
  name: string, 
  type: number, 
  price: number, 
  quantity: number
): AddRecord{
  return {
    type: ADD_RECORD,
    meta:{
      timestamp: timestamp,
      code: code, 
      name: name, 
      type: type, 
      price: price, 
      quantity: quantity
    }
  }
}

export function addHistory(timestamp: number, price: number, hold: number): AddHistory{
  return {
    type: ADD_HISTORY,
    meta:{
      timestamp: timestamp,
      price: price,
      hold: hold
    }
  }
}
