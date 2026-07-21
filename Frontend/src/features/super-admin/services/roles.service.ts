import { mockRoles } from "../mock/roles";

export const RolesService = {
  getAllRoles: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockRoles), 500));
  }
};
