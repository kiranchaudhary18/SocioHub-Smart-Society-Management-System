export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  bio: string;
  completionScore: number;
  securityScore: number;
  twoFactorEnabled: boolean;
  joinDate: string;
  sessions: {
    id: string;
    device: string;
    browser: string;
    location: string;
    ip: string;
    lastActive: string;
    isCurrent: boolean;
  }[];
  recentActivity: {
    id: string;
    action: string;
    time: string;
  }[];
}

export const mockProfile: UserProfile = {
  id: "USR-001",
  name: "Kiran Chaudhary",
  email: "kiran@sociohub.com",
  phone: "+91 98765 43210",
  role: "Super Admin",
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent",
  bio: "Lead Systems Architect & Super Admin for SocioHub. Overseeing platform infrastructure and global operations.",
  completionScore: 85,
  securityScore: 92,
  twoFactorEnabled: true,
  joinDate: "January 2026",
  sessions: [
    {
      id: "SES-1",
      device: "MacBook Pro",
      browser: "Chrome",
      location: "Bengaluru, India",
      ip: "103.45.67.89",
      lastActive: "Just now",
      isCurrent: true
    },
    {
      id: "SES-2",
      device: "iPhone 15 Pro",
      browser: "Safari",
      location: "Bengaluru, India",
      ip: "103.45.67.90",
      lastActive: "2 hours ago",
      isCurrent: false
    }
  ],
  recentActivity: [
    { id: "ACT-1", action: "Updated Global Permissions", time: "10 mins ago" },
    { id: "ACT-2", action: "Published Privacy Policy", time: "2 hours ago" },
    { id: "ACT-3", action: "Approved Green Valley Society", time: "Yesterday" }
  ]
};
