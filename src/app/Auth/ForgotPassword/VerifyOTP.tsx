import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Fragment, useState } from "react";
import OtpInput from "react-otp-input";
import errorHandler from "../../../shared/utils/errorHandler";
import styles from "./index.module.scss";

export const VerifyOTP = ({ onResetPassword, sendOTP }: any) => {
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [isResendButtonLoading, setIsResendButtonLoading] = useState(false);

  /**
   * @description This function is used to resend Otp on email
   * @param {*} formValues (Email for sending OTP)
   */
  const handleReSendOtp = async () => {
    try {
      setIsResendButtonLoading(true);
      await sendOTP();
    } catch (error) {
      errorHandler(error);
    }
    setIsResendButtonLoading(false);
  };

  /**
   * @description This function is used to verify OTP and reset password
   * @param {*} formValues (Email for sending OTP)
   */
  const handleResetPassword = async (formValues: any) => {
    try {
      setIsSubmitButtonLoading(true);
      await onResetPassword(formValues);
    } catch (error) {
      errorHandler(error);
    }
    setIsSubmitButtonLoading(false);
  };

  return (
    <Fragment>
      <Form
        layout="vertical"
        style={{ width: "90%" }}
        size="large"
        onFinish={handleResetPassword}
      >
        <Form.Item
          label="OTP (Enter OTP received in you phone)"
          name="otp"
          rules={[
            { required: true, message: "Please enter OTP!" },
            { len: 6, message: "Please input 6 digits!" },
          ]}
        >
          <OtpInput
            inputType="number"
            inputStyle={styles.otpInputStyle}
            numInputs={6}
            onChange={() => {}}
            renderInput={(props) => <input {...props} />}
          />
        </Form.Item>

        <div className={styles.resendOTP}>
          <Button
            type="primary"
            onClick={() => handleReSendOtp()}
            loading={isResendButtonLoading}
          >
            Resend OTP
          </Button>
        </div>

        <Form.Item
          name="password"
          label="New Password"
          rules={[
            { required: true, message: "Please enter password!" },
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
              message: "Password length should be greater than 8 characters",
            },
            {
              max: 20,
              message: "Password length should be less than 20 characters",
            },
          ]}
        >
          <Input.Password suffix={<LockOutlined />} size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            { required: true, message: "Please enter password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password suffix={<LockOutlined />} size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitButtonLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};
