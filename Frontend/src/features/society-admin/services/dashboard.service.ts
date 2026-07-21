// TODO: Replace with actual Spring Boot REST APIs
// Base URL: /api/v1/society/dashboard

export interface DashboardStats {
  overview: {
    buildings: number;
    flats: { total: number; occupied: number; vacant: number };
    residents: number;
    staff: number;
    security: number;
    visitorsToday: number;
    parkingUsage: number;
    maintenanceCollection: number; // percentage
  };
  visitors: {
    today: number;
    pending: number;
    approved: number;
    rejected: number;
    hourlyData: { time: string; count: number }[];
  };
  complaints: {
    open: number;
    inProgress: number;
    resolved: number;
    highPriority: number;
  };
  maintenance: {
    monthlyCollection: number;
    pendingAmount: number;
    paidAmount: number;
    collectionRate: number;
    monthlyData: { month: string; collected: number; pending: number }[];
  };
  parking: {
    occupied: number;
    vacant: number;
    visitor: number;
    evCharging: number;
  };
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    type: string;
  }[];
  latestNotices: {
    id: string;
    title: string;
    date: string;
    isPinned: boolean;
  }[];
  pendingTasks: {
    id: string;
    title: string;
    due: string;
    type: "Approval" | "Task" | "Meeting";
  }[];
  timeline: {
    id: string;
    title: string;
    time: string;
    type: "Visitor" | "Resident" | "Payment" | "Complaint";
    desc: string;
  }[];
}

const mockStats: DashboardStats = {
  overview: {
    buildings: 12,
    flats: { total: 450, occupied: 412, vacant: 38 },
    residents: 1250,
    staff: 45,
    security: 24,
    visitorsToday: 142,
    parkingUsage: 88,
    maintenanceCollection: 92,
  },
  visitors: {
    today: 142,
    pending: 12,
    approved: 125,
    rejected: 5,
    hourlyData: [
      { time: "8 AM", count: 12 },
      { time: "10 AM", count: 45 },
      { time: "12 PM", count: 22 },
      { time: "2 PM", count: 18 },
      { time: "4 PM", count: 30 },
      { time: "6 PM", count: 15 },
    ]
  },
  complaints: {
    open: 8,
    inProgress: 12,
    resolved: 145,
    highPriority: 3,
  },
  maintenance: {
    monthlyCollection: 2500000,
    pendingAmount: 200000,
    paidAmount: 2300000,
    collectionRate: 92,
    monthlyData: [
      { month: "Jan", collected: 2400000, pending: 100000 },
      { month: "Feb", collected: 2350000, pending: 150000 },
      { month: "Mar", collected: 2450000, pending: 50000 },
      { month: "Apr", collected: 2200000, pending: 300000 },
      { month: "May", collected: 2300000, pending: 200000 },
    ]
  },
  parking: {
    occupied: 400,
    vacant: 45,
    visitor: 35,
    evCharging: 20,
  },
  upcomingEvents: [
    { id: "e1", title: "Annual General Meeting", date: "Aug 20, 2026", type: "Important" },
    { id: "e2", title: "Yoga Workshop", date: "Aug 22, 2026", type: "Wellness" },
    { id: "e3", title: "Blood Donation Camp", date: "Aug 25, 2026", type: "Community" },
  ],
  latestNotices: [
    { id: "n1", title: "Water Supply Interruption", date: "Today, 10:00 AM", isPinned: true },
    { id: "n2", title: "Gym Maintenance Schedule", date: "Yesterday, 2:00 PM", isPinned: false },
    { id: "n3", title: "New Security Protocols", date: "Jul 18, 2026", isPinned: false },
  ],
  pendingTasks: [
    { id: "t1", title: "Approve 5 Visitor Passes", due: "Today", type: "Approval" },
    { id: "t2", title: "Vendor Payment (Lift AMC)", due: "Tomorrow", type: "Task" },
    { id: "t3", title: "Meeting with Security Head", due: "4:00 PM", type: "Meeting" },
  ],
  timeline: [
    { id: "tl1", title: "New resident move-in", time: "2 hours ago", type: "Resident", desc: "Flat A-402 has new tenants." },
    { id: "tl2", title: "Plumbing Complaint", time: "3 hours ago", type: "Complaint", desc: "Leakage in B-201 reported." },
    { id: "tl3", title: "Payment Received", time: "5 hours ago", type: "Payment", desc: "₹25,000 collected for AMC." },
    { id: "tl4", title: "Swiggy Delivery", time: "6 hours ago", type: "Visitor", desc: "Approved at Gate 1." },
  ]
};

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    // Simulate network delay
    return new Promise((resolve) => setTimeout(() => resolve(mockStats), 800));
  }
};
