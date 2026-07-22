export interface ResidentProfile {
  id: string;
  name: string;
  flatNumber: string;
  tower: string;
  type: "OWNER" | "TENANT";
  societyName: string;
  memberSince: string;
  parkingSlot: string;
  avatarUrl?: string;
}

export interface KPIData {
  outstandingMaintenance: number;
  activeComplaints: number;
  visitorsToday: number;
  expectedVisitors: number;
  upcomingBookings: number;
  unreadNotices: number;
  upcomingEvents: number;
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  type: "MAINTENANCE" | "UTILITY" | "PENALTY";
  amount: number;
  date: string;
  status: "PAID" | "PENDING" | "FAILED";
}

export interface ComplaintRecord {
  id: string;
  category: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdDate: string;
  title: string;
}

export interface VisitorRecord {
  id: string;
  name: string;
  purpose: string;
  expectedTime?: string;
  entryTime?: string;
  status: "EXPECTED" | "ENTERED" | "DEPARTED";
}

export interface BookingRecord {
  id: string;
  facility: string;
  date: string;
  timeSlot: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
}

export interface NoticeRecord {
  id: string;
  title: string;
  priority: "HIGH" | "NORMAL";
  date: string;
  isRead: boolean;
}

export interface EventRecord {
  id: string;
  title: string;
  date: string;
  venue: string;
}

export interface DashboardSummary {
  profile: ResidentProfile;
  kpis: KPIData;
  recentPayments: PaymentRecord[];
  activeComplaints: ComplaintRecord[];
  todayVisitors: VisitorRecord[];
  upcomingBookings: BookingRecord[];
  latestNotices: NoticeRecord[];
  upcomingEvents: EventRecord[];
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const residentDashboardService = {
  // TODO: Replace with Spring Boot API -> GET /api/v1/resident/dashboard/summary
  async getDashboardSummary(): Promise<DashboardSummary> {
    await delay(1200);

    return {
      profile: {
        id: "RES-1029",
        name: "Kiran Dekaliya",
        flatNumber: "B-504",
        tower: "Tower B",
        type: "OWNER",
        societyName: "Prestige Falcon City",
        memberSince: "Jan 2024",
        parkingSlot: "P-27",
      },
      kpis: {
        outstandingMaintenance: 3200,
        activeComplaints: 2,
        visitorsToday: 1,
        expectedVisitors: 2,
        upcomingBookings: 1,
        unreadNotices: 3,
        upcomingEvents: 2,
      },
      recentPayments: [
        { id: "PAY-1", receiptNumber: "RCP-8821", type: "MAINTENANCE", amount: 3200, date: "2026-06-10", status: "PAID" },
        { id: "PAY-2", receiptNumber: "RCP-8420", type: "UTILITY", amount: 1450, date: "2026-06-05", status: "PAID" },
        { id: "PAY-3", receiptNumber: "RCP-8110", type: "MAINTENANCE", amount: 3200, date: "2026-05-10", status: "PAID" },
      ],
      activeComplaints: [
        { id: "CMP-1", title: "Plumbing issue in master bathroom", category: "Plumbing", priority: "HIGH", status: "OPEN", createdDate: "2026-07-21" },
        { id: "CMP-2", title: "Corridor light not working", category: "Electrical", priority: "LOW", status: "IN_PROGRESS", createdDate: "2026-07-18" },
      ],
      todayVisitors: [
        { id: "VIS-1", name: "Amazon Delivery", purpose: "Delivery", entryTime: "10:30 AM", status: "ENTERED" },
        { id: "VIS-2", name: "Rahul Sharma", purpose: "Guest", expectedTime: "04:00 PM", status: "EXPECTED" },
      ],
      upcomingBookings: [
        { id: "BKG-1", facility: "Clubhouse - Badminton Court 1", date: "2026-07-24", timeSlot: "18:00 - 19:00", status: "CONFIRMED" },
      ],
      latestNotices: [
        { id: "NOT-1", title: "Scheduled Power Maintenance", priority: "HIGH", date: "2026-07-22", isRead: false },
        { id: "NOT-2", title: "Monsoon Preparedness Guidelines", priority: "NORMAL", date: "2026-07-20", isRead: false },
        { id: "NOT-3", title: "Annual General Body Meeting", priority: "HIGH", date: "2026-07-15", isRead: true },
      ],
      upcomingEvents: [
        { id: "EVT-1", title: "Community Yoga Session", date: "2026-07-25", venue: "Central Park" },
        { id: "EVT-2", title: "Ganesh Chaturthi Celebration", date: "2026-08-15", venue: "Clubhouse Hall" },
      ]
    };
  }
};
