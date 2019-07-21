import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';

import { MainState } from '../store';
import { HoldState, HistoryState, RecordState } from '../store/types';
import { setHold, buyHold, sellHold, initHold, addRecord, addHistory } from '../store/actions';

import { Layout, Row, Col, Icon} from 'antd';

import { InfoItem } from './infoitem';
import { CtrlItem } from './ctrlitem';
import { StockShow } from './stockshow';
import { RecordShow } from './recordshow';
import { StatisticShow } from './statisticshow';

import '../../style/index.css'; 

const { Header, Content, Footer } = Layout;

interface MainProps {
  HoldState: HoldState;
  RecordState: RecordState;
  HistoryState: HistoryState;
  setHold: typeof setHold;
  buyHold: typeof buyHold;
  sellHold: typeof sellHold;
  initHold: typeof initHold;
  addRecord: typeof addRecord;
  addHistory: typeof addHistory;
}

class Main extends React.Component<MainProps>{
  state = { 
    isReady: false,
    isUpdate: false,
    showRange: [0,1]
  };

  constructor(props:any) {
    super(props);
    // console.log("main window loading");

    setTimeout(() => {
      const stockwatch = setInterval(() => this.stockWatch(), 2 * 1000 );
      this.setState({stockwatch, isReady: true});
    }, 0);
  }

  stockWatch = () => {
    if(this.state.isUpdate){
      const timestamp = new Date().getTime();
      let hold = this.props.HoldState.hold;
      let preprice = this.props.HoldState.price;

      if(this.state.showRange[0] === 0 && this.state.showRange[1] === 1){
        this.setState({showRange:[timestamp, timestamp + 20 * 1000]})
        this.props.initHold(10000,1000);
        hold = 10000; preprice = 1000;
      }

      const currprice = preprice + Math.trunc(100 * (0.4 * Math.random() - 0.2) );

      if(true){
        const size = this.state.showRange[1] - this.state.showRange[0];
        const max = timestamp > this.state.showRange[1] ? timestamp : this.state.showRange[1];
        const min = max - size;
        this.setState({showRange: [min, max]});
      }

      if( Math.random() < 0.25 ){
        const quantity = 80 + Math.trunc(40 * Math.random());
        if(hold > quantity && Math.random() < 0.5){
          this.props.sellHold(quantity,currprice);
          this.props.addRecord(timestamp,'2','2',2,currprice,quantity);
        } else {
          this.props.buyHold(quantity,currprice);
          this.props.addRecord(timestamp,'1','1',1,currprice,quantity);
        }
      }

      this.props.setHold(currprice);
      this.props.addHistory(timestamp, currprice, hold);
    }
  }

  setUpdate = () => {
    const state = this.state.isUpdate;
    this.setState({isUpdate: !state})
  }

  setRange = (value: [number, number])=>{
    this.setState({showRange: value});
  }

  render(){
    if(this.state.isReady){
      return (
        <Layout className="theme">
          <Header className="layout-header">
            { InfoItem() }
          </Header>
          <Content className="layout-content">      
            <Switch>
              <Route 
                path="/record" 
                component={()=> RecordShow(this.props.RecordState)} 
              />
              <Route 
                path="/statistic" 
                component={()=> StatisticShow(this.props.HoldState)} 
              />
              <Route 
                render={
                  () => StockShow({
                    history: this.props.HistoryState, 
                    record: this.props.RecordState,
                    showRange: this.state.showRange,
                    setRange: this.setRange
                  })
                } 
              />
            </Switch>
          </Content>
          <Footer className="layout-footer">
            { CtrlItem({upDate: this.state.isUpdate, setUpDate: this.setUpdate}) }
          </Footer>
        </Layout>
      )
    } else {
      // console.log(this.state.progress);
      return (
        <Layout className="theme">
          <Header style={{ background: 'transparent' , textAlign: 'center'}}></Header>
          <Content style={{ background: 'transparent' , textAlign: 'center' , margin: '0 10%'}}>
            <Row gutter={{xs: 8, sm: 16, md: 24}}>
              <Col span={24}>
                <Icon type='loading' style={{fontSize: '40px', margin:'auto'}}/>
              </Col>
            </Row>
          </Content>
          <Footer style={{ height: window.innerHeight / 10, background: 'transparent' , textAlign: 'center'}}></Footer>
        </Layout>
      )
    }
  }
}

const mapStateToProps = (state: MainState) =>({
  HoldState: state.holdState,
  RecordState: state.recordState,
  HistoryState: state.historyState
})

export default connect(
  mapStateToProps,
  { setHold, buyHold, sellHold, initHold, addRecord, addHistory }
)(Main);