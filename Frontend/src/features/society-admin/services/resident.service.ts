export interface Resident {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  type: "OWNER" | "TENANT";
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  building: string;
  flat: string;
  email: string;
  phone: string;
  moveInDate: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  familyMembersCount: number;
  vehiclesCount: number;
}

export interface FamilyMember {
  id: string;
  residentId: string;
  name: string;
  relation: string;
  age: number;
  phone?: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface ApprovalRequest {
  id: string;
  firstName: string;
  lastName: string;
  type: "OWNER" | "TENANT";
  building: string;
  flat: string;
  requestDate: string;
  documents: { name: string; url: string }[];
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const mockResidents: Resident[] = [
  {
    id: "res_1",
    firstName: "Arjun",
    lastName: "Reddy",
    avatar: "https://i.pravatar.cc/150?u=res_1",
    type: "OWNER",
    status: "ACTIVE",
    building: "Block A",
    flat: "A-101",
    email: "arjun.r@example.com",
    phone: "+91 98765 43210",
    moveInDate: "15 Jan, 2024",
    emergencyContact: { name: "Neha Reddy", phone: "+91 98765 43211", relation: "Wife" },
    familyMembersCount: 3,
    vehiclesCount: 2
  },
  {
    id: "res_2",
    firstName: "Priya",
    lastName: "Sharma",
    avatar: "https://i.pravatar.cc/150?u=res_2",
    type: "TENANT",
    status: "ACTIVE",
    building: "Block B",
    flat: "B-205",
    email: "priya.s@example.com",
    phone: "+91 87654 32109",
    moveInDate: "01 Mar, 2025",
    emergencyContact: { name: "Rahul Sharma", phone: "+91 87654 32100", relation: "Husband" },
    familyMembersCount: 1,
    vehiclesCount: 1
  },
  {
    id: "res_3",
    firstName: "Vikram",
    lastName: "Singh",
    avatar: "https://i.pravatar.cc/150?u=res_3",
    type: "OWNER",
    status: "INACTIVE",
    building: "Block C",
    flat: "C-502",
    email: "vikram.s@example.com",
    phone: "+91 76543 21098",
    moveInDate: "10 Feb, 2023",
    emergencyContact: { name: "Meera Singh", phone: "+91 76543 21000", relation: "Wife" },
    familyMembersCount: 0,
    vehiclesCount: 0
  },
  {
    id: "res_4",
    firstName: "Anjali",
    lastName: "Desai",
    avatar: "https://i.pravatar.cc/150?u=res_4",
    type: "TENANT",
    status: "PENDING",
    building: "Block A",
    flat: "A-304",
    email: "anjali.d@example.com",
    phone: "+91 65432 10987",
    moveInDate: "Waiting for approval",
    emergencyContact: { name: "Karan Desai", phone: "+91 65432 10900", relation: "Brother" },
    familyMembersCount: 2,
    vehiclesCount: 1
  }
];

const mockApprovals: ApprovalRequest[] = [
  {
    id: "app_1",
    firstName: "Suresh",
    lastName: "Nair",
    type: "TENANT",
    building: "Block B",
    flat: "B-405",
    requestDate: "20 Jul, 2026",
    documents: [
      { name: "Aadhar_Card.pdf", url: "#" },
      { name: "Rent_Agreement.pdf", url: "#" }
    ],
    status: "PENDING"
  },
  {
    id: "app_2",
    firstName: "Kavya",
    lastName: "Iyer",
    type: "OWNER",
    building: "Block C",
    flat: "C-101",
    requestDate: "21 Jul, 2026",
    documents: [
      { name: "Sale_Deed.pdf", url: "#" }
    ],
    status: "PENDING"
  }
];

const mockFamilyMembers: FamilyMember[] = [
  { id: "fam_1", residentId: "res_1", name: "Neha Reddy", relation: "Wife", age: 32, phone: "+91 98765 43211", status: "ACTIVE" },
  { id: "fam_2", residentId: "res_1", name: "Aryan Reddy", relation: "Son", age: 8, status: "ACTIVE" },
  { id: "fam_3", residentId: "res_2", name: "Rahul Sharma", relation: "Husband", age: 29, phone: "+91 87654 32100", status: "ACTIVE" },
];

class ResidentService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getResidents(): Promise<{ data: Resident[], total: number }> {
    return new Promise(resolve => setTimeout(() => resolve({
      data: mockResidents,
      total: mockResidents.length
    }), 500));
  }

  async getResident(id: string): Promise<Resident | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockResidents.find(r => r.id === id)
    ), 500));
  }

  async getFamilyMembers(): Promise<FamilyMember[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockFamilyMembers), 500));
  }

  async getApprovalRequests(): Promise<ApprovalRequest[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockApprovals), 500));
  }

  async getResidentKPIs() {
    return new Promise(resolve => setTimeout(() => resolve({
      total: 450,
      owners: 312,
      tenants: 138,
      pendingApprovals: 5,
      inactive: 12,
      familyMembers: 840,
      vehicles: 320,
      newThisMonth: 14
    }), 500));
  }
}

export const residentService = new ResidentService();
