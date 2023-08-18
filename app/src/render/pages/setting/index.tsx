import {
  Avatar,
  Button,
  Cascader,
  Form,
  Input,
  Radio,
  Select,
  Tabs,
  message,
} from "antd";
import "./index.less";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import MD5 from "crypto-js/md5";
import Request from "../../http/axios";

const { Option } = Select;

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }} defaultValue="86">
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);

function PrivateMsg() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    let userInfo = {
      userName: values.userName,
      userNickName: values.userName,
      userPassword: MD5(values.userPassword).toString(),
      userPhone: values.userPhone,
      userAvater:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fci.xiaohongshu.com%2F609d2a7d-2432-0cd7-0807-92ba965965c5%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fci.xiaohongshu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1692691143&t=3492b26b1168a700841240ac277fff12",
      userSex: values.userSex,
      userLocal: values.userLocal.join(" "),
    };

    Request({
      url: "/user",
      method: "post",
      data: userInfo,
    })
      .then((res: any) => {
        if (res && res.code == "200") {
          message
            .open({
              type: "success",
              content: "更新成功",
              duration: 1,
            })
            .then(() => {
              window.loginApi.closeRegister();
            });

          // window.loginApi.closeRegister();
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="setting-page">
      <Form
        form={form}
        name="normal_login"
        className="setting-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        <Form.Item
          name="userAvatar"
          label="avatar"
          rules={[{ required: true, message: "Please submit your Avatar!" }]}
        >
          <Avatar />
        </Form.Item>
        <Form.Item
          name="userName"
          label="userName"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="userName" disabled={true} />
        </Form.Item>

        <Form.Item
          name="userPassword"
          label="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="password2"
          label="confirm"
          rules={[
            { required: true, message: "Please input your Password again!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("userPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="userPhone"
          label="Phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            () => ({
              validator(_, value) {
                var re = /^1\d{10}$/;
                if (re.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error(
                      "The Phone number that you entered do not correct!"
                    )
                  );
                }
              },
            }),
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            maxLength={11}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="userLocal"
          label="location"
          rules={[{ required: true, message: "Please choose your location!" }]}
        >
          <Cascader options={options} placeholder="Please select" />
        </Form.Item>

        <Form.Item
          name="userSex"
          label="gender"
          rules={[{ required: true, message: "Please choose your sex!" }]}
        >
          <Radio.Group>
            <Radio value={0}>male</Radio>
            <Radio value={1}>female</Radio>
            <Radio value={2}>sercet</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div className="setting-button">
            <Button
              type="primary"
              htmlType="submit"
              className="setting-button-item"
            >
              Submit
            </Button>
            <Button className="setting-button-item" onClick={onReset}>
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

let tabs = [
  {
    key: "1",
    label: "个人设置",
    children: <PrivateMsg></PrivateMsg>,
  },
  {
    key: "2",
    label: "消息设置",
    children: <PrivateMsg></PrivateMsg>,
  },
  {
    key: "3",
    label: "通用设置",
    children: <PrivateMsg></PrivateMsg>,
  },
  {
    key: "4",
    label: "关于软件",
    children: <PrivateMsg></PrivateMsg>,
  },
];

function Setting() {
  let styles = {
    width: 200,
  };

  const [activeKey, setActiveKey] = useState(tabs[0]);

  const onChange = (key: string) => {
    setActiveKey(tabs[parseInt(key) - 1]);
  };

  return (
    <div className="setting-main">
      <div className="setting-top">
        <div className="setting-divide">
          <SettingOutlined rev={undefined} />
          <div className="setting-title">设置</div>
        </div>
        <div className="setting-page-title">{activeKey.label}</div>
      </div>

      <Tabs
        tabPosition="left"
        size="large"
        items={tabs}
        tabBarStyle={styles}
        activeKey={activeKey.key}
        onChange={onChange}
      />
    </div>
  );
}

export default Setting;
