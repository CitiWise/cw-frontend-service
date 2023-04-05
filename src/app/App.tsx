import { ErrorBoundary } from "@sentry/react";
import { AppRoutes as AppValuerRoutes } from "./AppValuer";
import { AppRoutes as AppLenderRoutes } from "./AppLender";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Loading } from "../shared/components/Loading";
import {
  PrivateAppRoute,
  PrivateAuthRoute,
} from "../shared/components/PrivateRoutes/PrivateRoute";
import { AuthContext } from "../shared/contexts/Auth";
import { envs } from "../shared/utils/env";
import { Fallback } from "./AppValuer/ErrorBoundaryFallback";
import { VerifyOtp, verifyOtpRoute } from "./AppValuer/VerifyOtp";
import { Auth } from "./Auth";
import { forgotPasswordRoute } from "./Auth/ForgotPassword";
import { loginRoute } from "./Auth/Login";
import { signupRoute } from "./Auth/SignUp";
import { useNavigatorOnLine } from "../shared/hooks/useNavigator";
import { Alert, notification } from "antd";

const AppRoutesObject = {
  valuer: AppValuerRoutes,
  lender: AppLenderRoutes,
};
const AppRoutes = AppRoutesObject[envs.appType as keyof typeof AppRoutesObject];
const AppComponentObject = {
  valuer: lazy(() => import("./AppValuer")),
  lender: lazy(() => import("./AppLender")),
};

const AppComponent =
  AppComponentObject[envs.appType as keyof typeof AppComponentObject];

export function App() {
  const [loading, setLoading] = useState(false);
  const { authActions, authState } = useContext(AuthContext);
  const isOnline = useNavigatorOnLine();

  const taskStatusChangeHandler = async (payloadData: any) => {
    const profileData = await authActions
      .obtainProfileData()
      .finally(() => setLoading(false));

    if (
      payloadData &&
      profileData.responseBody &&
      payloadData.companyId === profileData.responseBody.id
    ) {
      if (payloadData.status !== "failed") {
        notification.success({
          message: "Task Status",
          description: payloadData.message,
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Task Status",
          description: payloadData.message,
          placement: "topRight",
        });
      }
    }
  };

  useEffect(() => {
    if (!authState.authLoaded) {
      setLoading(true);
      authActions.authenticateUser().finally(() => setLoading(false));
    }
  }, [authState.authLoaded]);

  return (
    <>
      <Loading loading={loading} />
      {!isOnline && (
        <Alert
          style={{
            textAlign: "center",
            fontWeight: "bold",
            background: "#ff9e10",
            border: "none",
          }}
          message="It seems like you are offline"
          type="warning"
          closable
        />
      )}
      {authState.authLoaded && (
        <Router>
          <Switch>
            <Route path={verifyOtpRoute}>
              <VerifyOtp />
            </Route>

            <PrivateAuthRoute
              exact
              path={[signupRoute, loginRoute, forgotPasswordRoute, "/"]}
            >
              <Auth />
            </PrivateAuthRoute>

            <PrivateAppRoute exact path={AppRoutes}>
              <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<Fallback />}>
                  <AppComponent />
                </ErrorBoundary>
              </Suspense>
            </PrivateAppRoute>
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      )}
    </>
  );
}
