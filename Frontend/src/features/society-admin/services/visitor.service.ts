export interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  photo?: string;
  phone: string;
  purpose: "GUEST" | "DELIVERY" | "SERVICE" | "CAB";
  status: "PENDING" | "APPROVED" | "INSIDE" | "CHECKED_OUT" | "REJECTED";
  residentName: string;
  building: string;
  flat: string;
  expectedTime: string;
  checkInTime?: string;
  checkOutTime?: string;
  vehicleNumber?: string;
  passId?: string;
}

export interface VisitorPass {
  id: string;
  visitorId: string;
  visitorName: string;
  residentName: string;
  flat: string;
  building: string;
  validFrom: string;
  validUntil: string;
  qrCodeUrl: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
}

const mockVisitors: Visitor[] = [
  {
    id: "vis_1",
    firstName: "Ramesh",
    lastName: "Kumar",
    photo: "https://i.pravatar.cc/150?u=vis_1",
    phone: "+91 98765 11111",
    purpose: "SERVICE",
    status: "INSIDE",
    residentName: "Arjun Reddy",
    building: "Block A",
    flat: "A-101",
    expectedTime: "10:00 AM",
    checkInTime: "10:15 AM",
    vehicleNumber: "KA 01 MX 1234",
    passId: "pass_1001"
  },
  {
    id: "vis_2",
    firstName: "Amit",
    lastName: "Singh",
    phone: "+91 98765 22222",
    purpose: "DELIVERY",
    status: "CHECKED_OUT",
    residentName: "Priya Sharma",
    building: "Block B",
    flat: "B-205",
    expectedTime: "11:30 AM",
    checkInTime: "11:35 AM",
    checkOutTime: "11:45 AM",
    vehicleNumber: "MH 12 YZ 5678",
  },
  {
    id: "vis_3",
    firstName: "Sujata",
    lastName: "Menon",
    photo: "https://i.pravatar.cc/150?u=vis_3",
    phone: "+91 98765 33333",
    purpose: "GUEST",
    status: "PENDING",
    residentName: "Vikram Singh",
    building: "Block C",
    flat: "C-502",
    expectedTime: "06:00 PM",
  },
  {
    id: "vis_4",
    firstName: "Abdul",
    lastName: "Kalam",
    phone: "+91 98765 44444",
    purpose: "CAB",
    status: "APPROVED",
    residentName: "Anjali Desai",
    building: "Block A",
    flat: "A-304",
    expectedTime: "01:00 PM",
    vehicleNumber: "DL 04 CA 9876",
    passId: "pass_1002"
  }
];

const mockPasses: VisitorPass[] = [
  {
    id: "pass_1001",
    visitorId: "vis_1",
    visitorName: "Ramesh Kumar",
    residentName: "Arjun Reddy",
    flat: "A-101",
    building: "Block A",
    validFrom: "22 Jul 2026, 10:00 AM",
    validUntil: "22 Jul 2026, 06:00 PM",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pass_1001",
    status: "ACTIVE"
  },
  {
    id: "pass_1002",
    visitorId: "vis_4",
    visitorName: "Abdul Kalam",
    residentName: "Anjali Desai",
    flat: "A-304",
    building: "Block A",
    validFrom: "22 Jul 2026, 01:00 PM",
    validUntil: "22 Jul 2026, 02:00 PM",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pass_1002",
    status: "ACTIVE"
  }
];

class VisitorService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getVisitors(): Promise<{ data: Visitor[], total: number }> {
    return new Promise(resolve => setTimeout(() => resolve({
      data: mockVisitors,
      total: mockVisitors.length
    }), 500));
  }

  async getVisitor(id: string): Promise<Visitor | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockVisitors.find(v => v.id === id)
    ), 500));
  }

  async getVisitorPasses(): Promise<VisitorPass[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockPasses), 500));
  }

  async getVisitorKPIs() {
    return new Promise(resolve => setTimeout(() => resolve({
      todayVisitors: 142,
      pendingApprovals: 5,
      approved: 110,
      rejected: 4,
      insideSociety: 23,
      scheduled: 12,
      passesIssued: 120,
      frequentVisitors: 45
    }), 500));
  }
}

export const visitorService = new VisitorService();
