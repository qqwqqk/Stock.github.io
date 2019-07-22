import { Table } from 'antd';
import React from 'react';

import { RecordState } from '../store/types';
import { toThousands } from '../store/method'

export const RecordShow = (props: RecordState) =>{
  return (
    <Table
        rowKey="timestamp"
        size="small"
        columns={Private.columns}
        dataSource={props.lists}
        onChange={Private.onChange}
        onRow={Private.onClickRow}
        rowClassName={Private.setRowClassName}
        pagination={false}
        scroll={{ y: 320 }}
      />
  )
}

namespace Private {
  export const columns = [
    {
      width: '30%',
      title: '成交时间',
      dataIndex: 'timestamp',
      render: (val: number) => <span>{new Date(val).toLocaleString()}</span>
    },
    {
      width: '10%',
      title: '方向',
      dataIndex: 'type',
      render: (val: number) => {
        if (val === 1) {
          return <span>买入</span>;
        } else {
          return <span>卖出</span>;
        }
      }
    },
    {
      width: '20%',
      title: '股票代码',
      dataIndex: 'code'
    },
    {
      width: '20%',
      title: '成交量',
      dataIndex: 'quantity',
      render: (val: number) => <span>{toThousands(val)}</span>
    },
    {
      width: '20%',
      title: '成交金额',
      dataIndex: 'amount',
      render: (val: number) => <span>{toThousands(val)}</span>
    }
  ];

  export function onChange(pagination: any, sorter: any) {
    console.log('params', pagination, sorter);
  }

  export function onClickRow(record: any) {
    return {
      onClick: () => {
        console.log(record);
      }
    };
  }

  export function setRowClassName(record: any) {
    return record.type === 1 ? 'buystyle' : 'sellstyle';
  }
}