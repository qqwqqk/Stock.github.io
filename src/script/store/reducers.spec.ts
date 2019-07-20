import { historyItem, recordItem, HistoryReducer, RecordReducer } from './reducers';

test('historyItem init test', ()=>{
  const timestamp = new Date().getTime();
  const price = 1234;
  const output = { 
    timestamp: timestamp,
    price: price,
    hold: 100
  };
  expect(historyItem(timestamp, price)).toEqual(output);
});

test('recordItem init test', ()=>{
  const timestamp = new Date().getTime();
  const code= '';
  const name= '';
  const type= 1;
  const price= 1234;
  const quantity= 1000000;
  const output = { 
    timestamp: timestamp,
    code: code, 
    name: name, 
    type: type, 
    price: price, 
    quantity: quantity
  };
  expect(recordItem(timestamp, code, name, type, price, quantity)).toEqual(output);
});

describe('reducers test', ()=>{
  it('add item of history test', ()=>{
    const timestamp = new Date().getTime();
    const price = 1234;
    const state = { lists:[ historyItem(0, 1)]};
    const meta = {timestamp:timestamp, price:price};

    const output = { lists:[
      historyItem(0, 1),
      historyItem(timestamp, price)
    ]};
    expect(HistoryReducer(state ,{ type: 'ADD_HISTORY' , meta: meta })).toEqual(output);
  })

  it('add item of record test', ()=>{
    const timestamp = new Date().getTime();
    const code = '';
    const name = '';
    const type = 1;
    const price = 1234;
    const quantity = 100;
    const state = { lists:[ recordItem(0,'','',1,1,1)]};

    const meta = { 
      timestamp: timestamp,
      code: code,
      name: name,
      type: type,
      price: price,
      quantity: quantity
    };

    const output = { lists:[
      recordItem(0,'','',1,1,1),
      recordItem(timestamp, code, name, type, price, quantity)
    ]};
    expect(RecordReducer(state ,{ type: 'ADD_RECORD' , meta: meta })).toEqual(output);
  })
});

