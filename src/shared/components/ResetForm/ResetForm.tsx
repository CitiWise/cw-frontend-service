import { Row, Col, Input, Form, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { useState } from "react";
import errorHandler from "../../utils/errorHandler";

export function ResetForm({ onFinish, onCancel, initialValues = {} }: any) {
  const [isLoading, setIsLoading] = useState(false);

  const onFinishResetForm = async (formValues: any) => {
    try {
      setIsLoading(true);
      await onFinish(formValues);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className={styles.formComponent}>
      <Form
        requiredMark={false}
        name="reset_form"
        className={styles.form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={onFinishResetForm}
      >
        <Row className="h-100" gutter={40}>
          <Col sm={24} md={12} lg={12} xs={24}>
            <Form.Item
              name="password"
              label="Old Password"
              rules={[
                { required: true, message: "Please enter old password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Old Password"
                size="large"
                className={styles.input}
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} xs={24} lg={12}>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Please enter new password!" },
                {
                  pattern: /[*|;@#%^*+=()_\-&$]/,
                  message:
                    "Password should contain at least one special character!",
                },
                {
                  pattern: /[*^\d+$|]/,
                  message: "Password should contain at least one number!",
                },
                {
                  min: 8,
                  message:
                    "Password length should be greater than 8 characters",
                },
                {
                  max: 20,
                  message: "Password length should be less than 20 characters",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="New Password"
                size="large"
                className={styles.input}
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} xs={24} lg={12}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please enter password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
                size="large"
                className={styles.input}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Change
          </Button>
          <Button type="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
