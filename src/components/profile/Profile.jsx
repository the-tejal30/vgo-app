import React from 'react';
import { Card, Row, Col, Avatar, Typography, Descriptions, Divider } from 'antd';
import { UserOutlined, PhoneOutlined, GlobalOutlined, PushpinOutlined, DollarOutlined } from '@ant-design/icons';
import { UseContext } from '../../context/context';

const { Title, Text } = Typography;

const Profile = () => {
  const user = UseContext()
  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--color-primary-ylight)' }} className='d-flex align-center'>
      <Card
        style={{
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
        bordered={false}
      >
        <Row
          gutter={[16, 16]}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          {/* Avatar and Header Section */}
          <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
              size={100}
              icon={<UserOutlined />}
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)' }}
            />
          </Col>
          <Col span={18}>
            <Title level={2} style={{ color: 'var(--color-primary-dark)' }}>
              {user?.first_name} {user?.last_name}
            </Title>
            <Text style={{ color: 'var(--color-primary-medium)' }}>
              {user?.profession} | {user?.user_sub_type}
            </Text>
          </Col>
        </Row>

        <Divider />

        {/* Descriptions and Additional Info */}
        <Row
          gutter={[16, 16]}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Col span={12}>
            <Descriptions
              title="Profile Information"
              column={1}
              bordered
              labelStyle={{ fontWeight: 'bold', color: 'var(--color-primary-dark)' }}
              contentStyle={{ color: 'var(--color-black)' }}
            >
              <Descriptions.Item label="Mobile" style={{whiteSpace: 'nowrap'}}>
                <PhoneOutlined style={{ color: 'var(--color-primary-medium)' }} /> {user?.country_code} {user?.mobile_number}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Text style={{ color: user?.user_status === 'Active' ? 'var(--color-green)' : 'var(--color-red)' }}>
                  {user?.user_status}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="User Type" style={{whiteSpace: 'nowrap'}}>{user?.user_type}</Descriptions.Item>
            </Descriptions>
          </Col>

          <Col span={12}>
            <Descriptions
              title="Additional Details"
              column={1}
              bordered
              labelStyle={{ fontWeight: 'bold', color: 'var(--color-primary-dark)' }}
              contentStyle={{ color: 'var(--color-black)' }}
            >
              <Descriptions.Item label="Loyalty Coins">
                <DollarOutlined style={{ color: 'var(--color-primary-medium)' }} /> {user?.loyalty_coins}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {user?.created_at ? new Date(user.created_at).toISOString().split('T')[0] : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                <GlobalOutlined style={{ color: 'var(--color-primary-medium)' }} /> {user?.currency}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
