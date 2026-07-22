export type Priority = "HIGH" | "NORMAL";
export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type PollStatus = "ACTIVE" | "COMPLETED" | "CLOSED";

export interface Notice {
  id: string;
  title: string;
  category: string;
  priority: Priority;
  description: string;
  publisher: string;
  publishedDate: string;
  attachments: { name: string; url: string; size: string }[];
  isRead: boolean;
  isFeatured?: boolean;
}

export interface NoticeKPIs {
  total: number;
  unread: number;
  important: number;
  thisMonth: number;
}

export interface CommunityEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  capacity: number;
  registeredCount: number;
  status: EventStatus;
  description: string;
  isFeatured?: boolean;
  imagePlaceholder: string;
  agenda: { time: string; title: string }[];
  rules: string[];
  isRegistered: boolean;
}

export interface EventKPIs {
  upcoming: number;
  registered: number;
  completed: number;
  thisMonth: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  endDate: string;
  totalVotes: number;
  status: PollStatus;
  options: PollOption[];
  isVoted: boolean;
  userSelectionId?: string;
  winningOptionId?: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  estimatedTime: string;
  closingDate: string;
  isCompleted: boolean;
  participants: number;
}

export interface PollKPIs {
  active: number;
  completed: number;
  participationRate: number;
  closingSoon: number;
}


// --- MOCK DATA ---

let mockNotices: Notice[] = [
  {
    id: "NTC-2026-042",
    title: "Annual General Body Meeting 2026",
    category: "Meeting",
    priority: "HIGH",
    description: "Dear Residents, \n\nThe Annual General Body Meeting (AGM) will be held on August 10th in the Community Hall. Attendance is highly encouraged as we will be discussing the budget for the upcoming year, pending maintenance issues, and the proposal for new CCTV installations in the basement.\n\nPlease find the attached agenda and financials.",
    publisher: "Ravi Kumar (Secretary)",
    publishedDate: "2026-07-20T10:00:00Z",
    attachments: [
      { name: "AGM_Agenda_2026.pdf", url: "#", size: "245 KB" },
      { name: "Financial_Report_Q2.pdf", url: "#", size: "1.2 MB" }
    ],
    isRead: false,
    isFeatured: true
  },
  {
    id: "NTC-2026-041",
    title: "Scheduled Power Cut for Tower A",
    category: "Maintenance",
    priority: "HIGH",
    description: "There will be a scheduled power outage on July 25th between 2 PM and 5 PM for Tower A due to transformer maintenance. Backup generators will supply power only to common areas and elevators. Please plan accordingly.",
    publisher: "Facility Management",
    publishedDate: "2026-07-21T09:15:00Z",
    attachments: [],
    isRead: true
  },
  {
    id: "NTC-2026-040",
    title: "New Parking Allocation Rules",
    category: "Rules",
    priority: "NORMAL",
    description: "Based on the recent survey, the committee has updated the guest parking allocation rules. Each flat is now allowed a maximum of 48 hours of free guest parking per month. Beyond this, standard hourly rates will apply.",
    publisher: "Society Admin",
    publishedDate: "2026-07-15T14:30:00Z",
    attachments: [{ name: "Parking_Rules_V2.pdf", url: "#", size: "180 KB" }],
    isRead: true
  },
  {
    id: "NTC-2026-039",
    title: "Yoga Classes Resuming",
    category: "General",
    priority: "NORMAL",
    description: "Morning yoga classes in the Serenity Room will resume from next Monday. Timings are 6 AM to 7 AM.",
    publisher: "Cultural Committee",
    publishedDate: "2026-07-10T08:00:00Z",
    attachments: [],
    isRead: true
  }
];

let mockEvents: CommunityEvent[] = [
  {
    id: "EVT-001",
    title: "Independence Day Celebration",
    category: "Cultural",
    date: "2026-08-15",
    time: "08:00 AM - 12:00 PM",
    venue: "Central Garden",
    organizer: "Cultural Committee",
    capacity: 500,
    registeredCount: 342,
    status: "UPCOMING",
    description: "Join us for the flag hoisting ceremony followed by cultural performances by the children of our society, breakfast, and community games.",
    isFeatured: true,
    imagePlaceholder: "bg-gradient-to-r from-orange-400 via-white to-green-500",
    agenda: [
      { time: "08:00 AM", title: "Flag Hoisting" },
      { time: "08:30 AM", title: "National Anthem & Speech" },
      { time: "09:00 AM", title: "Kids Cultural Dance" },
      { time: "10:30 AM", title: "Breakfast Buffet" }
    ],
    rules: ["Please arrive by 7:50 AM", "Traditional attire encouraged"],
    isRegistered: true
  },
  {
    id: "EVT-002",
    title: "Society Monsoon Trek",
    category: "Outdoor",
    date: "2026-07-28",
    time: "05:00 AM - 04:00 PM",
    venue: "Lohagad Fort (Bus leaves from Gate 1)",
    organizer: "Sports Club",
    capacity: 45,
    registeredCount: 45,
    status: "UPCOMING",
    description: "A one-day monsoon trek to Lohagad Fort. Moderate difficulty. Breakfast and lunch included in the participation fee.",
    imagePlaceholder: "bg-emerald-500",
    agenda: [
      { time: "05:00 AM", title: "Bus Departure" },
      { time: "08:00 AM", title: "Base Camp Breakfast" },
      { time: "09:00 AM", title: "Trek Starts" }
    ],
    rules: ["Trekking shoes mandatory", "Carry own water bottles"],
    isRegistered: false
  },
  {
    id: "EVT-003",
    title: "Kids Art Workshop",
    category: "Workshop",
    date: "2026-08-05",
    time: "10:00 AM - 01:00 PM",
    venue: "Club House",
    organizer: "Kids Committee",
    capacity: 30,
    registeredCount: 12,
    status: "UPCOMING",
    description: "A fun watercolor painting workshop for kids aged 5-12. All materials will be provided.",
    imagePlaceholder: "bg-purple-400",
    agenda: [
      { time: "10:00 AM", title: "Introduction to Watercolors" },
      { time: "11:00 AM", title: "Painting Session" }
    ],
    rules: ["Parents must drop and pick up"],
    isRegistered: false
  }
];

