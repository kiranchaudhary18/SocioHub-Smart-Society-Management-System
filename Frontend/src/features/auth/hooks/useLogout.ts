import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../services/auth.service"
import { useSession } from "@/hooks/useSession"
import { toast } from "sonner"

export function useLogout() {
  const { logout } = useSession()

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      logout() // This will clear context, storage, and redirect to /auth/login
      toast.success("Logged out successfully")
    },
    onError: () => {
      // Even if backend fails, force local logout
      logout()
    }
  })
}
