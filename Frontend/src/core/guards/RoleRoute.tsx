import { Navigate } from "react-router-dom"
import { useSession } from "@/hooks/useSession"
import { Role } from "@/types/auth"
import { hasPermission } from "@/config/roles"

interface RoleRouteProps {
  children: React.ReactNode
  requiredRole: Role
  exact?: boolean // If true, only this exact role can access. If false, higher roles can access too.
}

export function RoleRoute({ children, requiredRole, exact = false }: RoleRouteProps) {
  const { isLoading, user } = useSession()

  if (isLoading) return null

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  const isAuthorized = exact 
    ? user.role === requiredRole 
    : hasPermission(user.role, requiredRole)

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
