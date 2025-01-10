import { WarningOutlined } from "@ant-design/icons";

const PageNotFound = ({ message = "Page Not Found" }) => {
  return (
    <div className="not-found">
      <div className="not-found-img">
        <WarningOutlined />
      </div>
      <h4 fontSize="20px">{message}</h4>
    </div>
  );
};

export default PageNotFound;
