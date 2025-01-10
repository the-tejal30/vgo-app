import React from "react";
import { Form, Input, Button, Space, Typography } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from "react-router-dom";
import "../login.scss";
import auth from "../container/auth.container";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin } = auth()

  return (
    <div
      className="login-container"
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Title level={2}>LOGIN</Title>
      <Form name="loginForm" layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          prefix={<UserOutlined />}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          prefix={<LockOutlined />}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="link" onClick={() => navigate("/signup")} className="login-btn">
            Create New Account
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default Login;
