import { Role, type User } from "@/types/auth"

export const mockUsers: Record<string, User> = {
  "superadmin@resicore.com": {
    id: "u_super_1",
    email: "superadmin@resicore.com",
    firstName: "Sarah",
    lastName: "Connor",
    role: Role.SUPER_ADMIN,
    isActive: true,
  },
  "admin@resicore.com": {
    id: "u_admin_1",
    email: "admin@resicore.com",
    firstName: "James",
    lastName: "Holden",
    role: Role.SOCIETY_ADMIN,
    societyId: "soc_123",
    isActive: true,
  },
  "resident@resicore.com": {
    id: "u_res_1",
    email: "resident@resicore.com",
    firstName: "Amos",
    lastName: "Burton",
    role: Role.RESIDENT,
    societyId: "soc_123",
    buildingName: "Tower A",
    flatNumber: "402",
    isActive: true,
  },
  "security@resicore.com": {
    id: "u_sec_1",
    email: "security@resicore.com",
    firstName: "Bobbie",
    lastName: "Draper",
    role: Role.SECURITY,
    societyId: "soc_123",
    isActive: true,
  },
  "staff@resicore.com": {
    id: "u_staff_1",
    email: "staff@resicore.com",
    firstName: "Naomi",
    lastName: "Nagata",
    role: Role.STAFF,
    societyId: "soc_123",
    isActive: true,
  }
}
