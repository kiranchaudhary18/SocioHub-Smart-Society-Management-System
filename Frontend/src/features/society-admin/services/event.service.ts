export type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface EventParticipant {
  id: string;
  name: string;
  unit: string;
  photo?: string;
  registeredAt: string;
}

export interface SocietyEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: EventStatus;
  participantsCount: number;
  maxParticipants: number;
  bannerUrl?: string;
  participants: EventParticipant[];
  budget: {
    allocated: number;
    spent: number;
  };
}

export interface EventStats {
  upcomingEvents: number;
  completedEvents: number;
  registrations: number;
  todaysEvents: number;
}

const mockEvents: SocietyEvent[] = [
  {
    id: "EVT-001",
    title: "Diwali Mela 2026",
    description: "Join us for the grand Diwali celebration in the central courtyard. We are organizing a potluck, cultural events, and a fireworks display. Please register your participation to help us plan the catering.",
    date: "10 Nov 2026",
    time: "18:00 - 23:00",
    location: "Central Courtyard",
    organizer: "Cultural Committee",
    status: "UPCOMING",
    participantsCount: 145,
    maxParticipants: 500,
    bannerUrl: "https://images.unsplash.com/photo-1574768391783-a75d506fc86e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    budget: { allocated: 50000, spent: 12000 },
    participants: [
      { id: "P-1", name: "Rahul Sharma", unit: "A-204", registeredAt: "2 days ago", photo: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=f1f5f9" },
      { id: "P-2", name: "Sneha Patel", unit: "B-105", registeredAt: "3 days ago", photo: "https://ui-avatars.com/api/?name=Sneha+Patel&background=f1f5f9" }
    ]
  },
  {
    id: "EVT-002",
    title: "Yoga Workshop",
    description: "Morning yoga session by expert instructor Mr. Patanjali. Bring your own yoga mats.",
    date: "25 Jul 2026",
    time: "06:30 - 08:00",
    location: "Clubhouse Terrace",
    organizer: "Health & Wellness Club",
    status: "UPCOMING",
    participantsCount: 42,
    maxParticipants: 50,
    bannerUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    budget: { allocated: 2000, spent: 0 },
    participants: []
  },
  {
    id: "EVT-003",
    title: "Society Blood Donation Camp",
    description: "Annual blood donation drive in collaboration with Red Cross Society.",
    date: "10 Jun 2026",
    time: "09:00 - 15:00",
    location: "Community Hall",
    organizer: "Managing Committee",
    status: "COMPLETED",
    participantsCount: 85,
    maxParticipants: 200,
    bannerUrl: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    budget: { allocated: 10000, spent: 9500 },
    participants: []
  }
];

class EventService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getEvents(): Promise<SocietyEvent[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockEvents), 500));
  }

  async getEvent(id: string): Promise<SocietyEvent | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockEvents.find(e => e.id === id)
    ), 500));
  }

  async getStats(): Promise<EventStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      upcomingEvents: 4,
      completedEvents: 12,
      registrations: 187,
      todaysEvents: 0
    }), 500));
  }
}

export const eventService = new EventService();
