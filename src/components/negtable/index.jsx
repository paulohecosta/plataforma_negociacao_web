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
    dataIndex: 'product_id',
    key: 'product_id',
  },
  {
    title: 'Modalidade',
    dataIndex: 'type',
    key: 'type',
  }
];

const NegotiationTableComp = (data) => {
  return (
    <Table columns={columns} dataSource={data.data} />
  )
}

export default NegotiationTableComp;