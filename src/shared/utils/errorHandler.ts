import * as Sentry from "@sentry/react";
import { notification } from "antd";

const errorHandler = (error: any) => {
  const defaultMsg =
    error?.response?.data?.message ||
    error?.response?.data?.responseMessage ||
    error?.errorFields?.[0]["errors"];
  const msg = defaultMsg || error.message || "Something went wrong!";

  Sentry.captureException(error);

  notification.error({
    message: "Failed",
    description: msg,
    placement: "topRight",
  });
};

export default errorHandler;
