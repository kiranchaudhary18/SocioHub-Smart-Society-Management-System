import { mockCMSPages, cmsKPIs } from "../mock/cms";

export const CMSService = {
  getAllPages: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockCMSPages), 400));
  },
  
  getKPIs: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(cmsKPIs), 300));
  }
};
