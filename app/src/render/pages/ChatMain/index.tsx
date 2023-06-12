import {
  FolderOpenOutlined,
  MoreOutlined,
  SmileOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import "./index.less";
import { Resizable } from "re-resizable";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";

interface paramsProps {
  group: boolean;
  id: string;
}
function ChatMain(prop: paramsProps) {
  return (
    <div className="chat-main">
      <div className="chat-main-header">
        <div className="chat-main-name">
          <div className="chat-main-title">欢乐一家人(3)</div>
          <div className="chat-main-nick">欢乐nmb</div>
        </div>
        <div className="chat-main-logo">
          <MoreOutlined rev={undefined} rotate={90} />
        </div>
      </div>
      <div className="chat-main-content"></div>
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
          autoFocus
          className="chat-main-textarea"
          style={{ resize: "none" }}
          bordered={false}
        />
        <div className="chat-main-submit">
          <Button className="submit-button" type="text"  >Send</Button>
        </div>
      </Resizable>
    </div>
  );
}

export default ChatMain;
