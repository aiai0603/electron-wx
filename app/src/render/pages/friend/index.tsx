import { useState, type FC } from "react";
import { Avatar, Card, Skeleton, Statistic, Divider, Input } from "antd";
import "./index.less";
import { UserAddOutlined, SearchOutlined } from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_3876279_f9c77gdokpi.js"],
});

function FriendList() {
  const [search, useSearch] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    useSearch(true);
  };

  return (
    <div className="friend-list">
      <div className="friend-list-header">
        <Input
          className="friend-search"
          placeholder="search"
          prefix={<SearchOutlined rev={undefined} />}
          allowClear
          onChange={onChange}
        />
        <div className="friend-plus">
          <UserAddOutlined rev={undefined} />
        </div>
      </div>
      {search ? (
        <div className="friend-search-result"></div>
      ) : (
        <div className="friend-list-cards">
          <div className="friend-list-title">系统功能</div>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
          <div className="friend-list-title title-divide">群聊</div>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
          <div className="friend-list-title title-divide">联系人</div>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
          <FriendCard></FriendCard>
        </div>
      )}
    </div>
  );
}

function FriendCard(prop: any) {
  return (
    <div className="card-page">
      <div className="card-left">
        <div className="card-img"></div>
      </div>
      <div className="card-right">
        <div className="card-title">
          这是一个非常非常非常非111常非常非常长的标题
        </div>
      </div>
    </div>
  );
}

function FriendMain(prop: any) {
  return <div className="friend-main"></div>;
}

function Friend() {
  return (
    <div className="friend-page">
      <FriendList></FriendList>
      <FriendMain></FriendMain>
    </div>
  );
}
export default Friend;
