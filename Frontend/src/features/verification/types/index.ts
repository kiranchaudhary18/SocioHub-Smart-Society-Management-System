export interface VerificationRequest {
  email: string
}

export interface OTPVerificationRequest {
  email: string
  otp: string
}

export type VerificationStatusType = "SUCCESS" | "FAILED" | "EXPIRED" | "ALREADY_VERIFIED" | "NETWORK_ERROR"

export interface VerificationResponse {
  success: boolean
  status: VerificationStatusType
  message: string
}
