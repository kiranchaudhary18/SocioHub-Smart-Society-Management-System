export interface ForgotPasswordRequest {
  email: string
}

export interface OTPRequest {
  email: string
  otp: string
}

export interface ResetPasswordRequest {
  email: string
  otp: string
  newPassword: string
}

export interface GenericResponse {
  message: string
  success: boolean
}
