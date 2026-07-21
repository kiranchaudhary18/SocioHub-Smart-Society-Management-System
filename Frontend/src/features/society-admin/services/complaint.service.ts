export type ComplaintStatus = "NEW" | "ASSIGNED" | "IN_PROGRESS" | "WAITING" | "RESOLVED" | "CLOSED";
export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type ComplaintCategory = "PLUMBING" | "ELECTRICAL" | "CARPENTRY" | "CLEANING" | "SECURITY" | "OTHER";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  residentName: string;
  building: string;
  flat: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  assignedTo?: string;
  assignedStaffAvatar?: string;
}

export interface ComplaintStats {
  openComplaints: number;
  assigned: number;
  inProgress: number;
  resolved: number;
  highPriority: number;
  avgResolutionHours: number;
  todaysNew: number;
}

const mockComplaints: Complaint[] = [
  {
    id: "CMP-2034",
    title: "Water leaking from kitchen sink",
    description: "The pipe under the kitchen sink is leaking heavily.",
    residentName: "Aarav Sharma",
    building: "Block A",
    flat: "A-204",
    category: "PLUMBING",
    priority: "HIGH",
    status: "NEW",
    createdAt: "10 mins ago"
  },
  {
    id: "CMP-2033",
    title: "AC power socket spark",
    description: "Sparks observed when switching on the master bedroom AC.",
    residentName: "Priya Desai",
    building: "Block C",
    flat: "C-501",
    category: "ELECTRICAL",
    priority: "URGENT",
    status: "ASSIGNED",
    createdAt: "2 hours ago",
    assignedTo: "Rajesh (Electrician)",
    assignedStaffAvatar: "https://ui-avatars.com/api/?name=Rajesh+E&background=f1f5f9&color=64748b"
  },
  {
    id: "CMP-2032",
    title: "Door hinge broken",
    description: "Main door hinge is making noise and is partially broken.",
    residentName: "Vikram Singh",
    building: "Block B",
    flat: "B-105",
    category: "CARPENTRY",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    createdAt: "Yesterday",
    assignedTo: "Mahesh (Carpenter)",
    assignedStaffAvatar: "https://ui-avatars.com/api/?name=Mahesh+C&background=f1f5f9&color=64748b"
  },
  {
    id: "CMP-2031",
    title: "Corridor needs deep cleaning",
    description: "Dust accumulation in the 3rd floor corridor.",
    residentName: "Neha Gupta",
    building: "Block A",
    flat: "A-302",
    category: "CLEANING",
    priority: "LOW",
    status: "WAITING",
    createdAt: "2 days ago",
    assignedTo: "Cleaning Staff"
  },
  {
    id: "CMP-2030",
    title: "Bathroom tap repair",
    description: "Tap is continuously dripping.",
    residentName: "Sanjay Patel",
    building: "Block C",
    flat: "C-202",
    category: "PLUMBING",
    priority: "MEDIUM",
    status: "RESOLVED",
    createdAt: "3 days ago",
    assignedTo: "Suresh (Plumber)",
    assignedStaffAvatar: "https://ui-avatars.com/api/?name=Suresh+P&background=f1f5f9&color=64748b"
  },
  {
    id: "CMP-2029",
    title: "Lobby lights not working",
    description: "Ground floor lobby lights are completely off.",
    residentName: "Anita Roy",
    building: "Block B",
    flat: "B-404",
    category: "ELECTRICAL",
    priority: "HIGH",
    status: "CLOSED",
    createdAt: "Last week",
    assignedTo: "Rajesh (Electrician)",
    assignedStaffAvatar: "https://ui-avatars.com/api/?name=Rajesh+E&background=f1f5f9&color=64748b"
  }
];

class ComplaintService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getComplaints(): Promise<Complaint[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockComplaints), 500));
  }

  async getComplaint(id: string): Promise<Complaint | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockComplaints.find(c => c.id === id)
    ), 500));
  }

  async getStats(): Promise<ComplaintStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      openComplaints: 24,
      assigned: 12,
      inProgress: 8,
      resolved: 45,
      highPriority: 5,
      avgResolutionHours: 14.5,
      todaysNew: 6
    }), 500));
  }
}

export const complaintService = new ComplaintService();
