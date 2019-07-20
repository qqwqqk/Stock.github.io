import * as React from "react";
import { Row, Col, Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';

const breadcrumbNameMap = new Map([
  ['/', 'Stock'],
  ['/history', 'History'],
  ['/statistic', 'Statistic']
]);

const BreadcrumbList = withRouter(props => {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const pathNavigation = (['/']).concat(
    pathSnippets.map((_,index)=>{ 
      return `/${pathSnippets.slice(0, index + 1).join('/')}`
     })
  )

  const listNavigation = pathNavigation.map((val)=>{
    return ( 
      <Breadcrumb.Item key={val}> 
        <Link to={val}> { breadcrumbNameMap.get(val) } </Link>
      </Breadcrumb.Item> 
    )
  })

  return ( 
    <Breadcrumb> 
      {listNavigation}
    </Breadcrumb> 
  );
})

export const InfoItem = () => {
  const url: string = "https://github.com/qqwqqk/qqwqqk.github.io";
  const target: string = "_blank";
  return (
    <Row type='flex' align='middle' className='showinfo'>
      <Col span={4} style={{textAlign:"center"}}> </Col>
      <Col span={16} style={{fontSize: '32px'}}>
        <BreadcrumbList />
      </Col>
      <Col span={4} style={{textAlign:"center"}}> 
        <Icon type="github" style={{fontSize: '32px'}} onClick={()=>{ window.open(url, target) }}/> 
      </Col>
    </Row>
  )
}
