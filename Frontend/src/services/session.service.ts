import type { User, AuthTokens } from "@/types/auth"

export interface CurrentSociety {
  id: string
  name: string
  logoUrl?: string
  role: string
}

export interface SessionResponse {
  user: User
  currentSociety?: CurrentSociety
  permissions: string[]
}

// TODO: Replace with Spring Boot Session API imports
// import { apiClient } from "@/api/client"

export const SessionService = {
  /**
   * TODO: apiClient.get<SessionResponse>('/auth/me')
   */
  getCurrentSession: async (user: User): Promise<SessionResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock permissions based on role
        let permissions: string[] = []
        if (user.role === "SUPER_ADMIN") permissions = ["*"]
        if (user.role === "SOCIETY_ADMIN") permissions = ["manage_users", "manage_billing", "view_reports"]
        if (user.role === "RESIDENT") permissions = ["view_notices", "pay_maintenance", "raise_complaint"]
        
        // Mock society
        const currentSociety = user.societyId ? {
          id: user.societyId,
          name: "Prestige Falcon City",
          role: user.role
        } : undefined

        resolve({
          user,
          currentSociety,
          permissions
        })
      }, 500)
    })
  },

  /**
   * TODO: apiClient.post('/auth/logout')
   */
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  },

  /**
   * TODO: apiClient.post<{tokens: AuthTokens}>('/auth/refresh', { refreshToken })
   */
  refreshToken: async (_refreshToken: string): Promise<{tokens: AuthTokens}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          tokens: {
            accessToken: "mock.new.access.token",
            refreshToken: "mock.new.refresh.token"
          }
        })
      }, 500)
    })
  }
}
