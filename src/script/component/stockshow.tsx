import * as React from "react";
import { Chart, Geom, Axis, Tooltip, View } from "bizcharts";
import { Empty, Slider } from 'antd';

import { HistoryState, RecordState } from '../store/types';
import { toThousands } from '../store/method'

interface StockProps {
  history: HistoryState;
  record: RecordState;
  showRange: Array<number>;
  setRange: (value: [number, number]) => void;
}

export const StockShow = (props: StockProps) =>{
  let progress = 0;

  const min = props.showRange[0];
  const max = props.showRange[1];
  const historySource = props.history.lists.filter((item)=>{return item.timestamp >= min && item.timestamp <= max});
  const recordSource = props.record.lists.filter((item)=>{return item.timestamp >= min && item.timestamp <= max});


  let sliderMin = min;
  let sliderMax = max;
  for(let val of props.history.lists){
    sliderMin = sliderMin < val.timestamp ? sliderMin : val.timestamp;
    sliderMax = sliderMax > val.timestamp ? sliderMax : val.timestamp;
  }

  let showMin = max;
  let showMax = min;
  for(let val of historySource){
    showMin = showMin < val.timestamp ? showMin : val.timestamp;
    showMax = showMax > val.timestamp ? showMax : val.timestamp;
  }

  const showScale = {
    timestamp: { type: 'time', mask: 'HH:mm:ss', min: showMin - 1, max: showMax + 1, linear: false, tickCount:7, range: [0, 1] }
  };

  if(historySource.length > 0 && recordSource.length == 0){ progress = 50;}
  if(historySource.length > 0 && recordSource.length > 0){ progress = 100;}

  switch(progress){
    case 0:
      return ( 
        <div>
          <Empty/>
          <Slider
            range
            min={sliderMin}
            max={sliderMax}
            tipFormatter={(value)=>{return `${new Date(value).toLocaleString()}`;}}
            value={[min, max]}
            onChange={props.setRange}
          />
        </div>
      )
    case 50:
      return (
        <div>
          <Chart height={window.innerHeight * 2 / 5} data={historySource}  scale={showScale} padding='auto' animate={false} forceFit >
            <Tooltip crosshairs={{style:{strokeOpacity:0,fillOpacity:0}}}/>
            <View data={historySource} scale={showScale}>
              <Axis name="timestamp" position="bottom" visible={true} />
              <Axis name="price" position="left" grid={null} label={{ formatter: val => `${val}元` }}/>
              <Tooltip/>
              <Geom
                type="line" position="timestamp*price" size={2} shape="smooth"
                tooltip={[ 
                  'timestamp*price*hold', 
                  (timestamp, price, hold) => {
                    let Ivalue: string =  '行情：' + price + '<br/>持仓：' + toThousands(hold) + '<br/>权益：' + toThousands(hold * price);
                    return { name: '权益明细', title: new Date(timestamp).toLocaleString(), value: Ivalue };
                  }
                ]} 
              />
            </View>
          </Chart>
          <Slider
            range
            min={sliderMin}
            max={sliderMax}
            tipFormatter={(value)=>{return `${new Date(value).toLocaleString()}`;}}
            value={[min, max]}
            onChange={props.setRange}
          />
        </div>
      )
    case 100:
      return (
        <div>
          <Chart height={window.innerHeight * 2 / 5} data={historySource}  scale={showScale} padding='auto' animate={false} forceFit >
            <Tooltip crosshairs={{style:{strokeOpacity:0,fillOpacity:0}}}/>
            <View data={historySource} scale={showScale}>
              <Axis name="timestamp" position="bottom" visible={true} />
              <Axis name="price" position="left" grid={null} label={{ formatter: val => `${val}元` }} />
              <Tooltip/>
              <Geom
                type="line" position="timestamp*price" size={2} shape="smooth"
                tooltip={[ 
                  'timestamp*price*hold', 
                  (timestamp, price, hold) => {
                    let Ivalue: string =  '行情：' + price + '<br/>持仓：' + toThousands(hold) + '<br/>权益：' + toThousands(hold * price);
                    return { name: '权益明细', title: new Date(timestamp).toLocaleString(), value: Ivalue };
                  }
                ]} 
              />
            </View>
            <View data={recordSource} scale={showScale}>
              <Axis name="timestamp" position="top" visible={false}/>
              <Axis name="quantity" position="right" grid={null} label={{ formatter: val => `${val}元` }} />
              <Tooltip crosshairs={{type:'cross'}}/>
              <Geom
                type="point" position="timestamp*quantity" size={4} shape={'circle'}
                color={[ 
                  'type', 
                  type => { 
                    if (type === 1) { return '#FF0000'; } 
                    if (type === 2) { return '#00FF00'; } 
                    return 'transparent';
                  } 
                ]}
                style={[ 
                  'type', 
                  { 
                    lineWidth: 1,  
                    stroke: (type: number) => { 
                      if (type === 1) { return '#FF0000'; } 
                      if (type === 2) { return '#00FF00'; } 
                      return 'transparent';
                    } 
                  }
                ]}
                tooltip={[
                  'timestamp*type*code*quantity*price',
                  (timestamp, type, code, quantity, price) => {
                    let Iname: string;
                    let Ititle: string;
                    let Ivalue: string;
                    Iname = type === 1 ? '买入' : '卖出';
                    Ititle = new Date(timestamp).toLocaleString();
                    Ivalue = '股票：' + code + '<br/>数量：' + toThousands(quantity) + '<br/>成交额：' + toThousands(quantity * price);
                    return { name: Iname, title: Ititle,  value: Ivalue };
                  }
                ]}
                opacity={0.85}
              />
            </View>
          </Chart>
          <Slider
            range
            min={sliderMin}
            max={sliderMax}
            tipFormatter={(value)=>{return `${new Date(value).toLocaleString()}`;}}
            value={[min, max]}
            onChange={props.setRange}
          />
        </div>
      )
    default:
      return (
        <div>error</div>
      )
  }  
}
