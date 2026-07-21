import { mockPlatformUsers, platformUserKPIs } from "../mock/users";

export const UsersService = {
  // GET /api/v1/users/kpis
  // TODO: Replace with Spring Boot API
  getKPIs: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(platformUserKPIs), 400));
  },

  // GET /api/v1/users
  // TODO: Replace with Spring Boot API
  getAllUsers: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockPlatformUsers), 600));
  }
};
