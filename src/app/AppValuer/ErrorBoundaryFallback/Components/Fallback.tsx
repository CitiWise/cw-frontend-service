import React from "react";
import { Col, Button } from "antd";

export function Fallback({ fallBackMessage }: any) {
  return (
    <Col
      span={20}
      className="main fallback"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <h3 className="fallback" style={{ color: "#213242" }}>
        {fallBackMessage}
      </h3>
      <Button type="primary" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </Col>
  );
}
