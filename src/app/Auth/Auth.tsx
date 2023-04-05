import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login, loginRoute } from "./Login";
import { SignUp, signupRoute } from "./SignUp";
import { ForgotPassword, forgotPasswordRoute } from "./ForgotPassword";

export function Auth() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to={loginRoute} />} />
      <Route path={loginRoute}>
        <Login />
      </Route>
      <Route path={signupRoute}>
        <SignUp />
      </Route>
      <Route path={forgotPasswordRoute}>
        <ForgotPassword />
      </Route>
    </Switch>
  );
}
