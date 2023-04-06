import React, { useContext } from "react";
import { Row, Col, notification } from "antd";
import logoWhite from "../../../shared/images/logo_white.png";
import styles from "./index.module.scss";
import { ProfileForm } from "../../../shared/components/ProfileForm";
import { AuthContext } from "../../../shared/contexts/Auth";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { verifyOtpRoute } from "../../AppValuer/VerifyOtp";

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let history = useHistory();
    let params = useParams();
    return <Component {...props} router={{ location, history, params }} />;
  }

  return ComponentWithRouterProp;
}
function SignUpComponent(props: any) {
  const {
    authState,
    authActions: { signUp },
  } = useContext(AuthContext);
  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      await signUp({ ...values }, authState.role);

      history.push(verifyOtpRoute, {
        state: {
          attempt: 1,
        },
      });
    } catch (err: any) {
      notification.error({
        message: "Signup Error",
        description: err.message,
        placement: "topRight",
      });
    }
  };
  return (
    <Row className="h-100">
      <Col md={24} lg={13} sm={24} id={styles.leftComponent}>
        <img src={logoWhite} alt="logo" className={styles.logoImage} />
        <div className={styles.leftTitle}>
          <p className="t2">
            FAST AND <span>ACCURATE</span>
          </p>
        </div>
      </Col>
      <Col lg={16} sm={24} id={styles.signupContainer}>
        <div className={styles.subTitle}>
          Welcome! Please Sign Up to continue
        </div>

        <div className={styles.profileFormContainer}>
          <ProfileForm
            onFinish={onFinish}
            isSignup={true}
            isLender={authState.role === "lender"}
          />
        </div>
      </Col>
    </Row>
  );
}
export const SignUp = withRouter(SignUpComponent);
export const signupRoute = "/signup";
