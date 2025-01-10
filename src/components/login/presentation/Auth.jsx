import React from "react";
import { useLocation } from "react-router-dom";
import Login from "./login";
import Signup from "./Signup";
import pathName from "../../../routing/pathName.constant";
import '../auth.scss'
const Auth = () => {
  const location = useLocation();

  const getComponent = () => {
    switch (location?.pathname) {
      case pathName.ROOT:
        return <Login />;
      case pathName.SIGNUP:
        return <Signup />;
      default:
        return <Login />;
    }
  };

  return (
    // <div
    //   className="d-flex align-center justify-center vw-100 vh-100"
    //   style={{ background: "#f8ffef" }}
    // >
    //   {getComponent()}
    // </div>
    <div className="auth-container">
    <div className="background-image"></div>
    <div className="content">
      {getComponent()}
    </div>
  </div>
  );
};

export default Auth;
