import * as React from "react";
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';

interface CtrlProps {
  upDate: boolean;
  setUpDate: () => void;
}

export const CtrlItem = (props: CtrlProps) =>{
  return (
    <Row type='flex' align='middle' justify='center' className='ctrlmenu'>
      <Col span={2}></Col>
      <Col span={2}> <Link className='ctrllink' to="/">Stock</Link> </Col>
      <Col span={2}> <Link className='ctrllink' to="/record">History</Link> </Col>
      <Col span={2}> <Link className='ctrllink' to="/statistic">Statistic</Link> </Col>
      <Col span={12}></Col>
      <Col span={2}>
        <Icon 
          type={ props.upDate ? 'pause' : 'caret-right' } 
          onClick={()=>{ props.setUpDate(); }}
          style={{fontSize: '32px'}} 
          className='ctrlbtn'
        />
      </Col>
      <Col span={2}></Col>
    </Row>
  )
}