import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Sidebar } from "../../../shared/components/AppLayout/Sidebar";
import { SideDrawer } from "../../../shared/components/SideDrawer/SideDrawer";
import { GenerateRequest } from "./GenerateRequest";
import styles from "./index.module.scss";
import { Profile } from "./Profile";
import { sidebarUtil } from "./utils";
import { Valuations } from "./Valuations";

export const homeRoute = "/home";

const HOME_SUB_PAGE_MAPPER = {
  1: <Valuations />,
  2: <GenerateRequest />,
  3: <Profile />,
};

const HOME_OPTIONS = {
  valuations: 1,
  generateRequest: 2,
  profile: 3,
};

export function HomePage(props = {}) {
  const { search } = useLocation();
  const history = useHistory();
  let tab = search.split("=")[1];
  if (!tab) {
    tab = "profile";
  }
  const [sidebarMenuItem, setSidebarMenuItem] = useState(
    HOME_OPTIONS[tab as keyof typeof HOME_OPTIONS]
  );

  useEffect(() => {
    let val;
    val = Object.keys(HOME_OPTIONS).find(
      (key) => HOME_OPTIONS[key as keyof typeof HOME_OPTIONS] == sidebarMenuItem
    );
    history.push(`/home?tab=${val}`);
  }, [sidebarMenuItem]);

  return (
    <Row className="h-100 p-0">
      <SideDrawer placement="left">
        {
          <Sidebar
            sideBarMenu={sidebarUtil.sideBar}
            bottomButtons={null}
            selectedMenu={sidebarMenuItem}
            onMenuItemSelect={setSidebarMenuItem}
          />
        }
      </SideDrawer>
      <Col sm={24} lg={20}>
        <div className={styles.homePageContainer}>
          {
            HOME_SUB_PAGE_MAPPER[
              sidebarMenuItem as keyof typeof HOME_SUB_PAGE_MAPPER
            ]
          }
        </div>
      </Col>
    </Row>
  );
}
