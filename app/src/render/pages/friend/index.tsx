import { useState, type FC, useEffect, SetStateAction } from "react";
import {
  Avatar,
  Card,
  Skeleton,
  Statistic,
  Divider,
  Input,
  Button,
  message,
} from "antd";
import "./index.less";
import {
  UserAddOutlined,
  SearchOutlined,
  MoreOutlined,
  ManOutlined,
  WomanOutlined,
  ArrowLeftOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { createFromIconfontCN } from "@ant-design/icons";
import { Request, baseURL } from "../../http/axios";
import { useAuth } from "@/render/auth/auth";

const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_3876279_f9c77gdokpi.js"],
});

function FriendList(prop: any) {
  const [search, setSearch] = useState(false);

  const [single, setSingle] = useState([]);
  let auth = useAuth();
  let id = auth.user.user.userId;
  const getData = () => {
    Request({
      url: "/friend/" + id,
      method: "get",
    })
      .then(async (res: any) => {
        if (res && res.code == "200") {
          setSingle(res.data);
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleAddFriend = () => {
    window.friendApi.openRegister(id);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(true);
  };

  useEffect(() => {
    getData();
  }, []);

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
          <UserAddOutlined rev={undefined} onClick={() => handleAddFriend()} />
        </div>
      </div>
      {search ? (
        <div className="friend-search-result"></div>
      ) : (
        <div className="friend-list-cards">
          <div className="friend-list-title">系统功能</div>
          <FriendCard
            link="new"
            mod="new"
            hanleChangeMod={(
              value: SetStateAction<{ type: string; id: number }>
            ) => {
              prop.hanleChangeMod(value);
            }}
          ></FriendCard>
          <div className="friend-list-title title-divide">群聊</div>
          <FriendCard
            mod="group"
            link={111}
            hanleChangeMod={(
              value: SetStateAction<{ type: string; id: number }>
            ) => {
              prop.hanleChangeMod(value);
            }}
          ></FriendCard>
          <div className="friend-list-title title-divide">联系人</div>
          {single.map((item: any, index: number) => {
            return (
              <FriendCard
                key={index}
                mod="single"
                link={item}
                hanleChangeMod={(
                  value: SetStateAction<{ type: string; id: number }>
                ) => {
                  prop.hanleChangeMod(value);
                }}
              ></FriendCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FriendCard(prop: any) {
  const [title, setTitle] = useState({
    name: "1111",
    img: "1111",
    link: "",
  });
  useEffect(() => {
    if (prop.mod == "new") {
      setTitle({
        name: "新的朋友",
        img: "http://localhost:3000/public/new_friend.png",
        link: prop.link,
      });
    } else {
      let link = prop.link;
      setTitle({
        name: link.name? link.name : link.nickName,
        img: link.avatar,
        link: link.id,
      });
    }
  }, []);

  function showFriend(): void {
    if (prop.mod == "new") {
      prop.hanleChangeMod({
        type: "new",
        id: 0,
      });
    } else if (prop.mod == "single") {
      prop.hanleChangeMod({
        type: "single",
        id: prop.link.id,
      });
    } else if (prop.mod == "group") {
      prop.hanleChangeMod({
        type: "group",
        id: prop.link.id,
      });
    }
  }

  return (
    <div className="card-page" onClick={showFriend}>
      <div className="card-left">
        <img src={title.img} alt="logo" className="card-img" />
      </div>
      <div className="card-right">
        <div className="card-title">{title.name}</div>
      </div>
    </div>
  );
}

function FriendMain(prop: any) {
  if (prop && prop.mod) {
    if (prop.mod.type == "new") {
      return <NewMain></NewMain>;
    } else if (prop.mod.type == "single") {
      return <SingleMain id={prop.mod.id}></SingleMain>;
    } else if (prop.mod.type == "group") {
      return <GroupMain></GroupMain>;
    } else {
      return (
        <div className="start-page">
          <div className="start-page-item">
            <UserOutlined rev={undefined} className="start-page-logo" />
            <div>my friend</div>
          </div>
        </div>
      );
    }
  }

  return null;
}

function NewMain(prop: any) {
  let [shadow, setshadow] = useState(false);
  let [index, setIndex] = useState(0);
  let [data, setData] = useState([]);
  let auth = useAuth();

  const handleShowDetail = (index: number) => {
    if (
      (data[index] && (data[index] as any).state == 1) ||
      (data[index] as any).state == 0
    ) {
      setshadow(true);
    }
    setIndex(index);
  };

  const getData = () => {
    let id = auth.user.user.userId;
    Request({
      url: "/friend/apply/" + id,
      method: "get",
    })
      .then(async (res: any) => {
        if (res && res.code == "200") {
          setData(res.data);
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="new-main">
      <div className="new-main-header">
        <div className="new-main-name">
          {!shadow ? (
            <div className="new-main-title">新的朋友</div>
          ) : (
            <ArrowLeftOutlined
              rev={undefined}
              className="new-main-back"
              onClick={() => {
                setshadow(false);
              }}
            />
          )}
        </div>
      </div>
      {!shadow ? (
        <div className="new-main-list">
          {data.map((item: any, idx: number) => {
            return (
              <div
                className="new-main-item"
                key={item.id}
                onClick={() => handleShowDetail(idx)}
              >
                <img className="new-main-avatar" src={item.avatar}></img>
                <div className="new-main-words">
                  <div className="new-main-nick">{item.nickName}</div>
                  <div className="new-main-msg">{item.msg}</div>
                </div>
                <div className="new-main-button">
                  {item.state == 0 ? (
                    <Button type="primary">Add</Button>
                  ) : item.state == 1 ? (
                    "已添加"
                  ) : (
                    "已拒绝"
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="new-main-friend">
          {data[index] && (data[index] as any).state == 1 ? (
            <SingleMain id={(data[index] as any).id}></SingleMain>
          ) : (
            <ApplyMain
              data={data[index]}
              handleClose={() => {
                setshadow(false);
                getData();
              }}
            ></ApplyMain>
          )}
        </div>
      )}
    </div>
  );
}

function ApplyMain(prop: any) {
  useEffect(() => {
    // 在组件挂载后注册消息监听
    window.friendApi.closeModal(() => {
      handleClose();
    });
  }, []);

  let data = prop.data;
  let handleClose = prop.handleClose;
  let auth = useAuth();
  let mid = auth.user.user.userId;

  const openApplication = (id: string) => {
    window.friendApi.openAgree(id, mid, "agree");
  };

  const handleRefuse = () => {
    Request({
      url: "/friend/refuse/" + data.id,
      method: "get",
    })
      .then(async (res: any) => {
        if (res && res.code == "200") {
          handleClose();
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <div className="friend-main-single">
      <div className="friend-main-card">
        <div className="single-header">
          <div className="single-avater">
            <img className="single-img" src={data.avatar}></img>
          </div>
          <div className="single-info">
            <div className="single-info-nick">
              {data.name}
              {data.sex == 0 ? (
                <ManOutlined rev={undefined} className="single-info-sex" />
              ) : (
                <WomanOutlined rev={undefined} className="single-info-sex2" />
              )}
            </div>
            <div className="single-info-item">账号：{data.name}</div>
            <div className="single-info-item">地区：{data.local}</div>
          </div>
        </div>
        <div className="single-main">
          <div className="single-main-item">
            <div className="single-main-name"> 签名 </div>
            <div className="single-main-word">{data.sign}</div>
          </div>
          <div className="single-main-item">
            <div className="single-main-name"> 验证信息 </div>
            <div className="single-main-word">{data.msg}</div>
          </div>
        </div>
        <div className="single-bottom">
          <Button
            type="primary"
            className="single-button"
            onClick={() => {
              openApplication(data.friend);
            }}
          >
            同意
          </Button>
          <Button
            type="primary"
            danger
            className="single-button"
            onClick={() => {
              handleRefuse();
            }}
          >
            拒绝
          </Button>
        </div>
      </div>
    </div>
  );
}

function SingleMain(prop: any) {
  let [data, setData] = useState<any>(null);

  const getData = () => {
    let id = prop.id;
    Request({
      url: "/friend/user/" + id,
      method: "get",
    })
      .then(async (res: any) => {
        if (res && res.code == "200") {
          res.data.length > 0 && setData(res.data[0]);
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return data && (
    
    <div className="friend-main-single">
      <div className="friend-main-card">
        <div className="single-header">
          <div className="single-avater">
            <img className="single-img" src={data.avatar}></img>
          </div>
          <div className="single-info">
            <div className="single-info-nick">
              {data.friendName ? data.friendName : data.nickName}{" "}
              {data.sex == 0 ? (
                <ManOutlined rev={undefined} className="single-info-sex" />
              ) : (
                <WomanOutlined rev={undefined} className="single-info-sex2" />
              )}
            </div>
            <div className="single-info-item">昵称：{data.nickName}</div>
            <div className="single-info-item">账号：{data.name}</div>
            <div className="single-info-item">地区：{data.local}</div>
          </div>
          <div className="single-more">
            <MoreOutlined rev={undefined} rotate={90} />
          </div>
        </div>
        <div className="single-main">
          <div className="single-main-item">
            <div className="single-main-name"> 备注名 </div>
            <div className="single-main-word">{data.friendName}</div>
          </div>
          <div className="single-main-item">
            <div className="single-main-name"> 分组 </div>
            <div className="single-main-word">{data.tag}</div>
          </div>
          <div className="single-main-item">
            <div className="single-main-name"> 签名 </div>
            <div className="single-main-word">{data.sign}</div>
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
  const [mod, setMod] = useState({
    type: "start",
    id: 0,
  });

  return (
    <div className="friend-page">
      <FriendList
        hanleChangeMod={(
          value: SetStateAction<{ type: string; id: number }>
        ) => {
          setMod(value);
        }}
      ></FriendList>
      <FriendMain mod={mod}></FriendMain>
    </div>
  );
}
export default Friend;
