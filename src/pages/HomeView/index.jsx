
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useService } from '../../hooks/service';
import NegotiationTableComp from '../../components/negtable';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const HomeView = () => {

  const [customer, setCustomer] = useState(null);
  const [customerNegs, setCustomerNegs] = useState(null);
  const { myCurrentCustomer, loadMyCurrentCustomer, myCurrentCustomerNegs, loadMyCurrentCustomerNegs } = useService();

  const loadCustomer = (values) => {
    loadMyCurrentCustomer(values.cnpj);
    loadMyCurrentCustomerNegs(values.cnpj);
  };

  useEffect(() => {
    setCustomer(myCurrentCustomer);
  }, [myCurrentCustomer]);

  useEffect(() => {
    if(myCurrentCustomerNegs && myCurrentCustomerNegs.negotiations) {
      setCustomerNegs(myCurrentCustomerNegs.negotiations);
    }    
  }, [myCurrentCustomerNegs]);

  return (
    <div>
      <Card title="Consultar Cliente">
        <Form {...layout} name="nest-messages" onFinish={loadCustomer}>
          <Form.Item label="CNPJ" name="cnpj">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Buscar
            </Button>
          </Form.Item>
        </Form>
        {
          (customer && customer.name) ?
            <div>
              <Card title={customer.name}>
                <p>CNPJ: {customer.customer_id}</p>
                <p>Segmento: {customer.segment}</p>
                <p>Habilitado a Contratar:</p>
                <Button type="primary" href={`/products/giro?cnpj=${customer.customer_id}`}>
                  Giro
                </Button>
                <span> </span>
                <Button type="primary" href={`/products/cessao?cnpj=${customer.customer_id}`}>
                  Cessão de Crédito
                </Button>
                <span> </span>
                <Button type="primary" href={`/products/fianca?cnpj=${customer.customer_id}`}>
                  Fiança
                </Button>
                <span> </span>
                <Button type="primary" href={`/products/finimp?cnpj=${customer.customer_id}`}>
                  Finimp
                </Button>
                <p><br/></p>
                <p>Outros Serviços:</p>
                <Button type="primary" href={`/services/convenio?cnpj=${customer.customer_id}`}>
                  Convênio
                </Button>
              </Card>
              <br/>
              {
                customerNegs ? 
                <div>
                  <p>Negociações abertas:</p>
                  <NegotiationTableComp data={customerNegs}></NegotiationTableComp>
                </div>
                :
                <></>
              }
            </div>
            :
            <></>
        }
      </Card>
    </div>
  )
}

export default HomeView;