import React from "react";
import { Suspense, memo, useCallback } from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

import ANTDLayout, {
  ANTDSider,
  ANTDContent,
  ANTDFooter,
} from "../../shared/antd/ANTDLayout";
import ANTDButton from "../../shared/antd/ANTDButton";
import ANTDToolTip from "../../shared/antd/ANTDTooltip";
import ANTDMenu from "../../shared/antd/ANTDMenu";
import ANTDSpin from "../../shared/antd/ANTDSpin";
import logo from "../../assets/logo.png";
import appLayout from "../container/appLayout";
import {
  CloseCircleOutlined,
  RightOutlined,
  LeftOutlined,
} from "../../utils/icons";
import "../layout.scss";
import "../../components/login/auth.scss";
import Header from "./Header";

const AppLayout = () => {
  const {
    defaultOpenKeys,
    activeItem,
    items,
    ref,
    isDesktop,
    toggleMenu,
    collapsed,
    toggleCollapsed,
    setToggleMenu,
    handleMenu,
  } = appLayout();

  const transformMenuItems = useCallback(
    (menus) =>
      menus.map((menu) => {
        const { key, label, icon: Icon, children } = menu;

        const transformedMenu = {
          key,
          label: <ANTDToolTip className="sidebar-menus">{label}</ANTDToolTip>,
          icon: Icon ? (
            <Icon style={{ fontSize: "16px", color: "black" }} />
          ) : null,
        };

        if (Array.isArray(children) && children.length > 0) {
          transformedMenu.children = transformMenuItems(children);
        }

        return transformedMenu;
      }),
    []
  );

  return (
    <div ref={ref}>
      <ANTDSider
        theme="light"
        className={classNames({
          "collapsed-sider": collapsed,
          "expanded-sider": !collapsed,
          "sidebar-open": toggleMenu,
          "mobile-view-sider": !isDesktop || toggleMenu,
        })}
        collapsed={isDesktop ? collapsed : false}
      >
        <div className="brand-logo">
          <img src={logo} alt="Vgo" />
        </div>
        <ANTDMenu
          className="custom-menu"
          theme="light"
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={[activeItem]}
          items={transformMenuItems(items)}
          onClick={handleMenu}
          collapsed={true}
          inlineCollapsed={collapsed}
        />
      </ANTDSider>
      <ANTDButton
        onClick={toggleCollapsed}
        className={classNames(
          "ant-menu-collapse",
          "d-flex",
          "justify-center",
          "align-center",
          {
            "ant-menu-collapse-dimensions": collapsed,
            "ant-menu-uncollapse-dimensions": !collapsed,
            "ant-menu-collapse-mobile": true,
          }
        )}
      >
        {collapsed ? (
          <RightOutlined
            className={classNames("fold_icon", "justify-center")}
          />
        ) : (
          <LeftOutlined className={classNames("fold_icon", "justify-center")} />
        )}
      </ANTDButton>
      <ANTDLayout
        className="main-layout"
        style={{
          marginLeft: `${collapsed ? "81px" : "255px"}`,
        }}
      >
        <Header
          setToggleMenu={setToggleMenu}
          collapsed={collapsed}
          isDesktop={isDesktop}
        />
        {(!isDesktop || toggleMenu) && (
          <div
            className={classNames("close-sidebar", {
              "close-open": toggleMenu && collapsed,
              "close-none": !toggleMenu,
            })}
          >
            <CloseCircleOutlined
              className="mob-menu-back"
              onClick={() => setToggleMenu(false)}
            />
          </div>
        )}
        <div className="content-background"></div>
        <ANTDContent className="d-flex align-center justify-center content">
          <Suspense
            fallback={
              <div className="lazy-loader">
                <ANTDSpin size="large" />
                <span>Loading...</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </ANTDContent>
        <ANTDFooter className="footer">
          <span>©{new Date().getFullYear()} Vgo</span>
        </ANTDFooter>
      </ANTDLayout>
    </div>
  );
};

export default memo(AppLayout);
