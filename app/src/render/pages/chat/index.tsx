import { useState, type FC, useEffect } from "react";
import {
  Avatar,
  Card,
  Skeleton,
  Statistic,
  Divider,
  Input,
  message,
  Drawer,
} from "antd";
import ChatMain from "../ChatMain";
import "./index.less";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { Request, baseURL } from "../../http/axios";

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_3876279_f9c77gdokpi.js"],
});




function ChatList(prop: any) {
  const [search, useSearch] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    useSearch(true);
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <Input
          className="chat-search"
          placeholder="search"
          prefix={<SearchOutlined rev={undefined} />}
          allowClear
          onChange={onChange}
        />
        <div className="chat-plus">
          <PlusOutlined rev={undefined} />
        </div>
      </div>
      {search ? (
        <div className="chat-search-result"></div>
      ) : (
        <div className="chat-list-cards">
          <ChatCard top={true} handleClick={prop.handleClick}></ChatCard>
          <ChatCard handleClick={prop.handleClick}></ChatCard>
        </div>
      )}
    </div>
  );
}

function ChatCard(prop: any) {
  const handleChat = (id: number, group: boolean) => {
    prop.handleClick({
      group: group,
      id: id,
    });
  };

  return (
    <div
      className={prop.top ? "card-page top-chat" : "card-page"}
      onClick={() => {
        handleChat(20, false);
      }}
    >
      <div className="card-left">
        <div className="card-img"></div>
      </div>
      <div className="card-right">
        <div className="card-right-header">
          <div className="card-title">
            这是一个非常非常非常非常非常非常长的标题
          </div>
          <div className="card-time">22/06/03</div>
        </div>
        <div className="card-right-footer">
          <div className="card-msg">这是一句非常非常非常发吃饭吃饭吃饭长的</div>
          <div className="card-icon">
            <IconFont type="sb-icon-xiaoximiandarao" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Chat() {
  const [data, setData] = useState({
    group: false,
    id: 4,
  });

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="chat-page">
      <Drawer closable={false} placement="right" onClose={onClose} open={open}>
        <div></div>
      </Drawer>
      <ChatList handleClick={setData}></ChatList>
      <ChatMain data={data} handleShowDraw={showDrawer}></ChatMain>
    </div>
  );
}
export default Chat;
