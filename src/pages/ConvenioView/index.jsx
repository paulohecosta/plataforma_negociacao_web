
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import { Select, Form, InputNumber, DatePicker, Table } from 'antd';
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

const columns_gg = [
  {
    title: 'Garantia',
    dataIndex: 'garantia',
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
const data_gg = [
  {
    key: '1',
    garantia: 'Veiculos XXX',
    amount: 20000,
    other: '...',
  },
  {
    key: '2',
    garantia: 'Imovel YYY',
    amount: 50000,
    other: '...',
  },
  {
    key: '3',
    garantia: 'Investimento ZZZ',
    amount: 30000,
    other: '...',
  },
];

const CovenioView = () => {

  const [ form ] = Form.useForm();
  const [customer, setCustomer] = useState(null);
  const { push } = useHistory();
  const { 
    myCurrentCustomer, 
    loadMyCurrentCustomer,
   } = useService();

  const onFinish = async (values) => {

  };

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let cnpj = params.get('cnpj');
    if(cnpj && cnpj.length > 2) {
      loadMyCurrentCustomer(cnpj);
    } 
  }, []);

  useEffect(() => {
    setCustomer(myCurrentCustomer);
  }, [myCurrentCustomer]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  return (
    <Card title="Cadastro Convênio" className="convenio-color">
      {
        (customer && customer.name) ?
          <div>
            <p>Nome: {customer.name}</p>
            <p>CNPJ: {customer.customer_id}</p>
            <p>Segmento: {customer.segment}</p>
            <br/>
          </div>
          :
          <></>
      }
      <div>
        <Form form={form} {...layout} name="nest-messages" onFinish={onFinish}>
          <p>Simplificando Dados do Convênio:</p>
          <Form.Item label="Produto" name="product">
            <Select>
              <Select.Option value="1">GIRO</Select.Option>
              <Select.Option value="2">CESSAO CREDITO</Select.Option>
              <Select.Option value="7">RISCO SACADO</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Limite" name="limit" rules={[{ type: 'number', min: 0, max: 99999999 }]}>
            <InputNumber />
          </Form.Item>
          <p>Simplificando Etapa Garantias:</p>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns_gg}
            dataSource={data_gg}
          />
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

export default CovenioView;