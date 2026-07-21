import { useQuery } from "@tanstack/react-query";
import { AnnouncementsService } from "../services/announcements.service";
import type { Announcement } from "../mock/announcements";

export function useAnnouncements() {
  return useQuery({
    queryKey: ['super-admin', 'announcements'],
    queryFn: AnnouncementsService.getAllAnnouncements as () => Promise<Announcement[]>
  });
}

export function useAnnouncementKPIs() {
  return useQuery({
    queryKey: ['super-admin', 'announcements', 'kpis'],
    queryFn: AnnouncementsService.getKPIs as () => Promise<any>
  });
}
