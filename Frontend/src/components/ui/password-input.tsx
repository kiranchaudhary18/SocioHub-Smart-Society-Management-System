import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, AlertTriangle } from "lucide-react"
import { Input, type InputProps } from "./input"
import { cn } from "@/lib/utils"

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  showStrengthMeter?: boolean
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrengthMeter = false, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [password, setPassword] = React.useState("")
    const [capsLockActive, setCapsLockActive] = React.useState(false)

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState("CapsLock")) {
        setCapsLockActive(true)
      } else {
        setCapsLockActive(false)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
      onChange?.(e)
    }

    // Simple strength calculation
    const calculateStrength = (pass: string) => {
      let strength = 0
      if (pass.length >= 8) strength += 25
      if (pass.match(/[A-Z]/)) strength += 25
      if (pass.match(/[0-9]/)) strength += 25
      if (pass.match(/[^A-Za-z0-9]/)) strength += 25
      return strength
    }

    const strength = calculateStrength(password)

    const getStrengthColor = () => {
      if (strength === 0) return "bg-neutral-200"
      if (strength <= 25) return "bg-destructive" // Weak
      if (strength <= 50) return "bg-warning" // Medium
      if (strength <= 75) return "bg-primary" // Strong
      return "bg-success" // Very Strong
    }

    const getStrengthLabel = () => {
      if (strength === 0) return ""
      if (strength <= 25) return "Weak"
      if (strength <= 50) return "Fair"
      if (strength <= 75) return "Good"
      return "Strong"
    }

    return (
      <div className="w-full flex flex-col gap-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={cn("pr-20", className)} // Add extra padding for icons
            ref={ref}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyDown}
            {...props}
          />

          <div className="absolute right-3 top-0 h-[56px] flex items-center gap-2 z-30 pointer-events-none">
            <AnimatePresence>
              {capsLockActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-warning pointer-events-auto"
                  title="Caps Lock is ON"
                >
                  <AlertTriangle className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-muted-foreground hover:text-foreground transition-colors pointer-events-auto p-1 rounded-full hover:bg-neutral-100"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <AnimatePresence>
          {showStrengthMeter && password.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-1.5 px-1 overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground">
                  Password Strength
                </span>
                <span
                  className={cn(
                    "text-xs font-bold",
                    strength <= 25 && "text-destructive",
                    strength > 25 && strength <= 50 && "text-warning",
                    strength > 50 && strength <= 75 && "text-primary",
                    strength > 75 && "text-success"
                  )}
                >
                  {getStrengthLabel()}
                </span>
              </div>
              <div className="flex h-1.5 gap-1 w-full rounded-full overflow-hidden">
                {[1, 2, 3, 4].map((index) => {
                  const isActive = strength >= index * 25
                  return (
                    <motion.div
                      key={index}
                      className={cn(
                        "h-full flex-1 rounded-full transition-colors duration-500",
                        isActive ? getStrengthColor() : "bg-neutral-200"
                      )}
                      layout
                    />
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
