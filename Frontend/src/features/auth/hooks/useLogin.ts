import { useMutation } from "@tanstack/react-query"
import { useNavigate, useLocation } from "react-router-dom"
import { AuthService } from "../services/auth.service"
import type { LoginRequest, LoginResponse } from "../types"
import { useSession } from "@/hooks/useSession"
import { toast } from "sonner"
import { Role } from "@/types/auth"

export function useLogin() {
  const { login } = useSession()
  const navigate = useNavigate()
  const location = useLocation()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      // 1. Update Global Auth State
      login(data.user, data.tokens)

      // 2. Toast Success Notification
      toast.success("Welcome back!", {
        description: `Logged in as ${data.user.firstName} ${data.user.lastName}`,
      })

      // 3. Check if we need to redirect to a saved location
      const from = (location.state as any)?.from?.pathname
      if (from && from !== "/auth/login") {
        navigate(from, { replace: true })
        return
      }

      // 4. Role Based Default Redirect
      let dashboardPath = "/app"
      switch (data.user.role) {
        case Role.SUPER_ADMIN: dashboardPath = "/super-admin"; break;
        case Role.SOCIETY_ADMIN: dashboardPath = "/admin"; break;
        case Role.RESIDENT: dashboardPath = "/resident"; break;
        case Role.SECURITY: dashboardPath = "/security"; break;
        case Role.STAFF: dashboardPath = "/staff"; break;
      }
      
      navigate(dashboardPath, { replace: true })
    },
    onError: (error) => {
      toast.error("Authentication Failed", {
        description: error.message || "Invalid email or password. Please try again.",
      })
    }
  })
}
