
import React, { useEffect, useState } from 'react';
import { Button, Card, Timeline, Typography, Table } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { useService } from '../../hooks/service';
import TaskTableComp from '../../components/tasktable';
const { Paragraph } = Typography;

const TasksView = () => {

  const { myTasks, loadMyTasks } = useService();
  const [data, setData] = useState([]);

  useEffect(() => {
    loadMyTasks();
  }, []);

  useEffect(() => {
    if (myTasks && myTasks.tasks) {
      setData(myTasks.tasks);
    }
  }, [myTasks]);

  return (
    <div>
      <TaskTableComp data={data} />
    </div>
  )
}

export default TasksView;