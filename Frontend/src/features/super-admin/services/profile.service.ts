import { mockProfile } from "../mock/profile";

export const ProfileService = {
  getProfile: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockProfile), 300));
  }
};
