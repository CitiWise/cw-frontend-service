import { useContext, useState } from "react";
import { isEqual } from "lodash";
import { Link } from "react-router-dom";
import { Row, Col, notification } from "antd";
import styles from "./index.module.scss";
import logo_white from "../../../images/logo_white.png";
import { AuthContext } from "../../../contexts/Auth";
import { Loading } from "../../../components/Loading";
import { envs } from "../../../utils/env";
import { Select, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const { appType } = envs;
const { Option } = Select;

export function Header(props: any) {
  const { currentRoute = "", topBar = [] } = props;
  const { authState, authActions } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [hamburg, setHamburg] = useState(false);
  async function logout() {
    try {
      setLoading(true);
      sessionStorage.setItem("sidebarMenuItem", "1");
      await authActions.logout();
    } catch (err: any) {
      notification.error({
        message: "Error!",
        description: err,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(value: any) {
    authActions.selectedCompanyId(value);
  }

  function handleHamburg() {
    setHamburg(!hamburg);
  }

  return (
    <>
      {loading && <Loading loading={true} />}
      <Drawer
        bodyStyle={{ padding: 0 }}
        title="Citiwise"
        placement={"right"}
        closable={true}
        onClose={() => setHamburg(false)}
        visible={hamburg}
        width="65%"
      >
        <nav
          className={`navbar navbar-expand-lg navbar-dark ${styles.navbarDrawer}`}
        >
          <Row>
            <Col id={styles.sidebarResponsivness}>
              <div className="navbar-nav">
                {topBar.map(({ route, key, label }: any) => {
                  return (
                    <div
                      key={key}
                      className={`nav-item ${
                        isEqual(route, currentRoute) ? "active" : ""
                      }`}
                    >
                      <Link to={route} className="nav-link">
                        {label}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className={styles.logoutButtonWithResponsivness}>
                <Link to={""} onClick={logout}>
                  Logout
                </Link>
              </div>
            </Col>
          </Row>
        </nav>
      </Drawer>
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <Row className="h-100 p-0 w-100">
          <Col span={4}>
            <Link className="navbar-brand" to="/">
              <img style={{ height: "3rem" }} src={logo_white} alt="logo" />
            </Link>
          </Col>
          <MenuOutlined
            onClick={handleHamburg}
            style={{ color: "white", fontSize: "25px" }}
            id={styles.hamburgForNavbar}
          />
          <Col span={20} className={styles.navbarForLargeScreen}>
            <ul className="navbar-nav">
              {topBar.map(({ route, key, label }: any) => {
                return (
                  <li
                    key={key}
                    className={`nav-item ${
                      isEqual(route, currentRoute) ? "active" : ""
                    }`}
                  >
                    <Link to={route} className="nav-link">
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li key="signout" className="nav-item">
                <div className="end_elements">
                  <Link to={""} onClick={logout} className="nav-link">
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </nav>
    </>
  );
}
