// src/containers/Register/Register.tsx
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  notification,
  Alert,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../redux/actions/registerActions";
import { RootState } from "../../redux/store"; // store.ts dosyasını içe aktarın


const { Title } = Typography;

interface RegisterFormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registerState = useSelector((state: RootState) => state.register);
  const loading = registerState.isLoading;
  const [registerError, setRegisterError] = useState(false);


  
  const onFinish = (values: RegisterFormData) => {
    dispatch(
      registerRequest(
        values.firstName,
        values.lastName,
        values.userName,
        values.email,
        values.password,
        values.passwordConfirm
      )
    );
  };

  const formRules = [
    {
      required: true,
      message: "This field is required!",
    },
  ];

  // Register işlemi başarılı olduğunda yönlendirme ve bildirim işlemleri
  React.useEffect(() => {
    if (registerState.data) {
      notification.success({
        message: "Kayıt Başarılı",
        description:
          "Kayıt işlemi başarıyla tamamlandı, giriş yapabilirsiniz.",
      });
      navigate("/login");
    }
    if (registerState.error) {
      setRegisterError(true);
    }
  }, [registerState, navigate]);
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Title level={2}>Kayıt Ol</Title>
        {registerError && (
          <Alert
            message="Registration failed"
            type="error"
            closable
            onClose={() => setRegisterError(false)}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            rules={[
              { required: true, message: "Lütfen adınızı girin!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Lütfen Soyadınızı girin!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
            />
          </Form.Item>
          <Form.Item
            name="userName"
            rules={[
              { required: true, message: "Lütfen Kullanıcı Adınızı girin!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="User Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Lütfen e-posta adresinizi girin!" },
              {
                type: "email",
                message: "Lütfen geçerli bir e-posta adresi girin!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          


          <Form.Item
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            rules={[
              ...formRules,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password Confirmation"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
        <Link to="/login">Giriş Yap</Link>
      </Col>
    </Row>
  );
};

export default Register;
