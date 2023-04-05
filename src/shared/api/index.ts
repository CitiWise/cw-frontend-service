import axios from "axios";
import { envs } from "../utils/env";
import { initAxiosInterceptor } from "./axios";
const { umsBaseUrl, vmsBaseUrl } = envs;

export const apiUms = axios.create({
  baseURL: umsBaseUrl,
  withCredentials: true,
});

export const apiVms = axios.create({
  baseURL: vmsBaseUrl,
  withCredentials: true,
});

/**
 * adds appType request header in requests
 */
initAxiosInterceptor([apiVms, apiUms]);
