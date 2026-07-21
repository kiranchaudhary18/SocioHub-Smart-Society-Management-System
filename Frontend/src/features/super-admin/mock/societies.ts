export interface Society {
  id: string;
  name: string;
  location: string;
  secretary: string;
  residentsCount: number;
  status: "Active" | "Suspended" | "Onboarding";
  joinDate: string;
}

export const mockSocieties: Society[] = [
  {
    id: "SOC-001",
    name: "Green Valley Apartments",
    location: "Bengaluru, KA",
    secretary: "Amit Shah",
    residentsCount: 450,
    status: "Active",
    joinDate: "2023-01-15T00:00:00Z",
  },
  {
    id: "SOC-002",
    name: "Blue Ridge Residency",
    location: "Pune, MH",
    secretary: "Neha Patil",
    residentsCount: 1200,
    status: "Active",
    joinDate: "2022-11-05T00:00:00Z",
  },
  {
    id: "SOC-003",
    name: "Sunrise Towers",
    location: "Mumbai, MH",
    secretary: "Vikram Singh",
    residentsCount: 300,
    status: "Suspended",
    joinDate: "2024-02-20T00:00:00Z",
  },
  {
    id: "SOC-004",
    name: "Ocean View",
    location: "Chennai, TN",
    secretary: "Rahul Dravid",
    residentsCount: 850,
    status: "Active",
    joinDate: "2023-08-12T00:00:00Z",
  },
  {
    id: "SOC-005",
    name: "Lotus Crest",
    location: "Delhi, NCR",
    secretary: "Priya Sharma",
    residentsCount: 60,
    status: "Onboarding",
    joinDate: "2024-07-01T00:00:00Z",
  },
  {
    id: "SOC-006",
    name: "Silver Oaks",
    location: "Hyderabad, TS",
    secretary: "Kiran Reddy",
    residentsCount: 210,
    status: "Active",
    joinDate: "2023-05-18T00:00:00Z",
  }
];
