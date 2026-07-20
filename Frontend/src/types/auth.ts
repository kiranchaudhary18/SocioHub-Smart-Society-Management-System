export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  SOCIETY_ADMIN: "SOCIETY_ADMIN",
  RESIDENT: "RESIDENT",
  SECURITY: "SECURITY",
  STAFF: "STAFF",
} as const;

export type Role = typeof Role[keyof typeof Role];

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: Role
  societyId?: string // Null for SUPER_ADMIN
  flatNumber?: string
  buildingName?: string
  profilePictureUrl?: string
  isActive: boolean
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  user: User
  tokens: AuthTokens
}
