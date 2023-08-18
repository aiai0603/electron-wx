import "./index.less";
import routes from "../route/route";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ManOutlined, UserOutlined, WomanOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import { useAuth } from "../auth/auth";

function content() {
  let navigate = useNavigate();
  let auth = useAuth();

  const handleLoginOut = () => {
    auth.signout(() => {
      navigate("/", { replace: true });
    });
  };

  console.log(auth.user);

  return (
    <div className="msg-card">
      <div className="msg-top">
        <img className="msg-avater" src={auth.user.user.userAvater} alt="" />
        <div className="msg-info">
          <div className="msg-title">
            <p className="nick">昵称: {auth.user.user.userNickName}</p>
            {auth.user.user.userNickName ? (
              <ManOutlined rev={undefined} className="nick-sex" />
            ) : (
              <WomanOutlined  rev={undefined} className="nick-sex2"/> 
            )}
          </div>
          <p>用户名: {auth.user.user.userNickName}</p>
          <p>地区: {auth.user.user.userLocal}</p>
        </div>
      </div>
      <div className="msg-divide"></div>
      <div className="msg-button">
        <Button type="primary" onClick={() => handleLoginOut()}>
          Login out
        </Button>
      </div>
    </div>
  );
}

function MyMenu() {
  const [active, useActive] = useState("消息");
  return (
    <div className="menu-layout">
      <div className="menu-top">
        <Popover placement="rightBottom" content={content} trigger="click">
          <div className="menu-avatar">
            <div>
              <Avatar
                shape="square"
                size={40}
                icon={<UserOutlined rev={undefined} />}
              />
            </div>
          </div>
        </Popover>
        {routes.map((item, index) => {
          let activeKey = active == item.key;
          return (
            item.type === "top" && (
              <div className="menu-link" key={item.key}>
                <Link
                  to={item.path}
                  className={activeKey ? "active" : "unactive"}
                  onClick={() => useActive(item.key)}
                  title={item.key}
                >
                  {activeKey ? item.activeIcon : item.icon}
                </Link>
              </div>
            )
          );
        })}
      </div>
      <div className="menu-bottom">
        {routes.map((item, index) => {
          let activeKey = active == item.key;
          return (
            item.type === "bottom" && (
              <div className="menu-link" key={item.key}>
                <Link
                  to={item.path}
                  className={activeKey ? "active" : "unactive"}
                  onClick={() => useActive(item.key)}
                  title={item.key}
                >
                  {activeKey ? item.activeIcon : item.icon}
                </Link>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default MyMenu;
