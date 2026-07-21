import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "../services/profile.service";
import type { UserProfile } from "../mock/profile";

export function useProfile() {
  return useQuery({
    queryKey: ['super-admin', 'profile'],
    queryFn: ProfileService.getProfile as () => Promise<UserProfile>
  });
}
