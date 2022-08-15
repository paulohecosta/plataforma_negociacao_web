import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router';
import { RPATHS } from '../../router';


const NotFoundView = () => {
  const { push } = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => { push(RPATHS.HOME) }}>Back Home</Button>}
    />
  )
}

export default NotFoundView