import * as React from "react"
import type { User, AuthTokens } from "@/types/auth"
import { SessionService, type CurrentSociety } from "@/services/session.service"

interface SessionContextType {
  user: User | null
  tokens: AuthTokens | null
  currentSociety: CurrentSociety | null
  permissions: string[]
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, tokens: AuthTokens) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const SessionContext = React.createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [tokens, setTokens] = React.useState<AuthTokens | null>(null)
  const [currentSociety, setCurrentSociety] = React.useState<CurrentSociety | null>(null)
  const [permissions, setPermissions] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Initialize session from storage
  React.useEffect(() => {
    const initSession = async () => {
      try {
        const storedTokens = localStorage.getItem("auth_tokens")
        const storedUser = localStorage.getItem("auth_user")

        if (storedTokens && storedUser) {
          const parsedTokens = JSON.parse(storedTokens)
          const parsedUser = JSON.parse(storedUser)
          
          setTokens(parsedTokens)
          setUser(parsedUser)
          
          // Fetch expanded session details (society, permissions)
          const sessionData = await SessionService.getCurrentSession(parsedUser)
          setCurrentSociety(sessionData.currentSociety || null)
          setPermissions(sessionData.permissions)
        }
      } catch (error) {
        console.error("Failed to restore session:", error)
        localStorage.removeItem("auth_tokens")
        localStorage.removeItem("auth_user")
      } finally {
        setIsLoading(false)
      }
    }

    initSession()
  }, [])

  const login = async (newUser: User, newTokens: AuthTokens) => {
    setUser(newUser)
    setTokens(newTokens)
    localStorage.setItem("auth_user", JSON.stringify(newUser))
    localStorage.setItem("auth_tokens", JSON.stringify(newTokens))
    
    // Fetch expanded session details immediately after login
    try {
      const sessionData = await SessionService.getCurrentSession(newUser)
      setCurrentSociety(sessionData.currentSociety || null)
      setPermissions(sessionData.permissions)
    } catch (e) {
      console.error("Failed to load session details on login", e)
    }
  }

  const logout = async () => {
    try {
      await SessionService.logout()
    } catch (e) {
      console.error("Logout failed on server, forcing local logout", e)
    } finally {
      setUser(null)
      setTokens(null)
      setCurrentSociety(null)
      setPermissions([])
      localStorage.removeItem("auth_user")
      localStorage.removeItem("auth_tokens")
      window.location.href = "/auth/login"
    }
  }

  const updateUser = (updatedFields: Partial<User>) => {
    if (!user) return
    const newUser = { ...user, ...updatedFields }
    setUser(newUser)
    localStorage.setItem("auth_user", JSON.stringify(newUser))
  }

  return (
    <SessionContext.Provider
      value={{
        user,
        tokens,
        currentSociety,
        permissions,
        isAuthenticated: !!user && !!tokens,
        isLoading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
