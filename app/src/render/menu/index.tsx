import "./index.less";
import routes from "../route/route";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

function MyMenu() {
  const [active, useActive] = useState("消息");
  return (
    <div className="menu-layout">
      <div className="menu-top">
        <div className="menu-avatar">
          <Link
            to="/user"
            onClick={() => useActive("/user")}
          >
            <Avatar
              shape="square"
              size={40}
              icon={<UserOutlined rev={undefined} />}
            />
          </Link>
        </div>
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
