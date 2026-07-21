import { useQuery } from "@tanstack/react-query";
import { RolesService } from "../services/roles.service";
import type { Role } from "../mock/roles";

export function useRoles() {
  return useQuery({
    queryKey: ['super-admin', 'roles'],
    queryFn: RolesService.getAllRoles as () => Promise<Role[]>
  });
}
