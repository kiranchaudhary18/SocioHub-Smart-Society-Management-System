import { Role } from "@/types/auth"
import type { NavigationConfig } from "./types"

import { superAdminNavigation } from "./superAdmin"
import { societyAdminNavigation } from "./societyAdmin"
import { residentNavigation } from "./resident"
import { securityNavigation } from "./security"
import { staffNavigation } from "./staff"

export const getNavigationForRole = (role: Role): NavigationConfig => {
  switch (role) {
    case Role.SUPER_ADMIN:
      return superAdminNavigation
    case Role.SOCIETY_ADMIN:
      return societyAdminNavigation
    case Role.RESIDENT:
      return residentNavigation
    case Role.SECURITY:
      return securityNavigation
    case Role.STAFF:
      return staffNavigation
    default:
      return []
  }
}

export * from "./types"
