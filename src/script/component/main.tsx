import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { MainState } from '../store';
import { HistoryState, RecordState } from '../store/types';
import { addHistory, addRecord } from '../store/actions';

import { Layout, Row, Col, Icon, Breadcrumb } from 'antd';

import '../../style/index.css'; 

const { Header, Content, Footer } = Layout;

interface MainProps {
  HistoryState: HistoryState;
  RecordState: RecordState;
  addHistory: typeof addHistory;
  addRecord: typeof addRecord;
}

interface NavigationProps {
  link: string;
  show: string;
  component: JSX.Element;
}

const stock = () => (<div>home</div>);
const history = () => (<div>history</div>);
const statistic = () => (<div>statistic</div>);

const navigationList: Array<NavigationProps> = [
  {link:'/', show:'', component: stock()},
  {link:'/history', show:'history', component: history()},
  {link:'/statistic', show:'statistic', component: statistic()},
];

class Main extends React.Component<MainProps>{
  state = { 
    isReady: false,
    isStart: false,
    breadcrumbItems: '/'
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

  getBreadcrumb = (path: string) => {
    let showcache = '/';
    for(let item of navigationList){
      if(path === item.link){showcache = item.show; break; }
    }

    const home = (<Breadcrumb.Item key="home"> <Link to="/">stock</Link> </Breadcrumb.Item> );
    

    const pathsplit = showcache.split('/');
    const extraBreadcrumbItems = pathsplit.map((_, index)=>{
      const url = `/${pathsplit.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{url}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">stock</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    return <Breadcrumb>{...breadcrumbItems}</Breadcrumb>;
  }

  render(){
    if(this.state.isReady){
      // console.log(this.state.showState);
      const url: string = "https://github.com/qqwqqk/Stock.github.io";
      const target: string = "_blank";
      return (
        <Layout className="theme">
          <Header style={{ background: 'transparent', margin: '0 12%', minWidth: 720}}>
            <Row type='flex' align='middle' className='showinfo'>
              <Col span={4} style={{textAlign:"center"}}> </Col>
              <Col span={16} style={{fontSize: '32px'}}>
                {this.getBreadcrumb(this.state.breadcrumbItems)}
              </Col>
              <Col span={4} style={{textAlign:"center"}}> 
                <Icon type="github" style={{fontSize: '32px'}} onClick={()=>{ window.open(url, target) }}/> 
              </Col>
            </Row> 
          </Header>
          <Content style={{ background: 'transparent' , margin: '0 20%', minWidth: 600}}>      
            <div className="demo">
              <div className="demo-nav">
                <Link to="/" onClick={()=>{this.setState({breadcrumbItems: '/'})}}>Home</Link>
                <Link to="/from" onClick={()=>{this.setState({breadcrumbItems: '/from'})}}>from</Link>
                <Link to="/table" onClick={()=>{this.setState({breadcrumbItems: '/table'})}}>table</Link>
              </div>
              <Switch>
                <Route path="/table" component={table} />
                <Route path="/from" component={from} />
                <Route render={home} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ background: 'transparent' , margin: '0 12%', minWidth: 720}}>
            <Row gutter={{xs: 8, sm: 16, md: 24}}>
              <Col span={20}> </Col>
              <Col span={4}>
                <Icon type={this.state.isStart ? 'pause' : 'caret-right'} className='startctrl'/>
              </Col>
            </Row>
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