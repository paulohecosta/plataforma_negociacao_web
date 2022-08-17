import React, { useRef, useState } from 'react';
import { Button, Tag, Typography, Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;


const TaskTableComp = (data) => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys)[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value).toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      text
    ,
  });

  const columns = [
    {
      title: 'Negociação',
      dataIndex: 'negotiation_id',
      key: 'negotiation_id',
      ...getColumnSearchProps('negotiation_id'),
    },
    {
      title: 'CNPJ',
      dataIndex: 'customer_id',
      key: 'customer_id',
      ...getColumnSearchProps('customer_id'),
    },
    {
      title: 'Prioridade',
      dataIndex: 'priority',
      key: 'priority',
      render: (a) => {
        if (a == 'HIGH')
          return <Tag color="volcano">ALTA</Tag>
        if (a == 'MEDIUM')
          return <Tag color="geekblue">MEDIA</Tag>
        else
          return <Tag color="green">BAIXA</Tag>
      },
      filters: [
        {
          text: 'ALTA',
          value: 'HIGH',
        },
        {
          text: 'MEDIA',
          value: 'MEDIUM',
        },
        {
          text: 'BAIXA',
          value: 'LOW',
        },
      ],
      onFilter: (value, record) => {
        return record.priority.indexOf(value) === 0;
      },
      sorter: (a, b) => {
        return a.priority.length - b.priority.length
      },
      sortDirections: ['descend'],
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

  return (
    <>
      <p>Lista de Tarefas:</p>
      <Table columns={columns} dataSource={data.data} />
    </>

  )
}

export default TaskTableComp;