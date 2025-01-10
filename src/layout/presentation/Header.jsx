import noImage from "../../assets/no-image.jpg";
import ANTDBadge from "../../shared/antd/ANTDBadge";
import ANTDDropdown from "../../shared/antd/ANTDDropdown";
import { ANTDHeader } from "../../shared/antd/ANTDLayout";
import ANTDToolTip from "../../shared/antd/ANTDTooltip";
import { ANTDSearch } from "../../shared/antd/ANTDInput";
import {
  BellFilled,
  MenuOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "../../utils/icons";
import header from "../container/header.container";
import { UseContext } from "../../context/context";

function Header({ setToggleMenu, collapsed, isDesktop }) {
  const { handleLogout, handleProfile, profileDetails } = header();
  const { profile } = { ...profileDetails };
  const user = UseContext()

  const items = [
    {
      key: "profile",
      label: <label className="cursor-pointer">Profile</label>,
      icon: <UserOutlined />,
      onClick: handleProfile,
    },
    {
      key: "logout",
      label: (
        <label className="cursor-pointer" onClick={handleLogout}>
          Logout
        </label>
      ),
      icon: <PoweroffOutlined />,
      onClick: handleLogout,
    },
  ];
  return (
    <ANTDHeader
      className="header-container"
      style={{
        width: `${collapsed && !isDesktop ? "calc(100% - 81px)" : ""}`,
      }}
    >
      <div className="d-flex gap-10" style={{ height: "64px" }}>
        <div className="nav-toggle">
          <MenuOutlined onClick={() => setToggleMenu(true)} />
        </div>
        <div
          className="right-content d-flex space-between align-center"
          style={{ flexGrow: 1 }}
        >
          <div className="username">
            <span>Welcome</span>{" "}
            <span className="user_name">
              <ANTDToolTip>
                <span className="review-text">
                  {user?.first_name}
                </span>
              </ANTDToolTip>
            </span>
          </div>
          <div className="d-flex space-between align-center gap-10">
            <ANTDSearch className="header-search"></ANTDSearch>
            <div className="notification-container">
              <BellFilled />
              <ANTDBadge count={0}>
                <span></span>
              </ANTDBadge>
            </div>
            <ANTDDropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
              arrow
            >
              <div className="profile-btn cursor-pointer">
                <img src={profile?.fileUrl || noImage} alt="profile_img" />
              </div>
            </ANTDDropdown>
          </div>
        </div>
      </div>
    </ANTDHeader>
  );
}

export default Header;
