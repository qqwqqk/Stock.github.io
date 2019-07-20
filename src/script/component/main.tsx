import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';

import { MainState } from '../store';
import { HistoryState, RecordState } from '../store/types';
import { addHistory, addRecord } from '../store/actions';

import { Layout, Row, Col, Icon} from 'antd';

import { InfoItem } from './infoitem';
import { CtrlItem } from './ctrlitem';
import { StockShow } from './stockshow';

import '../../style/index.css'; 

const { Header, Content, Footer } = Layout;

interface MainProps {
  HistoryState: HistoryState;
  RecordState: RecordState;
  addHistory: typeof addHistory;
  addRecord: typeof addRecord;
}

const history = () => (<div>history</div>);
const statistic = () => (<div>statistic</div>);

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
      const stockwatch = setInterval(() => this.stockWatch(), 60 );
      this.setState({stockwatch, isReady: true});
    }, 0);
  }

  stockWatch = () => {
    if(this.state.isUpdate){
      const timestamp = new Date().getTime();
      const currprice = Math.trunc( 100 * (0.8 + 0.4 * Math.random()) );

      this.props.addHistory(timestamp, currprice);
      // console.log(this.props.HistoryState);

      if(this.state.showRange[0] === 0 && this.state.showRange[1] === 1){
        this.setState({showRange:[timestamp, timestamp + 2 * 1000]})
      }
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
          <Header style={{ background: 'transparent', margin: '0 12%', minWidth: 720}}>
            { InfoItem() }
          </Header>
          <Content style={{ background: 'transparent' , margin: '0 20%', minWidth: 600}}>      
            <Switch>
              <Route path="/history" component={history} />
              <Route path="/statistic" component={statistic} />
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
          <Footer style={{ background: 'transparent' , margin: '0 12%', minWidth: 720}}>
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
  HistoryState: state.historyState,
  RecordState: state.recordState
})

export default connect(
  mapStateToProps,
  { addHistory, addRecord }
)(Main);