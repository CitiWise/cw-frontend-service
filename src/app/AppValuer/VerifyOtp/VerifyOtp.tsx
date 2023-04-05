import { Row, Col, notification, Button } from "antd";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { apiUms } from "../../../shared/api";
import { CountDown } from "../../../shared/components/CountDown";
import logoWhite from "../../../shared/images/logo_white.png";
import errorHandler from "../../../shared/utils/errorHandler";
import styles from "./index.module.scss";
import OtpInput from "react-otp-input";
import { AuthContext } from "../../../shared/contexts/Auth";
import { EAuthMode, OtpPurpose } from "../../../constants";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const verifyOtpRoute = "/verify-otp";

export const VerifyOtp = () => {
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [isEmailResendDisabled, setIsEmailResendDisabled] = useState(true);
  const [otp, setOtp] = useState("");
  const history: any = useHistory();
  const { authActions } = useContext(AuthContext);

  const onCountdownComplete = () => setIsEmailResendDisabled(false);

  const resendEmailOtp = async (showNotificationMessage = true) => {
    try {
      setIsEmailResendDisabled(true);

      await apiUms.post("/ums/profile/send-otp", null, {
        params: { type: EAuthMode.PHONE, purpose: OtpPurpose.SIGNUP_PHONE_OTP },
      });

      showNotificationMessage &&
        notification.success({
          message: "OTP resent successfully.",
          placement: "topRight",
        });
    } catch (error) {
      errorHandler(error);
    }
  };

  const cancelOtp = async () => {
    try {
      await authActions.clearAuthState();
      history.push("/");
      window.location.reload();
    } catch (error) {
      errorHandler(error);
    }
  };
  const { state } = useLocation();
  useEffect(() => {
    /**
     * If user refresh the page then redirect to login page
     */

    if (history.location.state && history?.location?.state?.attempt === 2) {
      cancelOtp();
    }

    /**
     * Set attempt to 2 so when user refresh the page then redirect to login page
     */
    history.push(verifyOtpRoute, { state: { attempt: 2 } });
    resendEmailOtp(false);
  }, []);

  const submitOtp = async () => {
    try {
      setIsSubmitButtonLoading(true);

      await apiUms.post("/ums/profile/verify-otp", {
        phoneVerificationOtp: otp,
      });

      await authActions.updateProfileData({ accountVerified: true });
      notification.success({
        message: "User Signed Up",
        description: "Signup Successful",
      });

      // to delay the push
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsSubmitButtonLoading(false);
    }
  };

  const handleOtpChange = (otp: any) => setOtp(otp);

  return (
    <Row className={styles.verifyOtpPage}>
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
      <Col span={11}>
        <div className={styles.verificationFormContainer}>
          <ArrowLeftOutlined
            title="Go Back"
            onClick={cancelOtp}
            className={styles.backBtn}
          />
          <h4 className={styles.title}>Verify Phone OTP</h4>
          <br />

          <OtpInput
            inputType="number"
            inputStyle={styles.inputStyle}
            numInputs={6}
            onChange={handleOtpChange}
            value={otp}
            renderInput={(props) => <input {...props} />}
          />

          <div className={styles.resendBtn}>
            <Button
              type="link"
              disabled={isEmailResendDisabled}
              onClick={async () => {
                await resendEmailOtp;
              }}
            >
              Resend OTP
            </Button>
            {isEmailResendDisabled && (
              <CountDown seconds={60} onComplete={onCountdownComplete} />
            )}
          </div>
          <br />
          <Button
            disabled={otp.length !== 6}
            loading={isSubmitButtonLoading}
            className={styles.submitBtn}
            type="primary"
            size="large"
            shape="round"
            onClick={submitOtp}
          >
            Submit
          </Button>
        </div>
      </Col>
    </Row>
  );
};
