import { verifyOtpRoute } from "../../../app/AppValuer/VerifyOtp";
import React, { useContext } from "react";

import { Route, useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/contexts/Auth";

export function PrivateAppRoute(props: any) {
  const { children, ...rest } = props;
  const {
    authState: { isLogined, profile, profileLoaded },
  } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={({ location }: any) => {
        switch (true) {
          // case isLogined &&
          //   profileLoaded &&
          //   !profile?.accountVerified &&
          //   !profile?.isEmailVerified:
          //   return history.push(verifyOtpRoute);
          case isLogined:
            return children;
          default:
            return history.push("/signin", { state: { from: location } });
        }
      }}
    />
  );
}

export function PrivateAuthRoute(props: any) {
  const { children, ...rest } = props;
  const {
    authState: { isLogined },
  } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={({ location }: any) => {
        if (!isLogined) {
          //write condition
          return children;
        }
        return history.push("/app", { state: { from: location } });
      }}
    />
  );
}
