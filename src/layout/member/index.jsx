import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router';
import { RPATHS } from '../../router';

const { Header, Content, Footer } = Layout;

const MemberLayout = ({ children }) => {
  
  const { push, location } = useHistory();

  const changePath = (path) => {
    push(path);
  }

  return (
    <Layout>
      <Header>
        <div className="ant-layout-header-body">
          <Menu mode="horizontal" defaultSelectedKeys={[location.pathname]}>
          <Menu.SubMenu title="Home">
              <Menu.Item key={RPATHS.HOME} onClick={()=>changePath(RPATHS.HOME)}>Nova Negociação</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Negociações">
              <Menu.Item key={RPATHS.NEGOTATIONS} onClick={()=>changePath(RPATHS.NEGOTATIONS)}>Negociações</Menu.Item>
              <Menu.Item key={RPATHS.TASKS} onClick={()=>changePath(RPATHS.TASKS)}>Tarefas</Menu.Item>
              <Menu.Item>Busca</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="Produtos">
              <Menu.Item key={RPATHS.GIRO_PROPOSAL} onClick={()=>changePath(RPATHS.GIRO_PROPOSAL)}>Giro</Menu.Item>
              <Menu.Item>Cessão de Crédito</Menu.Item>
              <Menu.Item>Convênio</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Header>
      <Content style={{ minWidth: 1128, alignSelf: 'center', margin: '24px 0' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer :)</Footer>
    </Layout>
  )
}

export default MemberLayout;


