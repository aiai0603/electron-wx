import {
  Avatar,
  Button,
  Cascader,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Tabs,
  Upload,
  UploadFile,
  message,
} from "antd";
import "./index.less";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MD5 from "crypto-js/md5";
import { Request, baseURL } from "../../http/axios";
import { useAuth } from "@/render/auth/auth";
import { RcFile, UploadProps } from "antd/es/upload";

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

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function PrivateMsg() {
  const [form] = Form.useForm();
  let auth = useAuth();
  let [user, setUser] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({
    fileList: newFileList,
    file: newfile,
  }) => {
    if (newfile.status == "done") {
      newFileList[0].url = baseURL + "/" + newfile.response.data;
    }
    setFileList(newFileList);
  };

  const getData = () => {
    let id = auth.user.user.userId;
    Request({
      url: "/user/" + id,
      method: "get",
    })
      .then(async (res: any) => {
        if (res && res.code == "200") {
          let data = res.data;
          setUser({
            userName: data.userNickName,
            userLocal: data.userLocal.split(" "),
            userPhone: data.userPhone,
            userSex: data.userSex,
          });

          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: data.userAvater,
            },
          ]);
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onFinish = (values: any) => {
    let userInfo = {
      userAvater: fileList[0].url,
      userName: values.userName,
      userNickName: values.userName,
      userPhone: values.userPhone,
      userSex: values.userSex,
      userLocal: values.userLocal.join(" "),
    };
    if (values.userPassword != undefined && values.userPassword != "") {
      Object.assign(userInfo, {
        userPassword: MD5(values.userPassword).toString(),
      });
    }

    let id = auth.user.user.userId;

    Request({
      url: "/user/" + id,
      method: "put",
      data: userInfo,
    })
      .then((res: any) => {
        if (res && res.code == "200") {
          message
            .open({
              type: "success",
              content: "修改成功",
              duration: 1,
            })
            .then(() => {
              getData();
            });
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [user]);

  return (
    <div className="setting-page">
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      <Form
        form={form}
        name="normal_login"
        className="setting-form"
        initialValues={user}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        <Form.Item
          name="userAvatar"
          label="avatar"
          rules={[
            {
              validator: (rule, value) => {
                if (fileList.length == 0) {
                  return Promise.reject("Please upload your avatar");
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <Upload
            action={baseURL + "/test/upload"}
            listType="picture-card"
            method="post"
            name="file"
            accept=".png,.jpg,.svg"
            maxCount={2}
            defaultFileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length == 0 ? (
              <div>
                <PlusOutlined rev={undefined} />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            ) : null}
          </Upload>
        </Form.Item>
        <Form.Item
          name="userName"
          label="userName"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="userName" disabled={true} />
        </Form.Item>

        <Form.Item name="userPassword" label="password">
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="password2"
          label="confirm"
          rules={[
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

function Setting() {
  let styles = {
    width: 200,
  };

  const tabs = [
    {
      key: "1",
      label: "个人设置",
      children: <PrivateMsg></PrivateMsg>,
    },
    {
      key: "2",
      label: "消息设置",
      children: "",
    },
    {
      key: "3",
      label: "通用设置",
      children: "",
    },
    {
      key: "4",
      label: "关于软件",
      children: "",
    },
  ];

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
