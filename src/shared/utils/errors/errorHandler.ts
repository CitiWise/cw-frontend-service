import { notification } from "antd";

const errorNotifier = (error: any) => {
  const message =
    error?.response?.body?.message || error?.message || "Something went wrong";
  console.log(message);
  console.log(error.stack || "no stack trace available");
  notification.error({
    message: "Failed",
    description: message,
  });
};

export default errorNotifier;
