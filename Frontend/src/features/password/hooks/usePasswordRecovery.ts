import { useMutation } from "@tanstack/react-query"
import { PasswordService } from "../services/password.service"
import type { ForgotPasswordRequest, OTPRequest, ResetPasswordRequest, GenericResponse } from "../types"
import { toast } from "sonner"

export function useForgotPassword() {
  return useMutation<GenericResponse, Error, ForgotPasswordRequest>({
    mutationFn: PasswordService.requestResetLink,
    onError: (error) => {
      toast.error("Failed to send reset link", { description: error.message })
    }
  })
}

export function useVerifyOtp() {
  return useMutation<GenericResponse, Error, OTPRequest>({
    mutationFn: PasswordService.verifyOtp,
    onError: (error) => {
      toast.error("Verification Failed", { description: error.message })
    }
  })
}

export function useResetPassword() {
  return useMutation<GenericResponse, Error, ResetPasswordRequest>({
    mutationFn: PasswordService.resetPassword,
    onError: (error) => {
      toast.error("Failed to reset password", { description: error.message })
    }
  })
}
