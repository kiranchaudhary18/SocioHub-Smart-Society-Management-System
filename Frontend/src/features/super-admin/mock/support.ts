export type TicketStatus = "Open" | "Pending" | "Resolved" | "Closed" | "Escalated";
export type TicketPriority = "Low" | "Medium" | "High" | "Critical";

export interface TicketMessage {
  id: string;
  sender: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  isInternal?: boolean;
}

export interface SupportTicket {
  id: string;
  subject: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
    society: string;
  };
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: TicketMessage[];
}

export const supportKPIs = {
  openTickets: { value: 24, trend: "+3", positive: false },
  pending: { value: 12, trend: "-2", positive: true },
  resolved: { value: 145, trend: "+12%", positive: true },
  critical: { value: 2, trend: "0", positive: true },
  avgResponseTime: { value: "1.2h", trend: "-15m", positive: true },
  customerSatisfaction: { value: "4.8/5", trend: "+0.1", positive: true },
};

export const mockTickets: SupportTicket[] = [
  {
    id: "TCK-1042",
    subject: "Unable to access visitor logs",
    user: {
      name: "Amit Shah",
      email: "amit@greenvalley.com",
      role: "Society Admin",
      society: "Green Valley Apartments",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Amit&backgroundColor=transparent"
    },
    status: "Open",
    priority: "High",
    category: "Technical Issue",
    createdAt: "2026-07-21T09:30:00Z",
    updatedAt: "2026-07-21T10:15:00Z",
    assignedTo: "Kiran Chaudhary",
    messages: [
      {
        id: "msg-1",
        sender: { name: "Amit Shah", role: "Society Admin", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Amit&backgroundColor=transparent" },
        content: "Hi team, since the update yesterday, our security guards cannot see the visitor logs on their mobile app. It just shows a loading spinner.",
        timestamp: "2026-07-21T09:30:00Z"
      },
      {
        id: "msg-2",
        sender: { name: "Kiran Chaudhary", role: "Super Admin", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Felix&backgroundColor=transparent" },
        content: "Investigating the API latency for the visitor endpoint. Looks like a caching issue on the new release.",
        timestamp: "2026-07-21T09:45:00Z",
        isInternal: true
      },
      {
        id: "msg-3",
        sender: { name: "Kiran Chaudhary", role: "Super Admin", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Felix&backgroundColor=transparent" },
        content: "Hello Amit, we are looking into this. Could you let us know if they are using the Android or iOS version of the app?",
        timestamp: "2026-07-21T10:15:00Z"
      }
    ]
  },
  {
    id: "TCK-1041",
    subject: "Billing statement discrepancy",
    user: {
      name: "Neha Patil",
      email: "neha@blueridge.com",
      role: "Resident",
      society: "Blue Ridge Residency",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Neha&backgroundColor=transparent"
    },
    status: "Escalated",
    priority: "Critical",
    category: "Billing",
    createdAt: "2026-07-20T14:20:00Z",
    updatedAt: "2026-07-21T08:00:00Z",
    messages: [
      {
        id: "msg-4",
        sender: { name: "Neha Patil", role: "Resident", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Neha&backgroundColor=transparent" },
        content: "My maintenance bill for July is showing double the amount.",
        timestamp: "2026-07-20T14:20:00Z"
      }
    ]
  },
  {
    id: "TCK-1040",
    subject: "Feature request: Custom announcements",
    user: {
      name: "Vikram Singh",
      email: "vikram@sunrise.com",
      role: "Society Admin",
      society: "Sunrise Towers",
    },
    status: "Resolved",
    priority: "Low",
    category: "Feature Request",
    createdAt: "2026-07-19T11:00:00Z",
    updatedAt: "2026-07-20T16:30:00Z",
    assignedTo: "Product Team",
    messages: [
      {
        id: "msg-5",
        sender: { name: "Vikram Singh", role: "Society Admin" },
        content: "Can we have custom templates for society announcements?",
        timestamp: "2026-07-19T11:00:00Z"
      },
      {
        id: "msg-6",
        sender: { name: "Product Team", role: "Super Admin" },
        content: "Hi Vikram, this feature has just been released in v2.4. You can check it out under your Announcements tab.",
        timestamp: "2026-07-20T16:30:00Z"
      }
    ]
  }
];
