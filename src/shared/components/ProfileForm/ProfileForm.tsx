import { Row, Col, Input, Form, Button, Select } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  BankOutlined,
  LinkOutlined,
  CreditCardOutlined,
  PhoneOutlined,
  HomeOutlined,
  NumberOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { loginRoute } from "../../../app/Auth/Login";
import { useState } from "react";
import errorHandler from "../../../shared/utils/errorHandler";
const { Option } = Select;

const reactstrapValidationRules: any = {
  phone: [
    {
      required: true,
      message: "Please input your Phone Number",
    },
    {
      len: 10,
      pattern: "^[0-9]{10}$",
      message: "Please input correct Phone Number",
    },
    {
      pattern: `^[1-9]`,
      message: "Phone should start with digits from 1-9",
    },
  ],
  email: [
    { required: true, message: "Please input your Email!" },
    {
      type: "email",
      message: "The input is not valid E-mail!",
    },
  ],
};

export function ProfileForm({
  onFinish,
  isFormDisabled = false,
  initialValues,
  isSignup = false,
  isLender = false,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  const onFinishProfileForm = async (formValues: any) => {
    try {
      setIsLoading(true);
      await onFinish(formValues);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  // export const createLenderAccountFields = [
  // 	LenderProfileType.IS_BANK,
  // 	LenderProfileType.BANK_NAME,
  // 	LenderProfileType.BRANCH_NAME,
  // 	LenderProfileType.PASSWORD,
  // 	LenderProfileType.POC_NAME,
  // 	LenderProfileType.USER_TYPE
  // ];

  // export const createValuerAccountFields = [
  // 	ValuerProfileType.NAME,
  // 	ValuerProfileType.PAN,
  // 	ValuerProfileType.PASSWORD,
  // 	ValuerProfileType.USER_TYPE
  // ];

  return (
    <div className={styles.formComponent}>
      <Form
        requiredMark={false}
        name="normal_login"
        className={styles.form}
        initialValues={initialValues}
        layout="vertical"
        onFinish={onFinishProfileForm}
      >
        <Row className="h-100" gutter={40}>
          <Col sm={24} md={12} xs={24} lg={12}>
            <Form.Item
              label={`${isLender ? "Bank" : "Full"} Name`}
              name="name"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<BankOutlined className="site-form-item-icon" />}
                tabIndex={1}
                placeholder={`${isLender ? "Bank" : "Full"} Name`}
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>
            <Form.Item
              label={"Phone (without +91 or 0)"}
              name="phone"
              rules={reactstrapValidationRules.phone}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                tabIndex={3}
                placeholder="Phone (without +91 0r 0)"
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>
            {isLender && (
              <Form.Item
                label="Point of Contact(PoC) Name"
                name="poc"
                rules={[
                  {
                    required: true,
                    message: "Please input your Point of Contact",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  tabIndex={5}
                  placeholder="John Wick"
                  size="large"
                  className={styles.input}
                  disabled={isFormDisabled}
                />
              </Form.Item>
            )}
            <Form.Item
              label={"Password"}
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
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
                tabIndex={7}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>

            <Form.Item
              label={"Address Line 1"}
              name={["address", "line1"]}
              rules={[{ required: true, message: "Please input your Address" }]}
            >
              <Input
                tabIndex={11}
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="Address Line 1"
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>
            <Form.Item
              label={"City"}
              name={["address", "city"]}
              rules={[{ required: true, message: "Please input your City" }]}
            >
              <Input
                tabIndex={13}
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="City"
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>
            <Form.Item
              label={"Pincode"}
              name={["address", "pincode"]}
              rules={[{ required: true, message: "Please input your Pincode" }]}
            >
              <Input
                tabIndex={15}
                prefix={<NumberOutlined className="site-form-item-icon" />}
                placeholder="Pincode"
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} xs={24} lg={12}>
            {isLender ? (
              <Form.Item
                label={"Branch Name"}
                name="branch"
                rules={[
                  { required: true, message: "Please input Branch Name!" },
                ]}
              >
                <Input
                  prefix={<BankOutlined className="site-form-item-icon" />}
                  tabIndex={1}
                  placeholder={"Branch Name"}
                  size="large"
                  className={styles.input}
                  disabled={isFormDisabled}
                />
              </Form.Item>
            ) : (
              <Form.Item
                label={"PAN"}
                name="pan"
                rules={[
                  { required: true, message: "Please input your Pan!" },
                  { max: 10, message: "Pan must be of 10 characters." },
                  { min: 10, message: "Pan must be of 10 characters." },
                ]}
              >
                <Input
                  tabIndex={4}
                  prefix={
                    <CreditCardOutlined className="site-form-item-icon" />
                  }
                  placeholder="Pan"
                  size="large"
                  className={styles.input}
                  disabled={isFormDisabled}
                />
              </Form.Item>
            )}

            <Form.Item
              label={"Email"}
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                tabIndex={2}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>

            {isLender && (
              <Form.Item
                label="PoC Phone (without +91 or 0)"
                name="pocPhone"
                rules={reactstrapValidationRules.phone}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  tabIndex={6}
                  placeholder="Phone (without +91 0r 0)"
                  size="large"
                  className={styles.input}
                  disabled={isFormDisabled}
                />
              </Form.Item>
            )}
            {isSignup && (
              <Form.Item
                label={"Confirm Password"}
                name="confirmPassword"
                rules={[
                  { required: true, message: "Please confirm your Password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
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
                  tabIndex={8}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Confirm Password"
                  size="large"
                  className={styles.input}
                  disabled={isFormDisabled}
                />
              </Form.Item>
            )}

            <Form.Item
              label={"Address Line 2"}
              name={["address", "line2"]}
              rules={[
                {
                  required: true,
                  message: "Please input your Address Line 2!",
                },
              ]}
            >
              <Input
                tabIndex={12}
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="Address Line 2"
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>
            <Form.Item
              label={"State"}
              name={["address", "state"]}
              rules={[{ required: true, message: "Please input your State!" }]}
            >
              <Input
                tabIndex={14}
                prefix={<HomeOutlined className="site-form-item-icon" />}
                placeholder="State"
                size="large"
                className={styles.input}
                disabled={isFormDisabled}
              />
            </Form.Item>
            {isLender && (
              <Form.Item
                label={"Landmark"}
                name={["address", "landmark"]}
                rules={[
                  { required: true, message: "Please input your Landmark!" },
                ]}
              >
                <Input
                  tabIndex={16}
                  prefix={<HomeOutlined className="site-form-item-icon" />}
                  placeholder="landmark"
                  size="large"
                  className={styles.input}
                  disabled={isFormDisabled}
                />
              </Form.Item>
            )}

            {isLender && (
              <Form.Item
                label={"Country"}
                name={["address", "country"]}
                rules={[
                  { required: true, message: "Please input your State!" },
                ]}
              >
                <Input
                  tabIndex={17}
                  prefix={<HomeOutlined className="site-form-item-icon" />}
                  placeholder="country"
                  size="large"
                  className={styles.input}
                  disabled={isFormDisabled}
                />
              </Form.Item>
            )}
          </Col>
        </Row>

        {!isFormDisabled && !isSignup && (
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        )}
        {isSignup && (
          <div className={styles.btn}>
            <Button type="link" shape="round" size="large">
              <Link to={loginRoute}>Login Instead</Link>
            </Button>
            <Button
              type="primary"
              shape="round"
              size="large"
              htmlType="submit"
              color="red"
              loading={isLoading}
            >
              Signup
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}
