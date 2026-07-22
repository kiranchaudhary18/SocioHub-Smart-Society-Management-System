export interface VisitorPassesKPIs {
  todayVisitors: number;
  upcomingVisitors: number;
  deliveryVisitors: number;
  activePasses: number;
}

export interface VisitorHistoryKPIs {
  totalVisitors: number;
  todayEntries: number;
  completedVisits: number;
  cancelledVisits: number;
}

export interface VisitorPass {
  id: string;
  visitorName: string;
  phone: string;
  type: string;
  purpose: string;
  visitDate: string;
  expectedTime: string;
  vehicleNumber?: string;
  visitorsCount: number;
  notes?: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
}

export interface VisitorHistoryRecord {
  id: string;
  visitorName: string;
  photoUrl: string;
  phone: string;
  type: string;
  purpose: string;
  visitDate: string;
  expectedTime: string;
  actualEntryTime: string;
  actualExitTime: string | null;
  vehicleNumber: string | null;
  status: "COMPLETED" | "ACTIVE" | "CANCELLED" | "DENIED";
  securityVerification: "VERIFIED" | "PENDING" | "FAILED";
  residentNotes: string | null;
  passId: string | null;
}

class VisitorService {
  async getVisitorPassesKPIs(): Promise<VisitorPassesKPIs> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      todayVisitors: 3,
      upcomingVisitors: 5,
      deliveryVisitors: 2,
      activePasses: 4,
    };
  }

  async getUpcomingVisitors(): Promise<VisitorPass[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      {
        id: "PASS-1002",
        visitorName: "Amit Sharma",
        phone: "+91 9876543210",
        type: "Guest",
        purpose: "Dinner Party",
        visitDate: new Date().toISOString().split("T")[0],
        expectedTime: "19:00",
        visitorsCount: 2,
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      },
      {
        id: "PASS-1003",
        visitorName: "Amazon Delivery",
        phone: "+91 9876500000",
        type: "Delivery",
        purpose: "Package Drop",
        visitDate: new Date().toISOString().split("T")[0],
        expectedTime: "14:30",
        visitorsCount: 1,
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
      }
    ];
  }

  async getRecentPasses(): Promise<VisitorPass[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      {
        id: "PASS-1001",
        visitorName: "Urban Company",
        phone: "+91 8888888888",
        type: "Service",
        purpose: "AC Repair",
        visitDate: "2026-07-20",
        expectedTime: "10:00",
        vehicleNumber: "KA-01-XY-1234",
        visitorsCount: 1,
        status: "COMPLETED",
        createdAt: "2026-07-19T08:00:00Z",
      },
      {
        id: "PASS-1000",
        visitorName: "Priya Desai",
        phone: "+91 7777777777",
        type: "Friend",
        purpose: "Casual Visit",
        visitDate: "2026-07-18",
        expectedTime: "18:00",
        visitorsCount: 1,
        status: "COMPLETED",
        createdAt: "2026-07-17T12:00:00Z",
      }
    ];
  }

  async generateVisitorPass(data: Partial<VisitorPass>): Promise<VisitorPass> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simulate API Response
    const passId = `PASS-${Math.floor(Math.random() * 10000) + 2000}`;
    return {
      ...data,
      id: passId,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    } as VisitorPass;
  }

  async getVisitorHistoryKPIs(): Promise<VisitorHistoryKPIs> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      totalVisitors: 142,
      todayEntries: 2,
      completedVisits: 138,
      cancelledVisits: 4,
    };
  }

  async getVisitorHistory(): Promise<VisitorHistoryRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      {
        id: "VH-5001",
        visitorName: "Urban Company",
        photoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Urban Company&backgroundColor=00a3cc,7b68ee",
        phone: "+91 8888888888",
        type: "Service",
        purpose: "AC Repair",
        visitDate: "2026-07-20",
        expectedTime: "10:00",
        actualEntryTime: "10:15",
        actualExitTime: "11:45",
        vehicleNumber: "KA-01-XY-1234",
        status: "COMPLETED",
        securityVerification: "VERIFIED",
        residentNotes: "Pre-approved via App.",
        passId: "PASS-1001",
      },
      {
        id: "VH-5002",
        visitorName: "Priya Desai",
        photoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Priya Desai&backgroundColor=FF5DA2,FFD166",
        phone: "+91 7777777777",
        type: "Friend",
        purpose: "Casual Visit",
        visitDate: "2026-07-18",
        expectedTime: "18:00",
        actualEntryTime: "18:22",
        actualExitTime: "22:10",
        vehicleNumber: null,
        status: "COMPLETED",
        securityVerification: "VERIFIED",
        residentNotes: null,
        passId: "PASS-1000",
      },
      {
        id: "VH-5003",
        visitorName: "Unknown Delivery",
        photoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Unknown&backgroundColor=e2e8f0,cbd5e1",
        phone: "N/A",
        type: "Delivery",
        purpose: "Food Delivery",
        visitDate: "2026-07-15",
        expectedTime: "20:00",
        actualEntryTime: "20:05",
        actualExitTime: "20:15",
        vehicleNumber: "KA-51-AB-9999",
        status: "COMPLETED",
        securityVerification: "VERIFIED",
        residentNotes: "Left at door",
        passId: null,
      },
      {
        id: "VH-5004",
        visitorName: "Sales Person",
        photoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Sales&backgroundColor=ef4444,f87171",
        phone: "+91 9999999999",
        type: "Other",
        purpose: "Marketing",
        visitDate: "2026-07-12",
        expectedTime: "14:00",
        actualEntryTime: "14:00",
        actualExitTime: null,
        vehicleNumber: null,
        status: "DENIED",
        securityVerification: "FAILED",
        residentNotes: "Refused entry.",
        passId: null,
      }
    ];
  }
}

export const visitorService = new VisitorService();