let mockPolls: Poll[] = [
  {
    id: "POL-001",
    title: "New Gym Equipment Purchase",
    description: "We have budget for one major new equipment for the gym. Please vote for your preference.",
    endDate: "2026-07-30",
    totalVotes: 145,
    status: "ACTIVE",
    isVoted: false,
    options: [
      { id: "o1", text: "Smith Machine", votes: 45 },
      { id: "o2", text: "Rowing Machine", votes: 80 },
      { id: "o3", text: "Stairmaster", votes: 20 }
    ]
  },
  {
    id: "POL-002",
    title: "Change in Swimming Pool Timings",
    description: "Should we extend the evening pool timings from 9 PM to 10 PM during summer?",
    endDate: "2026-07-25",
    totalVotes: 210,
    status: "ACTIVE",
    isVoted: true,
    userSelectionId: "o1",
    options: [
      { id: "o1", text: "Yes, extend to 10 PM", votes: 160 },
      { id: "o2", text: "No, keep it till 9 PM", votes: 50 }
    ]
  },
  {
    id: "POL-003",
    title: "Selection of Diwali Decoration Theme",
    description: "Vote for the decoration theme for upcoming Diwali festival.",
    endDate: "2025-10-15",
    totalVotes: 320,
    status: "COMPLETED",
    isVoted: true,
    userSelectionId: "o2",
    winningOptionId: "o1",
    options: [
      { id: "o1", text: "Traditional Marigold & Diyas", votes: 200 },
      { id: "o2", text: "Modern LED & Lanterns", votes: 80 },
      { id: "o3", text: "Eco-friendly Recycled Theme", votes: 40 }
    ]
  }
];

let mockSurveys: Survey[] = [
  {
    id: "SRV-001",
    title: "Annual Resident Satisfaction Survey",
    description: "Help us understand how we can improve security, cleanliness, and amenities.",
    questionCount: 15,
    estimatedTime: "5 mins",
    closingDate: "2026-08-10",
    isCompleted: false,
    participants: 120
  },
  {
    id: "SRV-002",
    title: "Feedback on New Security Agency",
    description: "Rate the performance of the new security guards deployed last month.",
    questionCount: 5,
    estimatedTime: "2 mins",
    closingDate: "2026-07-28",
    isCompleted: true,
    participants: 285
  }
];

class CommunityService {
  // Notices
  async getNoticeKPIs(): Promise<NoticeKPIs> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      total: mockNotices.length,
      unread: mockNotices.filter(n => !n.isRead).length,
      important: mockNotices.filter(n => n.priority === "HIGH").length,
      thisMonth: 4
    };
  }

  async getNotices(): Promise<Notice[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockNotices];
  }

  async markNoticeRead(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const idx = mockNotices.findIndex(n => n.id === id);
    if (idx > -1) mockNotices[idx].isRead = true;
  }

  // Events
  async getEventKPIs(): Promise<EventKPIs> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      upcoming: mockEvents.filter(e => e.status === "UPCOMING").length,
      registered: mockEvents.filter(e => e.isRegistered).length,
      completed: mockEvents.filter(e => e.status === "COMPLETED").length,
      thisMonth: 2
    };
  }

  async getEvents(): Promise<CommunityEvent[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockEvents];
  }

  async registerEvent(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const idx = mockEvents.findIndex(e => e.id === id);
    if (idx > -1) {
      if(mockEvents[idx].registeredCount >= mockEvents[idx].capacity) throw new Error("Event full");
      mockEvents[idx].isRegistered = true;
      mockEvents[idx].registeredCount += 1;
    }
  }

  // Polls
  async getPollKPIs(): Promise<PollKPIs> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      active: mockPolls.filter(p => p.status === "ACTIVE").length,
      completed: mockPolls.filter(p => p.status === "COMPLETED").length,
      participationRate: 78,
      closingSoon: 1
    };
  }

  async getPolls(): Promise<{ polls: Poll[], surveys: Survey[] }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { polls: [...mockPolls], surveys: [...mockSurveys] };
  }

  async votePoll(pollId: string, optionId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const poll = mockPolls.find(p => p.id === pollId);
    if (poll && !poll.isVoted) {
      poll.isVoted = true;
      poll.userSelectionId = optionId;
      poll.totalVotes += 1;
      const opt = poll.options.find(o => o.id === optionId);
      if (opt) opt.votes += 1;
    }
  }
}

export const communityService = new CommunityService();
