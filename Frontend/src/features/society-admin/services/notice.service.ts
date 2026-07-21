export type NoticeStatus = "PUBLISHED" | "DRAFT" | "SCHEDULED" | "EXPIRED";
export type NoticeCategory = "GENERAL" | "MAINTENANCE" | "EMERGENCY" | "EVENT" | "FINANCE";
export type NoticePriority = "HIGH" | "MEDIUM" | "LOW";

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  priority: NoticePriority;
  status: NoticeStatus;
  publishDate: string;
  expiryDate?: string;
  author: string;
  isPinned: boolean;
  viewCount: number;
  totalResidents: number;
  audience: string; // e.g., "All Residents", "Block A", "Owners Only"
  attachments?: { name: string; size: string; type: string }[];
}

export interface NoticeStats {
  published: number;
  drafts: number;
  scheduled: number;
  pinned: number;
  unread: number;
  expired: number;
}

const mockNotices: Notice[] = [
  {
    id: "NOT-2024-001",
    title: "Annual General Meeting (AGM) 2026",
    content: "The Annual General Meeting for the year 2026 will be held on the 15th of August. All residents are requested to attend. The agenda includes budget approvals and new committee elections.",
    category: "GENERAL",
    priority: "HIGH",
    status: "PUBLISHED",
    publishDate: "20 Jul 2026, 10:00 AM",
    author: "Society Secretary",
    isPinned: true,
    viewCount: 145,
    totalResidents: 250,
    audience: "All Owners",
    attachments: [
      { name: "AGM_Agenda_2026.pdf", size: "2.4 MB", type: "pdf" },
      { name: "Financial_Report_Q2.pdf", size: "4.1 MB", type: "pdf" }
    ]
  },
  {
    id: "NOT-2024-002",
    title: "Scheduled Power Cut - Block B",
    content: "There will be a scheduled power outage in Block B on Thursday from 2 PM to 4 PM for critical maintenance of the main transformer.",
    category: "MAINTENANCE",
    priority: "HIGH",
    status: "PUBLISHED",
    publishDate: "21 Jul 2026, 09:30 AM",
    expiryDate: "23 Jul 2026",
    author: "Maintenance Manager",
    isPinned: false,
    viewCount: 42,
    totalResidents: 80,
    audience: "Block B Residents"
  },
  {
    id: "NOT-2024-003",
    title: "Upcoming Diwali Celebration",
    content: "Join us for the grand Diwali celebration in the central courtyard. We are organizing a potluck and cultural events. Please register your participation.",
    category: "EVENT",
    priority: "MEDIUM",
    status: "SCHEDULED",
    publishDate: "01 Nov 2026, 09:00 AM",
    author: "Cultural Committee",
    isPinned: false,
    viewCount: 0,
    totalResidents: 250,
    audience: "All Residents",
    attachments: [
      { name: "Event_Poster.jpg", size: "1.2 MB", type: "image" }
    ]
  },
  {
    id: "NOT-2024-004",
    title: "Revised Maintenance Charges",
    content: "Draft regarding the proposed revision in maintenance charges starting next quarter.",
    category: "FINANCE",
    priority: "MEDIUM",
    status: "DRAFT",
    publishDate: "-",
    author: "Treasurer",
    isPinned: false,
    viewCount: 0,
    totalResidents: 250,
    audience: "All Owners"
  }
];

class NoticeService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getNotices(): Promise<Notice[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockNotices), 500));
  }

  async getNotice(id: string): Promise<Notice | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockNotices.find(n => n.id === id)
    ), 500));
  }

  async getStats(): Promise<NoticeStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      published: 45,
      drafts: 4,
      scheduled: 2,
      pinned: 1,
      unread: 12,
      expired: 108
    }), 500));
  }
}

export const noticeService = new NoticeService();
