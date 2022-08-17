
import React, { useEffect, useState } from 'react';
import { Button, Card, Timeline, Typography } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { Select, Form, Input, InputNumber, Descriptions, PageHeader } from 'antd';
import { useService } from '../../hooks/service';
import { useHistory } from 'react-router';
import { RPATHS } from '../../router';
const { Paragraph } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
    const proposal = {
      customer_id: customer.customer_id,
      proposal_id: `${randomIntFromInterval(1, 20000)}`,
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
    }    
  }, [myCurrentGiro]);

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
          <Form.Item label="Garantias" name="guarantee">
            <Select>
              <Select.Option value="SIM">SIM</Select.Option>
              <Select.Option value="NAO">NÃO</Select.Option>
            </Select>
          </Form.Item>
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