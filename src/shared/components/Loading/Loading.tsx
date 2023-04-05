import React from "react";
import { Spin, Modal } from "antd";
import classNames from "classnames";
import styles from "./Loading.module.scss";
import { LoadingOutlined } from "@ant-design/icons";

export function Loading(props: any) {
  const { loading = false, modal = false, text = "" } = props;
  const icon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const elm = (
    <div
      className={classNames({
        [styles.indicator]: true,
        [styles.loading]: loading,
      })}
    >
      <Spin indicator={icon} />
      {text && <p>{text}</p>}
    </div>
  );
  if (!loading) {
    return null;
  }
  if (modal) {
    return (
      <Modal
        visible={loading}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          top: "50%",
        }}
      >
        {elm}
      </Modal>
    );
  } else {
    return elm;
  }
}
