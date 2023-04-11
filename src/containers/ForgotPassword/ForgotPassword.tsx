// src/containers/ForgotPassword/ForgotPassword.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: ForgotPasswordFormData) => {
    setLoading(true);
    console.log('Received values of form: ', values);
    // Burada API çağrısı yaparak şifre sıfırlama e-postası gönderebilirsiniz.
    // setLoading(false) ile yüklenme durumunu kapatmayı unutmayın.
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Title level={2}>Şifremi Unuttum</Title>
        <Form
          name="forgot_password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Lütfen e-posta adresinizi girin!' },
              { type: 'email', message: 'Lütfen geçerli bir e-posta adresi girin!' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-posta"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              Şifre Sıfırlama Bağlantısı Gönder
            </Button>
          </Form.Item>
        </Form>
        <Link to="/login">Giriş Yap</Link>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
