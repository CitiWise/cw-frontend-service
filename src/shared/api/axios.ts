import { envs } from "../utils/env";
const { appType } = envs;

const setupAxiosInterceptor = (axios: any) => {
  axios.interceptors.request.use(async (request: any) => {
    if (appType) {
      // passing appType to get the idea from which panel request has been made
      request.headers["appType"] = appType;
    }
    return request;
  });

  axios.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      throw error;
    }
  );
};

export const initAxiosInterceptor = (axiosInstance: any) => {
  axiosInstance.forEach((element: any) => {
    setupAxiosInterceptor(element);
  });
};
