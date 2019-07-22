import { Statistic, Row, Col, Card, Icon } from 'antd';
import React from 'react';
import { HoldState } from '../store/types';

export const StatisticShow = (props: HoldState) =>{
  return (
    <div>
      <Row gutter={{xs: 8, sm: 16, md: 24}}>
        <Col span={12}>
        <Card>
          <Statistic
            title="买入"
            value={props.buytotal}
            precision={2}
            prefix={<Icon type="right-square" theme="twoTone" twoToneColor="#EE0000"/>}
          />
        </Card>
        </Col>
        <Col span={12}>
        <Card>
          <Statistic
            title="持仓"
            value={props.hold}
            precision={2}
            prefix={<Icon type="fund" theme="twoTone" twoToneColor="#FFB61E" />}
          />
        </Card>
        </Col>
      </Row>
      <Row gutter={{xs: 8, sm: 16, md: 24}}>
        <Col span={12}>
        <Card>
          <Statistic
            title="卖出"
            value={props.selltotal}
            precision={2}
            prefix={<Icon type="left-square" theme="twoTone" twoToneColor="#39C5BB" />}
          />
        </Card>
        </Col>
        <Col span={12}>
        <Card>
          <Statistic
            title="单价"
            value={props.price}
            precision={2}
            prefix={<Icon type="fund" theme="twoTone" twoToneColor="#FFB61E"/>}
          />
        </Card>
        </Col>
      </Row>
      <Row gutter={{xs: 8, sm: 16, md: 24}}>
        <Col span={12}>
        <Card>
          <Statistic
            title="买卖盈耗"
            value={ 
              props.buytotal > props.selltotal ? 
              props.buytotal-props.selltotal : props.selltotal-props.buytotal 
            }
            precision={2}
            prefix={
              <Icon 
                type={ props.buytotal > props.selltotal ? 'left-square' : 'right-square' } 
                theme="twoTone" twoToneColor={ props.buytotal > props.selltotal ? '#39C5BB' : '#EE0000' } 
              />
            }
          />
        </Card>
        </Col>
        <Col span={12}>
        <Card>
          <Statistic
            title="权益"
            value={props.price * props.hold}
            precision={2}
            prefix={<Icon type="fund" theme="twoTone" twoToneColor="#FFB61E"/>}
          />
        </Card>
        </Col>
      </Row>
    </div>
  )
}
