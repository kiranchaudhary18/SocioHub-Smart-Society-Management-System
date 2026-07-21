import { mockSocieties } from "../mock/societies";

export const SocietiesService = {
  // GET /api/v1/societies
  getAllSocieties: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockSocieties), 500));
  }
};
