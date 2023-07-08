import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input, Radio, Cascader } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./index.less";
import { useEffect, useRef, useState } from "react";
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

function Register() {
  let location = useLocation();
  const scode = useRef(null);
  const [ansCode, setAnsCode] = useState(["1", "2", "3", "4"]);

  const changeAns = () => {
    var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0"; //取值范围
    var aCode = sCode.split(",");
    var aLength = aCode.length; //获取到数组的长度
    var value = [];

    for (var i = 0; i <= 3; i++) {
      var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
      var txt = aCode[j]; //得到随机的一个内容
      value[i] = txt.toLowerCase();
    }

    setAnsCode(value);
  };

  const onFinish = (values: any) => {
    let from = location.state?.from?.pathname || "/";
  };

  const code_draw = (canvas: any) => {
    var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
    canvas.width = 100;
    canvas.height = 32;
    for (var i = 0; i < ansCode.length; i++) {
      var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
      var txt = ansCode[i];
      var x = 10 + i * 20; //文字在canvas上的x坐标
      var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
      context.font = "bold 23px 微软雅黑";
      context.translate(x, y);
      context.rotate(deg);
      context.fillStyle = code_randomColor();
      context.fillText(txt, 0, 0);
      context.rotate(-deg);
      context.translate(-x, -y);
    }
    //验证码上显示线条
    for (var i = 0; i <= 5; i++) {
      context.strokeStyle = code_randomColor();
      context.beginPath();
      context.moveTo(Math.random() * 100, Math.random() * 32);
      context.lineTo(Math.random() * 100, Math.random() * 32);
      context.stroke();
    }
    //验证码上显示小点
    for (var i = 0; i <= 30; i++) {
      context.strokeStyle = code_randomColor();
      context.beginPath();
      var x = Math.random() * 100;
      var y = Math.random() * 32;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
  };

  const code_randomColor = () => {
    //得到随机的颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  useEffect(() => {
    if (scode.current != null) {
      code_draw(scode.current);
    }
  }, [ansCode]);

  useEffect(() => {
    changeAns();
  }, []);

  return (
    <div className="register-page">
      <div className="register-title"> 注册账号 </div>
      <Form
        name="normal_login"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        <Form.Item
          name="nickName"
          label="nickName"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input placeholder="nickName" />
        </Form.Item>

        <Form.Item
          name="password"
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
          ]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="local"
          label="location"
          rules={[{ required: true, message: "Please choose your location!" }]}
        >
          <Cascader options={options} placeholder="Please select" />
        </Form.Item>

        <Form.Item
          name="sex"
          label="gender"
          rules={[{ required: true, message: "Please choose your sex!" }]}
        >
          <Radio.Group>
            <Radio value={0}>male</Radio>
            <Radio value={1}>female</Radio>
            <Radio value={2}>sercet</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="code"
          label="Verification"
          rules={[{ required: true, message: "Please input code!" }]}
        >
          <div className="register-verification">
            <Input placeholder="code" />
            <canvas ref={scode} className="resgister-code"></canvas>
            <div
              className="resgister-code-change"
              onClick={() => {
                changeAns();
              }}
            >
              看不清楚? 换一个
            </div>
          </div>
        </Form.Item>

        <Form.Item>
          <div className="register-button">
            <Button
              type="primary"
              htmlType="submit"
              className="register-button-item"
            >
              Submit
            </Button>
            <Button htmlType="reset" className="register-button-item">
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
