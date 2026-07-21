import { useQuery } from "@tanstack/react-query";
import { SocietiesService } from "../services/societies.service";
import type { Society } from "../mock/societies";

export function useSocieties() {
  return useQuery({
    queryKey: ['super-admin', 'societies'],
    queryFn: SocietiesService.getAllSocieties as () => Promise<Society[]>
  });
}
