import type { ForgotPasswordRequest, OTPRequest, ResetPasswordRequest, GenericResponse } from "../types"
import { VALID_MOCK_OTP, VALID_MOCK_EMAILS } from "../mock/mockData"

// TODO: Replace with Spring Boot API client
// import { apiClient } from "@/api/client"

export const PasswordService = {
  /**
   * TODO: apiClient.post<GenericResponse>('/auth/forgot-password', data)
   */
  requestResetLink: async (data: ForgotPasswordRequest): Promise<GenericResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock verification
        if (VALID_MOCK_EMAILS.includes(data.email.toLowerCase())) {
          resolve({ success: true, message: "If that email exists, an OTP has been sent." })
        } else {
          // For security, even invalid emails shouldn't expose that they are invalid, 
          // but for this mock, we'll let it pass to simulate a generic success.
          resolve({ success: true, message: "If that email exists, an OTP has been sent." })
        }
      }, 1000)
    })
  },

  /**
   * TODO: apiClient.post<GenericResponse>('/auth/verify-otp', data)
   */
  verifyOtp: async (data: OTPRequest): Promise<GenericResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.otp === VALID_MOCK_OTP) {
          resolve({ success: true, message: "OTP verified successfully." })
        } else {
          reject(new Error("Invalid or expired OTP."))
        }
      }, 1000)
    })
  },

  /**
   * TODO: apiClient.post<GenericResponse>('/auth/reset-password', data)
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<GenericResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.otp === VALID_MOCK_OTP && data.newPassword.length >= 8) {
          resolve({ success: true, message: "Password updated successfully." })
        } else {
          reject(new Error("Failed to reset password. Please try again."))
        }
      }, 1500)
    })
  }
}
