import { useQuery } from "@tanstack/react-query";
import { UsersService } from "../services/users.service";
import type { PlatformUser } from "../mock/users";

export function usePlatformUsers() {
  return useQuery({
    queryKey: ['super-admin', 'users'],
    queryFn: UsersService.getAllUsers as () => Promise<PlatformUser[]>
  });
}

export function usePlatformUserKPIs() {
  return useQuery({
    queryKey: ['super-admin', 'users', 'kpis'],
    queryFn: UsersService.getKPIs as () => Promise<any>
  });
}
