import { mockAnnouncements, announcementKPIs } from "../mock/announcements";

export const AnnouncementsService = {
  // GET /api/v1/announcements/kpis
  // TODO: Replace with Spring Boot API
  getKPIs: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(announcementKPIs), 300));
  },

  // GET /api/v1/announcements
  // TODO: Replace with Spring Boot API
  getAllAnnouncements: async () => {
    return new Promise((resolve) => setTimeout(() => resolve(mockAnnouncements), 500));
  }
};
