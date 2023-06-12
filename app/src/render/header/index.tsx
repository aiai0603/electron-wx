import { CloseOutlined , MinusOutlined,BorderOutlined } from "@ant-design/icons";
import "./index.less";
import { AuthStatus } from "@/render/auth/auth";

function MyHeader() {

  const handleMin = () => {
    window.headerApi.handleMin();
  } 
  const handleMax = () => {
    window.headerApi.handleMax();
  } 
  const handleClose = () => {
    window.headerApi.handleClose();
  } 
  return (
    <div className="header">
      <div className={ AuthStatus() ?'header-left': 'header-left-main'}    >

        <div className="header-left-span">

        </div>
      </div>

      <div className="header-right">
        <span onClick={() => {  handleMin() }}> <MinusOutlined rev={undefined} /> </span>
        <span onClick={() => {  handleMax() }}> <BorderOutlined rev={undefined} /> </span>
        <span onClick={() => {  handleClose() }}> <CloseOutlined rev={undefined} /> </span>
      </div>
    </div>
  );
}

export default MyHeader;
