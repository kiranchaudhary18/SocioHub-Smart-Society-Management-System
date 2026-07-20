import { Navigate, useLocation } from "react-router-dom"
import { useSession } from "@/hooks/useSession"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useSession()
  const location = useLocation()

  if (isLoading) {
    // Render a full-screen loading skeleton here eventually
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <div className="w-8 h-8 rounded-full bg-primary/20 animate-ping" />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Save the location they were trying to go to
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
