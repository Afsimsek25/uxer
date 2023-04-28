// src/containers/ForgotPassword/ForgotPassword.tsx
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Burada API çağrısı yaparak şifre sıfırlama e-postası gönderebilirsiniz.
    // setLoading(false) ile yüklenme durumunu kapatmayı unutmayın.
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Title level={2}>
          Please enter your email address to recover your password
        </Title>
        <Form
          name="forgot_password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your e-mail address!" },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
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
              style={{ width: "100%" }}
            >
              Send
            </Button>
          </Form.Item>
        </Form>
        <Link to="/login">Log In</Link>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
