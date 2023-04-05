import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import errorHandler from "../../../shared/utils/errorHandler";

export const OtpCredential = ({ sendOTP }: any) => {
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

  /**
   * @description sending OTP on email
   * @param {*} formValues (Email for sending OTP)
   */
  const handleSendOtp = async (formValues: any) => {
    try {
      setIsSubmitButtonLoading(true);
      const { phone } = formValues;
      await sendOTP(phone);
    } catch (error) {
      errorHandler(error);
    }
    setIsSubmitButtonLoading(false);
  };

  return (
    <Form
      layout="vertical"
      style={{ width: "90%" }}
      size="large"
      onFinish={handleSendOtp}
    >
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: "Please enter phone" },
          {
            required: true,
            message: "Please input your Phone Number",
          },
          {
            len: 10,
            pattern: "^[0-9]{10}$" as unknown as RegExp,
            message: "Please input correct Phone Number",
          },
          {
            pattern: `^[1-9]` as unknown as RegExp,
            message: "Phone should start with digits from 1-9",
          },
        ]}
      >
        <Input
          suffix={<UserOutlined />}
          size="large"
          placeholder="7982312211"
        />
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
  );
};
