import { historyItem, recordItem, HoldReducer, HistoryReducer, RecordReducer } from './reducers';

test('recordItem init test', ()=>{
  const timestamp = new Date().getTime();
  const code= '';
  const name= '';
  const type= 1;
  const price= 100;
  const quantity= 100;
  const output = { 
    timestamp: timestamp,
    code: code, 
    name: name, 
    type: type, 
    price: price, 
    quantity: quantity,
    amount: price * quantity
  };
  expect(recordItem(timestamp, code, name, type, price, quantity)).toEqual(output);
});

test('historyItem init test', ()=>{
  const timestamp = new Date().getTime();
  const price = 100;
  const hold = 100;
  const output = { 
    timestamp: timestamp,
    price: price,
    hold: hold
  };
  expect(historyItem(timestamp, price, hold)).toEqual(output);
});


describe('hold reducers test', ()=>{
  it('set price test', ()=>{
    const state = { hold: 0, price: 0, buytotal: 0, selltotal: 0 };
    const price = 100;
    const output = { hold: 0, price: price, buytotal: 0, selltotal: 0};
    expect(HoldReducer(state ,{ type: 'SET_HOLD' , price:price })).toEqual(output);
  });

  it('buy stock test', ()=>{
    const state = { hold: 100, price: 100, buytotal: 0, selltotal: 0 };
    const quantity = 10;
    const price = 80;
    const meta = { quantity: quantity, price: price };

    const output = { hold: 110, price: price, buytotal: 800, selltotal: 0};
    expect(HoldReducer(state ,{ type: 'BUY_HOLD' , meta:meta })).toEqual(output);
  });

  it('sell stock test', ()=>{
    const state = { hold: 100, price: 100, buytotal: 0, selltotal: 0 };
    const quantity = 10;
    const price = 120;
    const meta = { quantity: quantity, price: price };

    const output = { hold: 90, price: price, buytotal: 0, selltotal: 1200};
    expect(HoldReducer(state ,{ type: 'SELL_HOLD' , meta:meta })).toEqual(output);
  });

  it('init stock test', ()=>{
    const state = { hold: 100, price: 100, buytotal: 0, selltotal: 0 };
    const hold = 110;
    const price = 110;
    const buytotal = 110;
    const selltotal = 110;
    const meta = { hold: hold, price: price, buytotal: buytotal, selltotal: selltotal };
    const output = { hold: hold, price: price, buytotal: buytotal, selltotal: selltotal };
    expect(HoldReducer(state ,{ type: 'INIT_HOLD' , meta:meta })).toEqual(output);
  });
});

describe('reducers test', ()=>{
  it('add item of history test', ()=>{
    const timestamp = new Date().getTime();
    const price = 100;
    const hold = 100;
    const state = { lists:[ historyItem(0, 10, 10)]};
    const meta = {timestamp:timestamp, price:price, hold:hold};

    const output = { lists:[
      historyItem(0, 10, 10),
      historyItem(timestamp, price, hold)
    ]};
    expect(HistoryReducer(state ,{ type: 'ADD_HISTORY' , meta: meta })).toEqual(output);
  })

  it('add item of record test', ()=>{
    const timestamp = new Date().getTime();
    const code = '';
    const name = '';
    const type = 1;
    const price = 100;
    const quantity = 100;
    const state = { lists:[ recordItem(0,'','',1,10,10)]};

    const meta = { 
      timestamp: timestamp,
      code: code,
      name: name,
      type: type,
      price: price,
      quantity: quantity
    };

    const output = { lists:[
      recordItem(0,'','',1,10,10),
      recordItem(timestamp, code, name, type, price, quantity)
    ]};
    expect(RecordReducer(state ,{ type: 'ADD_RECORD' , meta: meta })).toEqual(output);
  })
});

