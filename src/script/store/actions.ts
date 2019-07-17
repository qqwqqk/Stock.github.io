import { AddHistory, AddRecord, ADD_HISTORY, ADD_RECORD } from "./types";

export function addHistory(timestamp: number, price: number): AddHistory{
  return {
    type: ADD_HISTORY,
    meta:{
      timestamp: timestamp,
      price: price
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
