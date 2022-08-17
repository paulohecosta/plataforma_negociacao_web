import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Timeline, Typography, Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;



const NegotiationTableComp = (data) => {
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
      title: 'Proposta',
      dataIndex: 'proposal_id',
      key: 'proposal_id',
    },
    {
      title: 'Status',
      dataIndex: 'proposal_status',
      key: 'proposal_status',
      filters: [
        {
          text: 'NOVO',
          value: 'NOVO',
        },
        {
          text: 'ABERTO',
          value: 'ABERTO',
        },
      ],
      onFilter: (value, record) => {
        return record.proposal_status.indexOf(value) === 0;
      },
      sorter: (a, b) => {
        return a.proposal_status.length - b.proposal_status.length
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
      render: (a) => {
        return <>
          <Button href={`/negotations/details?negotiation_id=${a.negotiation_id}`}>Detalhes</Button><span> </span>
          {(a.product_name == 'GIRO') ?
            <Button href={`/products/giro?cnpj=${a.customer_id}&id=${a.proposal_id}`}>Retomar</Button> : <></>}
        </>
      },
    },
  ];


  return (
    <>
      <p>Lista de Negociações:</p>
      <Table columns={columns} dataSource={data.data} />
    </>
  )
}

export default NegotiationTableComp;