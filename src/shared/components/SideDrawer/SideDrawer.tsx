import styles from "./index.module.scss";
import { Drawer, Col } from "antd";
import { useState } from "react";
import { AlignLeftOutlined } from "@ant-design/icons";
export const SideDrawer = ({
  placement,
  children,
  isTrackingLayout = false,
}: any) => {
  const [hamburg, setHamburg] = useState(false);
  function handleHamburg() {
    setHamburg(!hamburg);
  }
  return (
    <>
      <AlignLeftOutlined
        onClick={handleHamburg}
        style={{ color: "white", fontSize: "25px" }}
        id={styles.hamburgForNavbar}
      />
      <Drawer
        className={styles.drawer}
        bodyStyle={{ padding: "0", position: "relative", height: "100vh" }}
        placement={placement}
        closable={true}
        onClose={() => handleHamburg()}
        visible={hamburg}
      >
        {children}
      </Drawer>
      <>
        <Col span={isTrackingLayout || 4} className={styles.sideDrawer}>
          <Col style={{ height: "100%" }} span={24} className="sideBar">
            {children}
          </Col>
        </Col>
      </>
    </>
  );
};
