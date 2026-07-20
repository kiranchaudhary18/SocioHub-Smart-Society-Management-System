import { Role } from "@/types/auth"

export const RoleHierarchy: Record<Role, number> = {
  [Role.SUPER_ADMIN]: 100,
  [Role.SOCIETY_ADMIN]: 80,
  [Role.SECURITY]: 50,
  [Role.STAFF]: 40,
  [Role.RESIDENT]: 10,
}

export const hasPermission = (userRole: Role, requiredRole: Role): boolean => {
  return RoleHierarchy[userRole] >= RoleHierarchy[requiredRole]
}
