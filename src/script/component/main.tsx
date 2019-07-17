import * as React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';

import { MainState } from '../store';
import { HistoryState, RecordState } from '../store/types';
import { addHistory, addRecord } from '../store/actions';

import { Layout, Row, Col, Icon, Breadcrumb } from 'antd';

import { ShowItem } from './showitem';

import '../../style/index.css'; 

const { Header, Content, Footer } = Layout;

interface MainProps {
  HistoryState: HistoryState;
  RecordState: RecordState;
  addHistory: typeof addHistory;
  addRecord: typeof addRecord;
}

class Main extends React.Component<MainProps>{
  state = { 
    isReady: false,
    isStart: false,
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
    if(this.state.isStart){
      console.log('start');
    }
  }

  render(){

    const APP1 = ()=>{return <div>app1</div>}
    const APP2 = ()=>{return <div>app2</div>}
    const APP3 = ()=>{return <div>app3</div>}
   
    if(this.state.isReady){
      // console.log(this.state.showState);
      const url: string = "https://github.com/qqwqqk/Stock.github.io";
      const target: string = "_blank";
      return (
        <Router>
          <Layout className="theme">
            <Header style={{ background: 'transparent', margin: '0 12%', minWidth: 720}}>
              <Row type='flex' align='middle' className='showinfo'>
                <Col span={4} style={{textAlign:"center"}}> </Col>
                <Col span={16} style={{fontSize: '32px'}}>
                  <Breadcrumb>
                    <Breadcrumb.Item>五月钦铭</Breadcrumb.Item>
                    <Breadcrumb.Item>test1</Breadcrumb.Item>
                  </Breadcrumb> 
                </Col>
                <Col span={4} style={{textAlign:"center"}}> 
                  <Icon type="github" style={{fontSize: '32px'}} onClick={()=>{ window.open(url, target) }}/> 
                </Col>
              </Row>
            </Header>
            <Content style={{ background: 'transparent' , margin: '0 20%', minWidth: 600}}>      
              <Switch>
                <Route path="/app1" component={APP1} />
                <Route path="/app2" component={APP2} />
                <Route path="/app3" component={APP3} />
              </Switch>
            </Content>
            <Footer style={{ background: 'transparent' , margin: '0 12%', minWidth: 720}}>
              <Row gutter={{xs: 8, sm: 16, md: 24}}>
                <Col span={20}>
                  <Link to="/app1">Application1</Link>
                  <Link to="/app2">Application2</Link>
                  <Link to="/app3">Application3</Link>
                </Col>
                <Col span={4}>
                  <Icon type={this.state.isStart ? 'pause' : 'caret-right'} className='startctrl'/>
                </Col>
              </Row>
            </Footer>
          </Layout>
        </Router>
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