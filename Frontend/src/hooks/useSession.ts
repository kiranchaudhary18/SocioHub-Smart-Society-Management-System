import { useContext } from "react"
import { SessionContext } from "../contexts/SessionContext"

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}

export function useCurrentUser() {
  const { user } = useSession()
  return user
}

export function useCurrentSociety() {
  const { currentSociety } = useSession()
  return currentSociety
}

export function usePermissions() {
  const { permissions } = useSession()
  
  const hasPermission = (permission: string) => {
    if (permissions.includes("*")) return true // Super Admin override
    return permissions.includes(permission)
  }

  return { permissions, hasPermission }
}
