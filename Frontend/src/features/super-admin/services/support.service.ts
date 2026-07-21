import { mockTickets, supportKPIs } from "../mock/support";

export const SupportService = {
  getKPIs: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(supportKPIs), 300));
  },

  getAllTickets: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockTickets), 500));
  }
};
