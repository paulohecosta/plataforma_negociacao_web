
import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Table } from 'antd';
import { Select, Form, InputNumber } from 'antd';
import { useService } from '../../hooks/service';
import { useHistory } from 'react-router';
import { RPATHS } from '../../router';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const CessaoProposalView = () => {

  const [form] = Form.useForm();
  const [customer, setCustomer] = useState(null);
  const { push } = useHistory();
  const {
    myCurrentCustomer,
    loadMyCurrentCustomer,
  } = useService();

  const onFinish = async (values) => {
    const proposal = {
      customer_id: customer.customer_id,
      proposal_id: `${randomIntFromInterval(1, 20000)}`,
      ...values
    };
    // await createNewGiroProposal(proposal);
    alert('Nova proposta criada!!!');
    push(RPATHS.HOME);
  };

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let cnpj = params.get('cnpj');
    if (cnpj && cnpj.length > 2) {
      loadMyCurrentCustomer(cnpj);
    }
  }, []);

  useEffect(() => {
    setCustomer(myCurrentCustomer);
  }, [myCurrentCustomer]);



  const columns = [
    {
      title: 'Sacado',
      dataIndex: 'sacado',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Valor',
      dataIndex: 'amount',
    },
    {
      title: 'Outros dados',
      dataIndex: 'other',
    },
  ];
  const data = [
    {
      key: '1',
      sacado: 'John Brown',
      amount: 20000,
      other: '...',
    },
    {
      key: '2',
      sacado: 'Jim Green',
      amount: 50000,
      other: '...',
    },
    {
      key: '3',
      sacado: 'Joe Black',
      amount: 30000,
      other: '...',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };


  return (
    <Card title="Cessão de Crédito" className="cessao-color">
      {
        (customer && customer.name) ?
          <div>
            <p>Nome: {customer.name}</p>
            <p>CNPJ: {customer.customer_id}</p>
            <p>Segmento: {customer.segment}</p>
            <br />
          </div>
          :
          <></>
      }
      <Divider />
      <div>
        <Form form={form} {...layout} name="nest-messages" onFinish={onFinish}>
          <p>Simplificando Dados da Proposta:</p>
          <Form.Item label="Modalidade" name="type">
            <Select>
              <Select.Option value="COM_REGRESSO">COM REGRESSO</Select.Option>
              <Select.Option value="SEM_REGRESSO">SEM REGRESSO</Select.Option>
            </Select>
          </Form.Item>
          <Divider />
          <p>Simplificando Etapa Convênio:</p>
          <Divider />
          <p>Simplificando Etapa Recebíveis:</p>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
          <Divider />
          <p>Simplificando Etapa Crédito:</p>
          <Form.Item label="Crédito" name="credit">
            <Select>
              <Select.Option value="SIM">SIM</Select.Option>
              <Select.Option value="NAO">NÃO</Select.Option>
            </Select>
          </Form.Item>
          <Divider />
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  )
}

export default CessaoProposalView;