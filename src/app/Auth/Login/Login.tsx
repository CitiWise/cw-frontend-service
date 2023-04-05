import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, notification, Row } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RegexValidation } from "../../../constants";
import { AuthContext } from "../../../shared/contexts/Auth";
import logoTopImg from "../../../shared/images/img_dots.png";
import logoWhite from "../../../shared/images/logo_white.png";
import { envs } from "../../../shared/utils/env";
import { forgotPasswordRoute } from "../ForgotPassword";
import { signupRoute } from "../SignUp";
import styles from "./index.module.scss";

const loginText = {
  valuer: "Valuer",
  lender: "Lender",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const { authActions } = useContext(AuthContext);

  const onFinish = async (values: any) => {
    let email, phone, username;
    if (values.id.match(RegexValidation.EMAIL)) {
      email = values.id;
      phone = null;
    } else if (values.id.match(RegexValidation.PHONE)) {
      phone = values.id;
      email = null;
    } else {
      // for lightning only accounts
      username = values.id;
      phone = null;
      email = null;
    }

    setLoading(true);

    try {
      if (email || phone || username) {
        await authActions.login(
          {
            email,
            phone,
            username,
            userLoginType: envs.appType,
          },
          values.password
        );
      }
    } catch (err: any) {
      notification.error({
        message: "Login Error",
        description: `${err.message}`,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginRoleChangeHandler = (newRole: any) =>
    authActions.changeRole(newRole);

  const loginForm = (
    <>
      <div className={styles.title}>
        {loginText[envs.appType as keyof typeof loginText]} Login
      </div>
      <div className={styles.subTitle}>
        Welcome back, please login to your account.
      </div>
      <Form
        name="normal_login"
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="id"
          rules={[
            { required: true, message: "Please input your Email or Phone!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email or Phone"
            size="large"
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
            className={styles.input}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot float-right"
            href={forgotPasswordRoute}
          >
            Forgot password
          </a>
        </Form.Item>

        <Form.Item className={styles.btn}>
          <Button
            type="primary"
            shape="round"
            size="large"
            htmlType="submit"
            loading={loading}
            className="mb-3"
          >
            Login
          </Button>
          {
            <Button shape="round" size="large">
              <Link to={signupRoute}>Signup</Link>
            </Button>
          }
        </Form.Item>
      </Form>
    </>
  );

  return (
    <Row className="h-100" id={styles.loginPageMainDiv}>
      <Col md={24} lg={13} sm={24} className={styles.leftComponent}>
        <img src={logoWhite} alt="logo" className={styles.topLogoImage} />
        <div className={styles.leftTitle}>
          <p>Craft unmatched</p>
          <p>shopping experiences</p>
          <p>for your customers</p>
          <p className="t2">
            with <span>BETTER CONTROL</span>
          </p>
        </div>
      </Col>
      <Col md={24} lg={11} sm={24} className={styles.loginComponent}>
        <img src={logoTopImg} alt="img" className={styles.topImage} />

        <div className={styles.formComponent}>{loginForm}</div>
      </Col>
    </Row>
  );
}

export const loginRoute = "/signin";
