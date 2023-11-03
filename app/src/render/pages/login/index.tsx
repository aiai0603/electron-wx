import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input, Checkbox, Avatar, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import chatLogo from "@/render/assets/2x.png";
import { useAuth } from "@/render/auth/auth";
import "./index.less";
import { Request } from "../../http/axios";
import MD5 from "crypto-js/md5";

function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const onFinish = (values: any) => {
    Request({
      url: "/auth/getToken",
      method: "post",
      data: {
        name: values.username,
        password: MD5(values.password).toString(),
      },
    })
      .then((res: any) => {
        if (res && res.code == "200") {
          message
            .open({
              type: "success",
              content: "登陆成功",
              duration: 1,
            })
            .then(() => {
              let from = location.state?.from?.pathname || "/";
              auth.signin(res.data.data, () => {
                navigate(from, { replace: true });
              });
            });
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onHandleRegister = () => {
    window.loginApi.openRegister();
  };

  return (
    <div className="login-page">
      <div className="logo-section">
        <div>
          <a target="_blank" href="https://github.com/aiai0603">
            <img src={chatLogo} className="logo" alt="logo" />
          </a>
        </div>

        <h1>Fishing Chat</h1>
      </div>

      <div className="login-section">
        <div className="login-avatar">
          <Avatar
            size={90}
            icon={<UserOutlined rev={undefined} />}
            className="my-avatar"
          />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={
                <UserOutlined className="site-form-item-icon" rev={undefined} />
              }
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={
                <LockOutlined className="site-form-item-icon" rev={undefined} />
              }
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <div className="login-form-remember">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button type="link">Forgrt Password</Button>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <Button
              type="link"
              className="register-button"
              onClick={() => onHandleRegister()}
            >
              Do not Have a Account ? Click here to register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
