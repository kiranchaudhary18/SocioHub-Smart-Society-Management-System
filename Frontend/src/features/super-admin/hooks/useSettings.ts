import { useQuery } from "@tanstack/react-query";
import { SettingsService } from "../services/settings.service";
import type { PlatformSettings } from "../mock/settings";

export function usePlatformSettings() {
  return useQuery({
    queryKey: ['super-admin', 'settings'],
    queryFn: SettingsService.getSettings as () => Promise<PlatformSettings>
  });
}

export function useSystemHealth() {
  return useQuery({
    queryKey: ['super-admin', 'settings', 'health'],
    queryFn: SettingsService.getSystemHealth as () => Promise<any>
  });
}
