import { notification, Row, Col } from "antd";
import { useState } from "react";
import { apiUms } from "../../../shared/api";
import logoWhite from "../../../shared/images/logo_white.png";
import errorHandler from "../../../shared/utils/errorHandler";
import { EAuthMode, OtpPurpose } from "../../../constants";
import { loginRoute } from "../Login";
import styles from "./index.module.scss";
import { OtpCredential } from "./OtpCredential";
import { VerifyOTP } from "./VerifyOTP";
import { useHistory } from "react-router-dom";

export const forgotPasswordRoute = "/forgot-password";

export const ForgotPassword = () => {
  const [showInputPasswordComponent, setShowInputPasswordComponent] =
    useState(false);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  /**
   * @description This function is used to send OTP on email and it will enabled verifyOtp section to verify OTP
   * @param {*} email (Email on which OTP will be send)
   */
  const handleSendOtp = async (phone: any) => {
    try {
      setIsSubmitButtonLoading(true);
      await sendOTP(phone);
      setPhone(phone);
      setShowInputPasswordComponent(true);
    } catch (error) {
      errorHandler(error);
    }
  };

  /**
   * @description This function is used to send email
   * @param {*} email (Email on which OTP will be send)
   */
  const sendOTP = async (phone: any) => {
    try {
      await apiUms.post(
        "/ums/profile/forgot-password-otp",
        { phone },
        {
          params: {
            type: EAuthMode.PHONE,
            purpose: OtpPurpose.FORGOT_PASSWORD_OTP,
          },
        }
      );
    } catch (e) {
      throw e;
    }
  };

  /**
   * @description This function is used verify OTP for forgot password and reset password
   * @param {*} formValues (formValues are values object of verify otp form it contains otp, password and confirmPassword)
   */
  const handleResetPassword = async (formValues: any) => {
    try {
      const { otp, password, confirmPassword } = formValues;

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      await apiUms.put("/ums/profile/reset-password", { otp, password, phone });
      notification.success({
        message: "Password Updated successfully!",
        placement: "topRight",
      });

      history.push(loginRoute);
    } catch (error: any) {
      errorHandler(error);
      if (
        error?.response?.data?.responseCode === "000045" ||
        error?.response?.data?.responseCode === "000046"
      ) {
        setShowInputPasswordComponent(false);
      }
    }
  };

  return (
    <Row className="h-100">
      <Col span={13} className={styles.leftComponent}>
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
      <Col span={11} className={styles.rightComponent}>
        <div className={styles.formComponent}>
          {showInputPasswordComponent ? (
            <VerifyOTP
              onResetPassword={(formValues: any) =>
                handleResetPassword(formValues)
              }
              sendOTP={() => handleSendOtp(phone)}
            />
          ) : (
            <OtpCredential sendOTP={(phone: any) => handleSendOtp(phone)} />
          )}
        </div>
      </Col>
    </Row>
  );
};
