import { mockSettings, systemHealthData } from "../mock/settings";

export const SettingsService = {
  getSettings: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockSettings), 300));
  },
  
  getSystemHealth: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(systemHealthData), 200));
  }
};
