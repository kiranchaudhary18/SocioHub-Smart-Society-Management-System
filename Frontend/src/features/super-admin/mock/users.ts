import { Role } from "@/types/auth";

export interface PlatformUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: Role;
  society: string;
  status: "Active" | "Pending" | "Suspended";
  lastLogin: string;
  createdAt: string;
}

// Helper to generate 50 mock users
const generateMockUsers = (): PlatformUser[] => {
  const users: PlatformUser[] = [];
  const societies = ["Green Valley Apartments", "Blue Ridge Residency", "Sunrise Towers", "Ocean View", "Lotus Crest"];
  const statuses: ("Active" | "Pending" | "Suspended")[] = ["Active", "Active", "Active", "Pending", "Suspended"];
  const roles = [Role.RESIDENT, Role.RESIDENT, Role.RESIDENT, Role.SOCIETY_ADMIN, Role.SECURITY, Role.STAFF];
  
  for (let i = 1; i <= 50; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const society = societies[Math.floor(Math.random() * societies.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    users.push({
      id: `USR-2026-${1000 + i}`,
      firstName: `User${i}`,
      lastName: `Last${i}`,
      email: `user${i}@example.com`,
      phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=User${i}`,
      role,
      society,
      status,
      lastLogin: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      createdAt: new Date(Date.now() - Math.random() * 20000000000).toISOString(),
    });
  }
  
  return users;
};

export const mockPlatformUsers = generateMockUsers();

export const platformUserKPIs = {
  totalUsers: { value: 12543, trend: "+12%", positive: true },
  activeToday: { value: 8432, trend: "+5%", positive: true },
  pendingApprovals: { value: 145, trend: "-2%", positive: true },
  blockedUsers: { value: 34, trend: "+1%", positive: false },
  distribution: {
    societyAdmins: 342,
    residents: 11500,
    security: 450,
    staff: 251,
  }
};
