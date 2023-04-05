import {
  Button,
  Col,
  Row,
  Form,
  notification,
  Select,
  Input,
  Tooltip,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../shared/contexts/Auth";

import styles from "./index.module.scss";
import errorHandler from "../../../../shared/utils/errorHandler";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { indianStates } from "../../../../constants/indianStates";
import { antDesignValidator } from "../../../../shared/utils/helpers";
import TextArea from "antd/es/input/TextArea";
import { generateRequest } from "../../../../shared/api/vms";

export const genRequestRoute = "/home/request";

export const GenerateRequest = (props = {}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [selectedStoreAddress, setSelectedStoreAddress] = useState(null);

  const {
    authState: { profile },
  } = useContext(AuthContext);

  const redirectToHomePage = () => history.push("/");

  const onFinish = async (formValues: any) => {
    try {
      setIsSubmitButtonLoading(true);

      const {
        data: { status, message },
      } = await generateRequest({ data: { ...formValues } });

      if (status) {
        notification.success({
          description: "Order created successfully",
          position: "topRight",
        } as any);

        setTimeout(() => {
          window.location.replace("/home");
        }, 10000);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsSubmitButtonLoading(false);
    }
  };

  return (
    <Row className={`h-100 p-0 ${styles.manualOrder}`}>
      {/* <Col span={4} className={styles.sidebar}>
        <Button
          className={styles.backButton}
          icon={<ArrowLeftOutlined />}
          onClick={redirectToHomePage}
        >
          Go back
        </Button>
      </Col> */}

      <div className={styles.innerContainer}>
        <h2>Create Valuation Request</h2>
        <br />

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Reference Number"
                name={"referenceNumber"}
                rules={[
                  {
                    required: true,
                    message: "Please input Reference Number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    <Tooltip placement="leftTop" title="Gut No./">
                      Survey Number
                    </Tooltip>
                  </>
                }
                name={"surveyNumber"}
                rules={[
                  { required: true, message: "Please input Survey Number" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <h3 className={styles.subHeading}>Applicant Details</h3>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name={"firstName"}
                rules={[{ required: true, message: "Please input First name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Last Name"
                name={"lastName"}
                rules={[{ required: true, message: "Please input Last name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Phone (10 digits)"
                name={"phone"}
                rules={[
                  { required: true, message: "Please input Phone Number" },
                  antDesignValidator.phoneNumber,
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name={"email"}
                rules={[
                  { required: true, message: "Please input Email" },
                  {
                    type: "email",
                    message: "Please input valid E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <h3 className={styles.subHeading}>Property Address</h3>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Address Line 1"
                name={"addressLine1"}
                rules={[
                  { required: true, message: "Please input Address Line 1" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Address Line 2"
                name={"addressLine2"}
                rules={[
                  { required: true, message: "Please input Address Line 2" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Pincode"
                name={"pincode"}
                rules={[
                  { required: true, message: "Please input Pincode" },
                  antDesignValidator.pincode,
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="City"
                name={"city"}
                rules={[{ required: true, message: "Please input City" }]}
              >
                <Input disabled={isLoading} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="State"
                name={"state"}
                rules={[{ required: true, message: "Please input State" }]}
              >
                <Select disabled={isLoading} showSearch>
                  {indianStates.map(({ label, value }) => {
                    return (
                      <Select.Option value={value} key={value}>
                        {label}
                      </Select.Option>
                    );
                  })}
                  3
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Col span={8}>
            <Form.Item
              label="Remarks"
              name={"remarks"}
              rules={[{ required: false }]}
            >
              <TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={8}></Col>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isSubmitButtonLoading}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Row>
  );
};
