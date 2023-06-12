import { useState, type FC } from "react";
import { Avatar, Card, Skeleton, Statistic, Divider, Input } from "antd";
import ChatMain from "../ChatMain";
import "./index.less";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_3876279_f9c77gdokpi.js"],
});

function ChatList() {
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
          <ChatCard top={true}></ChatCard>
          <ChatCard></ChatCard>
        </div>
      )}
    </div>
  );
}

function ChatCard(prop: any) {
  return (
    <div className={prop.top ? "card-page top-chat" : "card-page"}>
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
  return (
    <div className="chat-page">
      <ChatList></ChatList>
      <ChatMain group={true} id={"1"}></ChatMain>
    </div>
  );
}
export default Chat;
