import { useState, type FC } from "react";
import {
  Avatar,
  Card,
  Skeleton,
  Statistic,
  Divider,
  Input,
  Button,
} from "antd";
import "./index.less";
import {
  UserAddOutlined,
  SearchOutlined,
  MoreOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
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
  return prop && prop.group ? (
    <GroupMain></GroupMain>
  ) : (
    <SingleMain></SingleMain>
  );
}

function SingleMain(prop: any) {
  return (
    <div className="friend-main-single">
      <div className="friend-main-card">
        <div className="single-header">
          <div className="single-avater">
            <div className="single-img"></div>
          </div>
          <div className="single-info">
            <div className="single-info-nick">这个是一个称呼 <ManOutlined rev={undefined} className="single-info-sex"/> <WomanOutlined  rev={undefined} className="single-info-sex2"/> </div>
            <div className="single-info-item">昵称：我是一头猪</div>
            <div className="single-info-item">账号：1234567</div>
            <div className="single-info-item">地区：浙江嘉兴</div>
          </div>
          <div className="single-more">
            <MoreOutlined rev={undefined} rotate={90} />
          </div>
        </div>
        <div className="single-main">
          <div className="single-main-item">
            <div className="single-main-name"> 备注名 </div>
            <div className="single-main-word">
              哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
          </div>
          <div className="single-main-item">
            <div className="single-main-name"> 备注名 </div>
            <div className="single-main-word">
              哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
          </div>
          <div className="single-main-item">
            <div className="single-main-name"> 备注名 </div>
            <div className="single-main-word">
              哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
            </div>
          </div>
        </div>
        <div className="single-bottom">
          <Button type="primary" className="single-button">
            发消息
          </Button>
        </div>
      </div>
    </div>
  );
}

function GroupMain(prop: any) {
  const friend = [
    {
      name: "1111111111111111",
    },
    {
      name: "1111",
    },
    {
      name: "11",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
    {
      name: "1111",
    },
  ];
  return (
    <div className="friend-main">
      <div className="friend-main-header">
        <div className="friend-main-name">
          <div className="friend-main-title">欢乐一家人(3)</div>
          <div className="friend-main-nick">欢乐nmb</div>
        </div>
      </div>
      <div className="friend-main-list">
        {friend.map((item, index) => {
          return (
            <div className="friend-main-list-item" key={index}>
              <div className="friend-main-list-img">
                <div className="list-img"></div>
              </div>
              <div className="friend-main-list-name">{item.name}</div>
            </div>
          );
        })}
      </div>
      <div className="friend-main-bottom">
        <Button type="primary" className="friend-main-button">
          发消息
        </Button>
      </div>
    </div>
  );
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
