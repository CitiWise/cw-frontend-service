import React from "react";
import { Header } from "./Header";
import styles from "./index.module.scss";

export function AppLayout(props: any) {
  const { children, currentRoute, topBar } = props;
  return (
    <>
      <Header currentRoute={currentRoute} />
      <div className={styles.mainContainer}>{children}</div>
    </>
  );
}
