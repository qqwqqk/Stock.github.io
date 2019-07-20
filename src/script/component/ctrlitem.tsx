import * as React from "react";
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';

interface CtrlProps {
  upDate: boolean;
  setUpDate: () => void;
}

export const CtrlItem = (props: CtrlProps) =>{
  return (
    <Row gutter={{xs: 8, sm: 16, md: 24}}>
      <Col span={20}>
        <div className="demo-nav">
          <Link to="/">Stock</Link>
          <Link to="/history">History</Link>
          <Link to="/statistic">Statistic</Link>
        </div> 
      </Col>
      <Col span={4}>
        <Icon 
          type={ props.upDate ? 'pause' : 'caret-right' } 
          onClick={()=>{ props.setUpDate(); }}
          className='startctrl'
        />
      </Col>
    </Row>
  )
}