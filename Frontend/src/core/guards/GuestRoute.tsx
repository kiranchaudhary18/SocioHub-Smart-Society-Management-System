import { Navigate } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { Role } from "@/types/auth"

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useSession()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <div className="w-8 h-8 rounded-full bg-primary/20 animate-ping" />
      </div>
    )
  }

  if (isAuthenticated && user) {
    // If they are already logged in, send them to their specific dashboard
    let dashboardPath = "/app"
    
    switch (user.role) {
      case Role.SUPER_ADMIN: dashboardPath = "/super-admin"; break;
      case Role.SOCIETY_ADMIN: dashboardPath = "/admin"; break;
      case Role.RESIDENT: dashboardPath = "/resident"; break;
      case Role.SECURITY: dashboardPath = "/security"; break;
      case Role.STAFF: dashboardPath = "/staff"; break;
    }

    return <Navigate to={dashboardPath} replace />
  }

  return <>{children}</>
}
