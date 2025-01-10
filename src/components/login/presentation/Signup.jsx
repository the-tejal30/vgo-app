import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Space, Select } from 'antd';
import '../signup.scss';
import auth from '../container/auth.container';

const { Title } = Typography;
const { Option } = Select;

const Signup = () => {
  const navigate = useNavigate()
  const { isTeamSignup, setIsTeamSignup, handleSignup } = auth();

  const formItems = [
    {
      label: 'First Name',
      name: 'firstName',
      rules: [{ required: true, message: 'Please input your first name!' }],
      placeholder: 'Enter First Name',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      rules: [{ required: true, message: 'Please input your last name!' }],
      placeholder: 'Enter Last Name',
    },
  ];

  return (
    <div className="signup-container">
      <Title level={2}>{isTeamSignup ? 'Team Signup' : 'Signup'}</Title>
      <Form name="signupForm" layout="vertical" onFinish={handleSignup}>
        <div className="form-row">
          {formItems.map((item) => (
            <Form.Item key={item.name} label={item.label} name={item.name} rules={item.rules}>
              <Input placeholder={item.placeholder} />
            </Form.Item>
          ))}
        </div>

        <Form.Item
          label="User Sub Type"
          name="userSubType"
          rules={[{ required: true, message: 'Please select your user sub type!' }]}
        >
          <Select placeholder="Select User Sub Type">
            <Option value="Manager">Manager</Option>
            <Option value="Team">Team</Option>
            <Option value="Customer">Customer</Option>
          </Select>
        </Form.Item>

        <div className="form-row">
          <Form.Item
            label="Profession"
            name="profession"
            rules={[{ required: true, message: 'Please input your profession!' }]}
          >
            <Input placeholder="Enter Profession" />
          </Form.Item>

          <Form.Item
            label="Country Code"
            name="countryCode"
            initialValue="+91"
            rules={[{ required: true, message: 'Please input your country code!' }]}
          >
            <Input placeholder="Enter Country Code" />
          </Form.Item>
        </div>

        <div className="form-row">
          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { required: true, message: 'Please input your mobile number!' },
              { len: 10, message: 'Mobile number must be 10 digits!' },
            ]}
          >
            <Input placeholder="Enter Mobile Number" />
          </Form.Item>
        </div>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>

        <div className="form-row">
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  'Password must be at least 8 characters, including a number, letter, and symbol.',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className='signup-btn'>
            {isTeamSignup ? 'Sign Up as Team' : 'Sign Up'}
          </Button>
        </Form.Item>
      </Form>

      <Space direction="vertical" style={{ width: '100%' }}>
        <Button type="link" onClick={() => setIsTeamSignup(!isTeamSignup)} className='signup-btn'>
          {isTeamSignup ? 'Join as Customer' : 'Join as Team'}
        </Button>
        <Button type="link" onClick={() => navigate('/')} className='signup-btn'>Already have an account? Log In</Button>
      </Space>
    </div>
  );
};

export default Signup;
