export type ComplaintStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "REJECTED" | "CLOSED";
export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type ComplaintCategory = "Maintenance" | "Electrical" | "Plumbing" | "Water Supply" | "Security" | "Cleaning" | "Parking" | "Lift" | "Noise" | "Other";

export interface ComplaintKPIs {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
}

export interface ComplaintTimelineItem {
  id: string;
  status: ComplaintStatus | "ASSIGNED" | "TECHNICIAN_VISITING";
  description: string;
  timestamp: string;
}

export interface Complaint {
  id: string;
  title: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  description: string;
  location: string;
  createdOn: string;
  expectedResolution?: string;
  assignedTo?: string;
  residentNotes?: string;
  societyResponse?: string;
  hasAttachment: boolean;
  timeline: ComplaintTimelineItem[];
}

// In-memory mock state so mutations stick during the session
let mockComplaints: Complaint[] = [
  {
    id: "CMP-2026-1045",
    title: "Water leakage in kitchen sink",
    category: "Plumbing",
    priority: "HIGH",
    status: "IN_PROGRESS",
    description: "The pipe under the kitchen sink is leaking continuously since morning. Need immediate assistance before it damages the woodwork.",
    location: "Kitchen (Flat B-504)",
    createdOn: "2026-07-21T09:30:00Z",
    expectedResolution: "2026-07-22T18:00:00Z",
    assignedTo: "Ramesh (Plumber)",
    hasAttachment: true,
    societyResponse: "Technician has been assigned and will visit today between 2 PM - 4 PM.",
    timeline: [
      { id: "t1", status: "OPEN", description: "Complaint Submitted", timestamp: "2026-07-21T09:30:00Z" },
      { id: "t2", status: "ASSIGNED", description: "Assigned to Ramesh", timestamp: "2026-07-21T10:15:00Z" },
      { id: "t3", status: "IN_PROGRESS", description: "Investigation Started", timestamp: "2026-07-21T14:30:00Z" }
    ]
  },
  {
    id: "CMP-2026-1042",
    title: "Lift B button panel broken",
    category: "Lift",
    priority: "URGENT",
    status: "OPEN",
    description: "The buttons for floors 4, 5, and 6 on Lift B are completely unresponsive. Senior citizens are facing issues.",
    location: "Tower B - Main Lift Lobby",
    createdOn: "2026-07-22T07:15:00Z",
    hasAttachment: true,
    timeline: [
      { id: "t1", status: "OPEN", description: "Complaint Submitted", timestamp: "2026-07-22T07:15:00Z" }
    ]
  },
  {
    id: "CMP-2026-1038",
    title: "Car parked in my designated spot",
    category: "Parking",
    priority: "MEDIUM",
    status: "RESOLVED",
    description: "An unknown white Honda City (MH12 AB 1234) is parked in my slot P-102.",
    location: "Basement 1, Slot P-102",
    createdOn: "2026-07-19T18:45:00Z",
    assignedTo: "Security Guard Desk",
    societyResponse: "Security has clamped the vehicle and fined the owner. They have removed the car.",
    hasAttachment: false,
    timeline: [
      { id: "t1", status: "OPEN", description: "Complaint Submitted", timestamp: "2026-07-19T18:45:00Z" },
      { id: "t2", status: "IN_PROGRESS", description: "Security Dispatched", timestamp: "2026-07-19T18:55:00Z" },
      { id: "t3", status: "RESOLVED", description: "Vehicle removed", timestamp: "2026-07-19T19:30:00Z" }
    ]
  }
];

class ComplaintService {
  async getComplaintKPIs(): Promise<ComplaintKPIs> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      total: mockComplaints.length,
      open: mockComplaints.filter(c => c.status === "OPEN").length,
      inProgress: mockComplaints.filter(c => c.status === "IN_PROGRESS").length,
      resolved: mockComplaints.filter(c => c.status === "RESOLVED" || c.status === "CLOSED").length,
    };
  }

  async getComplaints(): Promise<Complaint[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    // Return sorted by newest first
    return [...mockComplaints].sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
  }

  async submitComplaint(data: Omit<Complaint, "id" | "status" | "createdOn" | "timeline">): Promise<Complaint> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newId = `CMP-${new Date().getFullYear()}-${1000 + mockComplaints.length * 7}`;
    
    const newComplaint: Complaint = {
      ...data,
      id: newId,
      status: "OPEN",
      createdOn: new Date().toISOString(),
      timeline: [
        {
          id: `t_${Date.now()}`,
          status: "OPEN",
          description: "Complaint Submitted",
          timestamp: new Date().toISOString()
        }
      ]
    };

    mockComplaints.push(newComplaint);
    return newComplaint;
  }
}

export const complaintService = new ComplaintService();
