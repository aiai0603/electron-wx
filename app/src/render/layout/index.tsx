import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthStatus } from "@/render/auth/auth";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, theme } from "antd";
import "./index.less";
import Menu from "../menu"
const { Sider, Content } = Layout;


function MyLayout() {
  let location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const Main = () => {
    return (
      <Layout style={{ height: "100%",overflow:'hidden' }}>
        <Sider
          theme="light"
          width={ 56 }
          className="main-sider"
        >
          <Menu></Menu>
        </Sider>
        <Layout style={{overflow:'hidden'}}>
          <Content
            style={{
              height:'100vh',
              overflow:'auto',
              background:colorBgContainer,
              borderRadius:'4px'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  };

  return <div className="layout">{AuthStatus() ? Main() : <Outlet />}</div>;
}

export default MyLayout;
