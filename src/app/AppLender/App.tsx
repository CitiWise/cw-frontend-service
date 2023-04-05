import { useContext, useEffect, useState } from "react";
import { get } from "lodash";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { AppLayout } from "../../shared/components/AppLayout";
import { HomePage, homeRoute } from "./HomePage";
import { Loading } from "../../shared/components/Loading";
import { AuthContext } from "../../shared/contexts/Auth";
import { GenerateRequest, genRequestRoute } from "./HomePage/GenerateRequest";

export const AppRoutes = ["/", "/app", homeRoute];

export function App() {
  const currentRoute = get(useLocation(), "pathname");

  const [loading, setLoading] = useState(false);
  const { authActions, authState } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    authActions.obtainProfileData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Loading loading={loading} />
      {authState.profileLoaded && (
        <AppLayout currentRoute={currentRoute}>
          <Switch>
            <Route
              exact
              path={["/app", "/"]}
              render={() => <Redirect to={homeRoute} />}
            />

            <Route exact path={"/home"} component={HomePage} />

            <Redirect from="*" to="/" />
          </Switch>
        </AppLayout>
      )}
    </>
  );
}
