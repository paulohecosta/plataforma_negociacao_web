
import React, { useEffect, useState } from 'react';
import { Button, Card, Timeline, Typography, Table } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { useService } from '../../hooks/service';
import NegotiationTableComp from '../../components/negtable';
const { Paragraph } = Typography;

const NegotiationsView = () => {

  const { myNegotiations, loadMyNegotiations } = useService();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadMyNegotiations();
  }, []);

  useEffect(() => {
    if (myNegotiations && myNegotiations.negotiations) {
      setData(myNegotiations.negotiations);
    }
  }, [myNegotiations]);

  return (
    <div>
      <NegotiationTableComp data={data} />
    </div>
  )
}

export default NegotiationsView;