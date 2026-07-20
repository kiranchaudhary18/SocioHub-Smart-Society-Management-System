import { useMutation } from "@tanstack/react-query"
import { VerificationService } from "../services/verification.service"
import type { VerificationRequest, OTPVerificationRequest, VerificationResponse } from "../types"
import { toast } from "sonner"

export function useSendVerification() {
  return useMutation<VerificationResponse, Error, VerificationRequest>({
    mutationFn: VerificationService.sendVerificationEmail,
    onError: (error) => {
      toast.error("Failed to send verification email", { description: error.message })
    }
  })
}

export function useVerifyEmail() {
  return useMutation<VerificationResponse, Error, OTPVerificationRequest>({
    mutationFn: VerificationService.verifyEmail,
    // We let the component handle the error state rendering, but we can still toast generic errors if needed.
    // The specific UI states (Expired, Failed) will be handled by reading error.message in the component.
  })
}

export function useResendVerification() {
  return useMutation<VerificationResponse, Error, VerificationRequest>({
    mutationFn: VerificationService.resendVerification,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error("Failed to resend verification", { description: error.message })
    }
  })
}
