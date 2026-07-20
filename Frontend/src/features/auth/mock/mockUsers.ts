import { Role, type User } from "@/types/auth"

export const mockUsers: Record<string, User> = {
  "superadmin@sociohub.com": {
    id: "u_super_1",
    email: "superadmin@sociohub.com",
    firstName: "Sarah",
    lastName: "Connor",
    role: Role.SUPER_ADMIN,
    isActive: true,
  },
  "admin@sociohub.com": {
    id: "u_admin_1",
    email: "admin@sociohub.com",
    firstName: "James",
    lastName: "Holden",
    role: Role.SOCIETY_ADMIN,
    societyId: "soc_123",
    isActive: true,
  },
  "resident@sociohub.com": {
    id: "u_res_1",
    email: "resident@sociohub.com",
    firstName: "Amos",
    lastName: "Burton",
    role: Role.RESIDENT,
    societyId: "soc_123",
    buildingName: "Tower A",
    flatNumber: "402",
    isActive: true,
  },
  "security@sociohub.com": {
    id: "u_sec_1",
    email: "security@sociohub.com",
    firstName: "Bobbie",
    lastName: "Draper",
    role: Role.SECURITY,
    societyId: "soc_123",
    isActive: true,
  },
  "staff@sociohub.com": {
    id: "u_staff_1",
    email: "staff@sociohub.com",
    firstName: "Naomi",
    lastName: "Nagata",
    role: Role.STAFF,
    societyId: "soc_123",
    isActive: true,
  }
}
