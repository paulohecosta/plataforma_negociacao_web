import React, { useEffect, useState } from 'react';
import { Button, Card, Timeline, Typography, Table } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { useService } from '../../hooks/service';
const { Paragraph } = Typography;

const columns = [
  {
    title: 'Negociação',
    dataIndex: 'negotiation_id',
    key: 'negotiation_id',
  },
  {
    title: 'CNPJ',
    dataIndex: 'customer_id',
    key: 'customer_id',
  },
  {
    title: 'Proposta',
    dataIndex: 'proposal_id',
    key: 'proposal_id',
  },
  {
    title: 'Produto',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Modalidade',
    dataIndex: 'type',
    key: 'type',
    filters: [
      {
        text: 'CURTO',
        value: 'CURTO',
      },
      {
        text: 'MEDIO',
        value: 'MEDIO',
      },
      {
        text: 'LONGO',
        value: 'LONGO',
      },
    ],
    onFilter: (value, record) => {
      return record.type.indexOf(value) === 0;
    },
    sorter: (a, b) => {
      return a.type.length - b.type.length
    },
    sortDirections: ['descend'],
  },
  {
    title: 'Ações',
    dataIndex: '',
    key: 'x',
    render: (a) => <Button href={`/products/giro?cnpj=${a.customer_id}&id=${a.proposal_id}`}>Retomar</Button>,
  },
];

const NegotiationTableComp = (data) => {
  return (
    <Table columns={columns} dataSource={data.data} />
  )
}

export default NegotiationTableComp;