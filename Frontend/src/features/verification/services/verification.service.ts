import type { VerificationRequest, OTPVerificationRequest, VerificationResponse } from "../types"
import { MOCK_VERIFICATION } from "../mock/mockData"

// TODO: Replace with Spring Boot API client
// import { apiClient } from "@/api/client"

export const VerificationService = {
  /**
   * TODO: apiClient.post<VerificationResponse>('/auth/send-verification', data)
   */
  sendVerificationEmail: async (_data: VerificationRequest): Promise<VerificationResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          status: "SUCCESS",
          message: "Verification email sent successfully."
        })
      }, 1000)
    })
  },

  /**
   * TODO: apiClient.post<VerificationResponse>('/auth/verify-email', data)
   */
  verifyEmail: async (data: OTPVerificationRequest): Promise<VerificationResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (data.otp) {
          case MOCK_VERIFICATION.SUCCESS_OTP:
            resolve({ success: true, status: "SUCCESS", message: "Account verified successfully!" })
            break
          case MOCK_VERIFICATION.EXPIRED_OTP:
            reject(new Error("EXPIRED")) // We use Error for react-query onError to catch
            break
          case MOCK_VERIFICATION.ALREADY_VERIFIED_OTP:
            reject(new Error("ALREADY_VERIFIED"))
            break
          case MOCK_VERIFICATION.NETWORK_ERROR_OTP:
            reject(new Error("NETWORK_ERROR"))
            break
          default:
            reject(new Error("FAILED")) // Wrong OTP
        }
      }, 1500) // Slightly longer to show the "Verifying..." animation
    })
  },

  /**
   * TODO: apiClient.post<VerificationResponse>('/auth/resend-verification', data)
   */
  resendVerification: async (_data: VerificationRequest): Promise<VerificationResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          status: "SUCCESS",
          message: "A new verification code has been sent."
        })
      }, 1000)
    })
  }
}
