import * as React from "react"
import type { User, AuthTokens } from "@/types/auth"

interface AuthContextType {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, tokens: AuthTokens) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [tokens, setTokens] = React.useState<AuthTokens | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  // Initialize session from storage
  React.useEffect(() => {
    const initAuth = async () => {
      try {
        const storedTokens = localStorage.getItem("auth_tokens")
        const storedUser = localStorage.getItem("auth_user")

        if (storedTokens && storedUser) {
          setTokens(JSON.parse(storedTokens))
          setUser(JSON.parse(storedUser))
          
          // Optionally: Validate token or fetch fresh user profile from backend
          // const { data } = await apiClient.get<User>("/auth/me")
          // setUser(data)
        }
      } catch (error) {
        console.error("Failed to restore auth session:", error)
        localStorage.removeItem("auth_tokens")
        localStorage.removeItem("auth_user")
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = (newUser: User, newTokens: AuthTokens) => {
    setUser(newUser)
    setTokens(newTokens)
    localStorage.setItem("auth_user", JSON.stringify(newUser))
    localStorage.setItem("auth_tokens", JSON.stringify(newTokens))
  }

  const logout = () => {
    setUser(null)
    setTokens(null)
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_tokens")
    
    // Optional: Inform backend to invalidate refresh token
    // apiClient.post("/auth/logout").catch(console.error)
    
    window.location.href = "/auth/login"
  }

  const updateUser = (updatedFields: Partial<User>) => {
    if (!user) return
    const newUser = { ...user, ...updatedFields }
    setUser(newUser)
    localStorage.setItem("auth_user", JSON.stringify(newUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated: !!user && !!tokens,
        isLoading,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
