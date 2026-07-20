import { Navigate } from "react-router-dom"
import { useSession, usePermissions } from "@/hooks/useSession"

interface PermissionRouteProps {
  children: React.ReactNode
  requiredPermission: string
}

export function PermissionRoute({ children, requiredPermission }: PermissionRouteProps) {
  const { isLoading, user } = useSession()
  const { hasPermission } = usePermissions()

  if (isLoading) return null

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  if (!hasPermission(requiredPermission)) {
    return <Navigate to="/403" replace /> // Forbidden
  }

  return <>{children}</>
}
