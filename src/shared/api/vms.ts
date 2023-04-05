import { apiVms } from ".";

export const generateRequest = (formData: any) => {
  return apiVms.post("/valuation/initialize", formData);
};
