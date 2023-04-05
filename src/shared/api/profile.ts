import { envs } from "../utils/env";
import { apiUms } from "./index";

export const obtainProfileData = () => {
  return apiUms.get(`/ums/profile/${envs.appType}`);
};

export const updateProfileDetails = (data: any) => {
  return apiUms.put(`/ums/profile/${envs.appType}`, data);
};

export const changePassword = (data: any) => {
  return apiUms.put("/ums/password", data);
};
