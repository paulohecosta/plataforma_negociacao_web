
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
  const { myCurrentCustomer, loadMyCurrentCustomer, createNewGiroProposal } = useService();

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
    let foo = params.get('cnpj');
    if(foo && foo.length > 2) {
      loadMyCurrentCustomer(foo);
    }    
  }, []);

  useEffect(() => {
    setCustomer(myCurrentCustomer);
  }, [myCurrentCustomer]);

  return (
    <Card title="Giro">
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
        <Form {...layout} name="nest-messages" onFinish={onFinish}>
          <Form.Item label="Modalidade" name="type">
            <Select>
              <Select.Option value="CURTO">CURTO</Select.Option>
              <Select.Option value="MEDIO">MEDIO</Select.Option>
              <Select.Option value="LONGO">LONGO</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Taxa" name="total_tax" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Parcela" name="parcels" rules={[{ type: 'number', min: 0, max: 9999 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Valor" name="total_amount" rules={[{ type: 'number', min: 0, max: 99999999 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary">
              Consultar Taxa
            </Button>
            <span> </span>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
            <span> </span>
            <Button type="primary">
              Proximo
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  )
}

export default GiroProposalView;