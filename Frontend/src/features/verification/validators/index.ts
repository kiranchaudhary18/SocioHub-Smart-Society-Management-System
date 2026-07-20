import { z } from "zod"

export const emailVerificationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
})

export const otpVerificationSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must contain only numbers"),
})

export type EmailVerificationData = z.infer<typeof emailVerificationSchema>
export type OtpVerificationData = z.infer<typeof otpVerificationSchema>
