import { Button, Input, Space, message } from "antd";
import "./index.less";
import { Request, baseURL } from "../../http/axios";
import { SetStateAction, useState } from "react";

function AddFriend() {
  const searchParams = new URLSearchParams(window.location.search);
  const mid = searchParams.get("mid");

  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  const handleSearch = () => {
    getData();
  };

  const openApplication = (id: string) => {
    window.friendApi.openApplication(id, mid, "add");
  };

  const getData = () => {
    if (!name) {
      message.error("请输入用户名或手机号查找用户");
      return;
    }
    Request({
      url: "/user/addfriend/" + name,
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

  return (
    <div className="addfriend-page">
      <div className="addfriend-title">
        <Space direction="vertical" style={{ width: "100%" }} align="center">
          <Space.Compact>
            <Input
              className="addfriend-title-input"
              placeholder="fill username or phonenumber"
              allowClear
              value={name}
              onChange={handleInputChange}
            />
            <Button type="primary" onClick={() => handleSearch()}>
              Submit
            </Button>
          </Space.Compact>
        </Space>
      </div>
      <div className="addfriend-content">
        <div className="addfriend-content-title">
          people you want to add maybe:
        </div>
        <div className="addfriend-content-list">
          {data &&
            data.map((item: any) => {
              return (
                !(item.userId == mid) && (
                  <div className="addfriend-content-item">
                    <img
                      src={item.userAvater}
                      className="addfriend-content-img"
                    />
                    <div className="addfriend-content-words">
                      <div className="addfriend-content-name">
                        {item.userNickName}
                      </div>
                      <div className="addfriend-content-phone">
                        phone：{item.userPhone}
                      </div>
                      <div className="addfriend-content-location">
                        UserID：{item.userName}
                      </div>
                    </div>
                    <div className="addfriend-content-button">
                      <Button
                        type="primary"
                        block
                        onClick={() => {
                          openApplication(item.userId);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
