export type PollStatus = "ACTIVE" | "COMPLETED" | "DRAFT";
export type PollType = "SINGLE_CHOICE" | "MULTIPLE_CHOICE";

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface SocietyPoll {
  id: string;
  question: string;
  description?: string;
  status: PollStatus;
  type: PollType;
  options: PollOption[];
  totalVotes: number;
  totalEligibleVoters: number;
  endDate: string;
  createdBy: string;
}

export interface PollStats {
  activePolls: number;
  completedPolls: number;
  participationRate: number; // percentage
  pendingVotes: number;
}

const mockPolls: SocietyPoll[] = [
  {
    id: "POLL-001",
    question: "Should we install EV charging stations in the visitor parking area?",
    description: "This will require a capital expenditure of ₹2.5 Lakhs from the reserve fund.",
    status: "ACTIVE",
    type: "SINGLE_CHOICE",
    totalVotes: 145,
    totalEligibleVoters: 250,
    endDate: "30 Jul 2026",
    createdBy: "Managing Committee",
    options: [
      { id: "O1", text: "Yes, we need them", votes: 95 },
      { id: "O2", text: "No, too expensive", votes: 40 },
      { id: "O3", text: "Need more details before deciding", votes: 10 }
    ]
  },
  {
    id: "POLL-002",
    question: "Select the colors for the upcoming lobby renovation.",
    description: "Please select up to two combinations.",
    status: "ACTIVE",
    type: "MULTIPLE_CHOICE",
    totalVotes: 88,
    totalEligibleVoters: 250,
    endDate: "25 Jul 2026",
    createdBy: "Maintenance Committee",
    options: [
      { id: "O1", text: "Beige & Gold", votes: 54 },
      { id: "O2", text: "White & Slate", votes: 22 },
      { id: "O3", text: "Pastel Green & Wood", votes: 12 }
    ]
  },
  {
    id: "POLL-003",
    question: "Approval for Annual Budget 2026-27",
    status: "COMPLETED",
    type: "SINGLE_CHOICE",
    totalVotes: 210,
    totalEligibleVoters: 250,
    endDate: "15 Mar 2026",
    createdBy: "Treasurer",
    options: [
      { id: "O1", text: "Approve", votes: 180 },
      { id: "O2", text: "Reject", votes: 30 }
    ]
  }
];

const mockTrendData = [
  { name: 'Mon', votes: 12 },
  { name: 'Tue', votes: 25 },
  { name: 'Wed', votes: 45 },
  { name: 'Thu', votes: 30 },
  { name: 'Fri', votes: 15 },
  { name: 'Sat', votes: 5 },
  { name: 'Sun', votes: 13 },
];

class PollService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getPolls(): Promise<SocietyPoll[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockPolls), 500));
  }

  async getPoll(id: string): Promise<SocietyPoll | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockPolls.find(p => p.id === id)
    ), 500));
  }

  async getStats(): Promise<PollStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      activePolls: 2,
      completedPolls: 15,
      participationRate: 68,
      pendingVotes: 105
    }), 500));
  }

  async getTrendData() {
    return new Promise(resolve => setTimeout(() => resolve(mockTrendData), 500));
  }
}

export const pollService = new PollService();
