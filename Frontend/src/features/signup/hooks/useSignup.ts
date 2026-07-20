import { useMutation } from "@tanstack/react-query";
import { signupService } from "../services/signup.service";
import type { SocietyAdminSignupRequest, ResidentSignupRequest } from "../types";
import { toast } from "sonner";

export function useSocietyAdminSignup() {
  return useMutation({
    mutationFn: (data: SocietyAdminSignupRequest) => signupService.registerSocietyAdmin(data),
    onError: (error: any) => {
      toast.error(error.message || "Failed to create society");
    }
  });
}

export function useResidentSignup() {
  return useMutation({
    mutationFn: (data: ResidentSignupRequest) => signupService.registerResident(data),
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit request");
    }
  });
}

export function useValidateSocietyCode() {
  return useMutation({
    mutationFn: (code: string) => signupService.validateSocietyCode(code),
  });
}
