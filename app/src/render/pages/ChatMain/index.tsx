import {
  FolderOpenOutlined,
  MoreOutlined,
  SmileOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import "./index.less";
import { Resizable } from "re-resizable";
import TextArea from "antd/es/input/TextArea";
import { Button, message } from "antd";
import { Request, baseURL } from "../../http/axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSocket } from "@/render/socket/socket";
import { useAuth } from "@/render/auth/auth";
import { db } from "@/render/store/db";

interface paramsProps {
  data: any;
  handleShowDraw: any;
}
function ChatMain(prop: paramsProps) {
  const auth = useAuth();
  const socket = useSocket();
  const userId = prop.data.id;
  const [user, setUser] = useState<any>({});
  const [text, setText] = useState<string>("");
  const inputRef = useRef<any>(null);

  const [msg, setMsg] = useState<any[]>([]);

  const getData = () => {
    if (!prop.data.group) {
      userId &&
        Request({
          url: "/friend/user/" + userId,
          method: "get",
        })
          .then(async (res: any) => {
            if (res && res.code == "200") {
              res.data.length > 0 && setUser(res.data[0]);
            } else {
              message.error(res.message);
            }
          })
          .catch((err) => {
            message.error(err.message);
          });
    } else {
    }
  };

  const handleSendMsg = async () => {
    if (!text || !text.length) {
      message.error("请输入信息！");
      return;
    }

    let name = "1111";
    let age = 1;
    const id = await db.friends.add({
      name,
      age,
    });
    console.log(1);

    let talk = {
      from: auth.user.user,
      to: user.id,
      msg: text,
    };
    socket.socket.emit("socketTest", talk);
    msg.push(talk);
    setMsg([...msg]);
    setText("");
  };

  useEffect(() => {
    socket.socket?.on("socketTest2", (data: any) => {
      msg.push(data);
      setMsg([...msg]);
    });

    return () => {
      socket.socket?.off("socketTest2");
    };
  }, []);

  useEffect(() => {
    getData();
  }, [prop.data]);

  function changeTextArea(e: any): void {
    setText(e.target.value);
  }

  return (
    <div className="chat-main">
      <div className="chat-test">111111111</div>
      <div className="chat-main-header">
        <div className="chat-main-name">
          <div className="chat-main-title">
            {!user.friendName || user.friendName === ""
              ? user.name
              : user.friendName}
          </div>
          <div className="chat-main-nick">{user.name}</div>
        </div>
        <div className="chat-main-logo">
          <MoreOutlined
            rev={undefined}
            rotate={90}
            onClick={() => {
              prop.handleShowDraw();
            }}
          />
        </div>
      </div>
      <div className="chat-main-content">
        {msg.map((item: any, index: number) => {
          return item.from.userId !== auth.user.user.userId ? (
            <div className="chat-box">
              <img src={item.from.userAvater} alt="" className="chat-box-img" />
              <div className="chat-box-item" key={index}>
                <p>{item.msg}</p>
              </div>
            </div>
          ) : (
            <div className="chat-box-mine">
              <div className="chat-box-mine-item" key={index}>
                <p>{item.msg}</p>
              </div>
              <img
                src={item.from.userAvater}
                alt=""
                className="chat-box-mine-img"
              />
            </div>
          );
        })}
      </div>
      <Resizable
        className="chat-main-area"
        maxHeight={400}
        minHeight={120}
        defaultSize={{ height: 250, width: "100%" }}
        enable={{
          top: true,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <div className="chat-main-tool">
          <div className="chat-main-tool-item">
            <SmileOutlined rev={undefined} />
          </div>
          <div className="chat-main-tool-item">
            <WhatsAppOutlined rev={undefined} />
          </div>
          <div className="chat-main-tool-item">
            <FolderOpenOutlined rev={undefined} />
          </div>
        </div>
        <TextArea
          value={text}
          ref={inputRef}
          onChange={(e) => changeTextArea(e)}
          autoFocus
          className="chat-main-textarea"
          style={{ resize: "none" }}
          bordered={false}
          onPressEnter={() => handleSendMsg()}
        />
        <div className="chat-main-submit">
          <Button
            className="submit-button"
            type="text"
            onClick={() => handleSendMsg()}
          >
            Send
          </Button>
        </div>
      </Resizable>
    </div>
  );
}

export default ChatMain;
