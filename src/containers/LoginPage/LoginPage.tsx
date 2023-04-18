import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Space ,Alert, notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link,useNavigate} from 'react-router-dom';
import { userLogin } from '../../utils/servise';
import { encrypt } from '../../utils/Util';
import { useDispatch } from 'react-redux';
import { LOGIN_REQUEST, loginRequest } from '../../redux/actions/loginActions';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // store.ts dosyasını içe aktarın



const { Title } = Typography;

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);


  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);

  const onFinish = (values: LoginFormData) => {
    dispatch(loginRequest(values.username, values.password));
  };

  React.useEffect(() => {
    if (loginState.data) {
      navigate("/homepage");
    }
    if (loginState.error) {
      setLoginError(true);
    }
  }, [loginState, navigate]);
  
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Title level={2}>Log in</Title>
        {loginError && (
          <Alert
            message="Kullanıcı adı veya şifre hatalı"
            type="error"
            closable
            onClose={() => setLoginError(false)}
            style={{ marginBottom: 16 }}
          />
        )}
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Lütfen kullanıcı adınızı girin!' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="User Name"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Lütfen şifrenizi girin!' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <Space>
          <Link to="/forgot-password">Forgot Password</Link>
          <Link to="/register">Register</Link>
        </Space>
      </Col>
    </Row>
  );
};

export default LoginPage;