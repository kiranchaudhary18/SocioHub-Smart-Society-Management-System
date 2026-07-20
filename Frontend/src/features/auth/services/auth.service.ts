import type { LoginRequest, LoginResponse } from "../types"
import { mockUsers } from "../mock/mockUsers"

// TODO: Replace with Spring Boot Login API imports
// import { apiClient } from "@/api/client"

export const AuthService = {
  /**
   * Simulates a login request to the backend.
   * TODO: Replace implementation with actual API call:
   * return apiClient.post<LoginResponse>('/auth/login', credentials).then(res => res.data)
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      // Simulate network latency (1 second)
      setTimeout(() => {
        const user = mockUsers[credentials.email.toLowerCase()]
        
        if (user && credentials.password === "password123") {
          resolve({
            user,
            tokens: {
              accessToken: "mock_jwt_access_token_" + user.id,
              refreshToken: "mock_jwt_refresh_token_" + user.id,
            }
          })
        } else {
          reject(new Error("Invalid email or password"))
        }
      }, 1000)
    })
  },

  /**
   * Simulates a logout request to invalidate tokens on the backend.
   * TODO: Replace implementation with actual API call:
   * return apiClient.post('/auth/logout')
   */
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500)
    })
  }
}
