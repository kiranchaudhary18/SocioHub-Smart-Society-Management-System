export interface Announcement {
  id: string;
  title: string;
  category: "System" | "Emergency" | "Update" | "Festival";
  priority: "High" | "Medium" | "Low";
  audience: string;
  status: "Sent" | "Scheduled" | "Draft";
  readRate: number;
  date: string;
}

export const announcementKPIs = {
  totalSent: { value: 124, trend: "+12", positive: true },
  scheduled: { value: 8, trend: "+2", positive: true },
  drafts: { value: 3, trend: "-1", positive: false },
  avgReadRate: { value: "84%", trend: "+5%", positive: true }
};

export const mockAnnouncements: Announcement[] = [
  {
    id: "ANN-001",
    title: "Scheduled Maintenance: Core Infrastructure Upgrade",
    category: "System",
    priority: "High",
    audience: "All Societies",
    status: "Sent",
    readRate: 88,
    date: "2026-07-20T10:00:00Z"
  },
  {
    id: "ANN-002",
    title: "New Feature: Automated Visitor Passes",
    category: "Update",
    priority: "Medium",
    audience: "All Societies",
    status: "Sent",
    readRate: 72,
    date: "2026-07-18T14:30:00Z"
  },
  {
    id: "ANN-003",
    title: "Urgent: Regional Network Outage Expected",
    category: "Emergency",
    priority: "High",
    audience: "Bengaluru City",
    status: "Scheduled",
    readRate: 0,
    date: "2026-07-22T08:00:00Z"
  },
  {
    id: "ANN-004",
    title: "Diwali Celebration Guidelines",
    category: "Festival",
    priority: "Low",
    audience: "All Societies",
    status: "Draft",
    readRate: 0,
    date: "2026-07-15T09:00:00Z"
  }
];
