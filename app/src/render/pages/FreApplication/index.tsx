import {
  Button,
  Input,
  InputProps,
  InputRef,
  Space,
  Switch,
  message,
} from "antd";
import "./index.less";
import { Alert, Form } from "antd";
import { Request, baseURL } from "../../http/axios";
import { RefAttributes, SetStateAction, useState } from "react";
import { useAuth } from "@/render/auth/auth";

const MySwitch = (props: any) => (
  <div className="application-form-item">
    <p>允许对方和我聊天</p>
    <Switch {...props} />
  </div>
);

const MySwitch2 = (props: any) => (
  <div className="application-form-item">
    <p>允许对方访问朋友圈</p>
    <Switch {...props} />
  </div>
);

function FreApplication() {
  const [form] = Form.useForm();

  const [tag, setTag] = useState<string>("0");
  const searchParams = new URLSearchParams(window.location.search);
  const fid = searchParams.get("fid");
  const mid = searchParams.get("mid");
  const mode = searchParams.get("mode");

  const onFinish = (values: any) => {
    let userInfo = {
      friendFromId: mid,
      friendToId: fid,
      friendMsg: values.friendMsg ? values.friendMsg : "同意了您的申请",
      friendName: values.friendName,
      tagId: tag,
      friendChatFlag: values.state1 ? 1 : 0,
      friendVisitFlag: values.state2 ? 1 : 0,
      friendFrom: 0,
      mode: mode,
    };

    Request({
      url: "/friend/add",
      method: "post",
      data: userInfo,
    })
      .then((res: any) => {
        if (res && res.code == "200") {
          message
            .open({
              type: "success",
              content: "申请成功",
              duration: 1,
            })
            .then(() => {
              closeApplication();
            });
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const closeApplication = () => {
    mode == "add"
      ? window.friendApi.closeApplication()
      : window.friendApi.closeAgree();
  };

  const handleClickTag = (key: number, index: string) => {
    form.setFieldValue("friendTag", key);
    setTag(index);
  };
  return (
    <div className="application-main">
      <div className="application-title">好友申请</div>
      <div className="application-form">
        <Form
          name="trigger"
          style={{ width: 300 }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          {mode == "add" && (
            <Form.Item
              label="申请信息"
              name="friendMsg"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <Input placeholder="你可以提供申请信息" />
            </Form.Item>
          )}

          <Form.Item label="备注名" name="friendName">
            <Input placeholder="你可以添加对应的备注" />
          </Form.Item>

          <Form.Item label="标签" name="friendTag">
            <Input placeholder="你可以选择需要的标签" allowClear />
          </Form.Item>
          <div className="application-form-tags">
            {[
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  className="application-form-tags-item"
                  onClick={() => {
                    handleClickTag(item, index + "");
                  }}
                >
                  {index}
                </div>
              );
            })}
          </div>

          <Form.Item name="state1" valuePropName="checked">
            <MySwitch />
          </Form.Item>
          <Form.Item name="state2" valuePropName="checked">
            <MySwitch2 />
          </Form.Item>
          <Form.Item className="application-button">
            <Button
              type="primary"
              className="application-button-item"
              htmlType="submit"
            >
              Add
            </Button>
            <Button
              className="application-button-item"
              onClick={() => {
                closeApplication();
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default FreApplication;
