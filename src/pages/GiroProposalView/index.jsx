
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

const GiroProposalView = () => {

  const [customer, setCustomer] = useState(null);
  const { push } = useHistory();
  const { 
    myCurrentCustomer, 
    loadMyCurrentCustomer, 
    createNewGiroProposal,
    myCurrentGiro,
    loadMyCurrentGiro
   } = useService();

  const onFinish = async (values) => {
    var m_proposal_id = `${randomIntFromInterval(1, 20000)}`;
    if(myCurrentGiro && myCurrentGiro.proposal) {
      m_proposal_id = myCurrentGiro.proposal.proposal_id
    }
    const proposal = {
      customer_id: customer.customer_id,
      proposal_id: m_proposal_id,
      ...values
    };
    await createNewGiroProposal(proposal);
    alert('Nova proposta criada!!!');
    push(RPATHS.HOME);
  };

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let cnpj = params.get('cnpj');
    if(cnpj && cnpj.length > 2) {
      loadMyCurrentCustomer(cnpj);
    }    
    let id = params.get('id');
    if(id && id.length > 2) {
      loadMyCurrentGiro(id);
    }   
  }, []);

  useEffect(() => {
    setCustomer(myCurrentCustomer);
  }, [myCurrentCustomer]);

  const [ form ] = Form.useForm();
  useEffect(() => {
    if(myCurrentGiro && myCurrentGiro.proposal) {
      form.setFieldsValue({ type: myCurrentGiro.proposal.type });
      form.setFieldsValue({ total_tax: myCurrentGiro.proposal.total_tax });
      form.setFieldsValue({ parcels: myCurrentGiro.proposal.parcels });
      form.setFieldsValue({ total_amount: myCurrentGiro.proposal.total_amount });
      form.setFieldsValue({ working_days: myCurrentGiro.proposal.working_days });
      form.setFieldsValue({ holidays: myCurrentGiro.proposal.holidays });
      form.setFieldsValue({ credit: myCurrentGiro.proposal.credit });
    }    
  }, [myCurrentGiro]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  return (
    <Card title="Giro" className="giro-color">
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
          <p>Simplificando Dados da Proposta:</p>
          <Form.Item label="Modalidade" name="type">
            <Select>
              <Select.Option value="CURTO">CURTO</Select.Option>
              <Select.Option value="MEDIO">MEDIO</Select.Option>
              <Select.Option value="LONGO">LONGO</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Data Inicio" name="start_date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Data Fim" name="end_date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Dias Uteis" name="working_days" rules={[{ type: 'number', min: 0, max: 999 }]}>
            <InputNumber disabled/>
          </Form.Item>
          <Form.Item label="Feriados" name="holidays" rules={[{ type: 'number', min: 0, max: 999 }]}>
            <InputNumber disabled/>
          </Form.Item>
          <p>Simplificando Etapa Preço:</p>
          <Form.Item label="Taxa" name="total_tax" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Parcela" name="parcels" rules={[{ type: 'number', min: 0, max: 9999 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Valor" name="total_amount" rules={[{ type: 'number', min: 0, max: 99999999 }]}>
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
          <p>Simplificando Etapa Crédito:</p>
          <Form.Item label="Crédito" name="credit">
            <Select>
              <Select.Option value="SIM">SIM</Select.Option>
              <Select.Option value="NAO">NÃO</Select.Option>
            </Select>
          </Form.Item>
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

export default GiroProposalView;