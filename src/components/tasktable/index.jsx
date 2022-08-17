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
    filters: [
      {
        text: 'GIRO',
        value: 'GIRO',
      },
      {
        text: 'CESSÃO CREDITO',
        value: 'CESSÃO CREDITO',
      },
    ],
    onFilter: (value, record) => {
      return record.product_name.indexOf(value) === 0;
    },
    sorter: (a, b) => {
      return a.product_name.length - b.product_name.length
    },
    sortDirections: ['descend'],
  },
  {
    title: 'Tarefa',
    dataIndex: 'task_type',
    key: 'task_type',
    filters: [
      {
        text: 'CREDITO',
        value: 'CREDITO',
      },
      {
        text: 'GARANTIA',
        value: 'GARANTIA',
      },
    ],
    onFilter: (value, record) => {
      return record.task_type.indexOf(value) === 0;
    },
    sorter: (a, b) => {
      return a.task_type.length - b.task_type.length
    },
    sortDirections: ['descend'],
  },
  {
    title: 'Descrição',
    dataIndex: 'task_message',
    key: 'task_message',
  },
  {
    title: 'Ações',
    dataIndex: '',
    key: 'x',
    render: (a) => {
      if (a.product_name == 'GIRO')
        return <Button href={`/products/giro?cnpj=${a.customer_id}&id=${a.proposal_id}`}>Retomar</Button>
      else
        return <></>
    },
  },
];

const TaskTableComp = (data) => {
  return (
    <>
      <p>Lista de Tarefas:</p>
      <Table columns={columns} dataSource={data.data} />
    </>
    
  )
}

export default TaskTableComp;