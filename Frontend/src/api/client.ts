import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import { toast } from "sonner"
import type { AuthTokens } from "@/types/auth"

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1"

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Store for refresh request
let isRefreshing = false
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request Interceptor: Attach Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokensString = localStorage.getItem("auth_tokens")
    if (tokensString) {
      try {
        const tokens: AuthTokens = JSON.parse(tokensString)
        if (tokens.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`
        }
      } catch (e) {
        console.error("Failed to parse tokens from storage")
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Handle 401 & Refresh
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue the request
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = 'Bearer ' + token
            return apiClient(originalRequest)
          })
          .catch(err => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const tokensString = localStorage.getItem("auth_tokens")
        if (!tokensString) throw new Error("No tokens available")
        const tokens: AuthTokens = JSON.parse(tokensString)

        // Request new token
        const { data } = await axios.post<{ tokens: AuthTokens }>(`${API_URL}/auth/refresh`, {
          refreshToken: tokens.refreshToken
        })

        // Save new tokens
        localStorage.setItem("auth_tokens", JSON.stringify(data.tokens))
        
        // Update header for current request
        originalRequest.headers.Authorization = `Bearer ${data.tokens.accessToken}`
        
        processQueue(null, data.tokens.accessToken)
        return apiClient(originalRequest)

      } catch (err) {
        processQueue(err as AxiosError, null)
        // Refresh failed, auto logout
        localStorage.removeItem("auth_tokens")
        localStorage.removeItem("auth_user")
        window.location.href = "/auth/login?expired=true"
        toast.error("Session Expired", { description: "Please log in again." })
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    // Handle generic global errors
    if (error.response?.status === 403) {
      toast.error("Access Denied", { description: "You don't have permission to perform this action." })
    }

    if (error.response?.status === 500) {
      toast.error("Server Error", { description: "Something went wrong on our end. Please try again." })
    }

    return Promise.reject(error)
  }
)
