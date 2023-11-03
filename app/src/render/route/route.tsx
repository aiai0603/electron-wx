import {
  MessageOutlined,
  ContactsFilled,
  MessageFilled,
  ContactsOutlined,
  SettingOutlined,
  SettingFilled,
} from "@ant-design/icons";
import Chat from "../pages/chat";
import Friend from "../pages/friend";
import Login from "../pages/login";
import Register from "../pages/register";
import Setting from "../pages/setting";
import AddFriend from "../pages/addfriend";
import FreApplication from "../pages/FreApplication";
const routes = [
  {
    path: "/login",
    type: "hidden",
    element: <Login />,
    key: "登录",
  },
  {
    path: "/user",
    type: "hidden",
    element: <Login />,
    key: "用户信息",
  },
  {
    path: "/register",
    type: "hidden",
    element: <Register />,
    key: "注册",
  },
  {
    path: "/addfriend",
    type: "hidden",
    element: <AddFriend />,
    key: "添加好友",
  },
  {
    path: "/friendApplication",
    type: "hidden",
    element: <FreApplication />,
    key: "好友申请",
  },
  {
    path: "/",
    type: "top",
    icon: <MessageOutlined rev={undefined} />,
    activeIcon: <MessageFilled rev={undefined} />,
    element: <Chat />,
    auth: true,
    key: "消息",
  },
  {
    path: "/communication",
    type: "top",
    icon: <ContactsOutlined rev={undefined} />,
    activeIcon: <ContactsFilled rev={undefined} />,
    element: <Friend />,
    auth: true,
    key: "联系人",
  },
  {
    path: "/setting",
    type: "bottom",
    icon: <SettingOutlined rev={undefined} />,
    activeIcon: <SettingFilled rev={undefined} />,
    element: <Setting />,
    auth: true,
    key: "设置",
  },
];

export default routes;
