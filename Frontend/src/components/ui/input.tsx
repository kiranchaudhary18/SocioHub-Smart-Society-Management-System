import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  success?: boolean
  loading?: boolean
  helperText?: string
  clearable?: boolean
  onClear?: () => void
  characterCount?: number
  maxLength?: number
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      leftIcon,
      rightIcon,
      error,
      success,
      loading,
      helperText,
      clearable,
      onClear,
      characterCount,
      maxLength,
      value,
      defaultValue,
      onChange,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState(value || defaultValue || "")

    // Track whether there's content to float the label
    const hasContent = Boolean(value) || Boolean(internalValue) || isFocused

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    const handleClear = () => {
      setInternalValue("")
      onClear?.()
    }

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="relative group w-full">
          {/* Animated Background Glow (visible on focus) */}
          <div
            className={cn(
              "absolute -inset-0.5 rounded-xl blur-md transition-opacity duration-300 opacity-0 bg-gradient-to-r from-aurora-mint via-aurora-aqua to-aurora-lavender",
              isFocused && !error && "opacity-40",
              error && "bg-destructive opacity-40",
              success && "bg-success opacity-40"
            )}
          />

          {/* Main Input Container */}
          <div
            className={cn(
              "relative flex items-center w-full min-h-[56px] rounded-xl glass-light overflow-hidden transition-all duration-300 border",
              isFocused ? "border-primary bg-white/50" : "border-white/40",
              error && "border-destructive bg-destructive/10",
              success && "border-success bg-success/10",
              disabled && "opacity-50 cursor-not-allowed bg-neutral-100/50"
            )}
          >
            {/* Left Icon */}
            {leftIcon && (
              <div
                className={cn(
                  "pl-4 flex items-center justify-center transition-colors duration-300",
                  isFocused ? "text-primary" : "text-muted-foreground",
                  error && "text-destructive"
                )}
              >
                {leftIcon}
              </div>
            )}

            {/* Input Wrapper (holds floating label and input) */}
            <div className="relative flex-1 px-4 flex flex-col justify-center">
              {label && (
                <motion.label
                  initial={false}
                  animate={{
                    y: hasContent ? -12 : 0,
                    scale: hasContent ? 0.85 : 1,
                    color: error
                      ? "hsl(var(--destructive))"
                      : isFocused
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={cn(
                    "absolute left-4 origin-top-left pointer-events-none font-medium z-10",
                    !hasContent && "text-base",
                    hasContent && "text-sm"
                  )}
                >
                  {label}
                </motion.label>
              )}

              <input
                type={type}
                className={cn(
                  "flex h-full w-full bg-transparent text-foreground outline-none placeholder:text-transparent transition-all duration-300 z-20",
                  label && hasContent && "pt-4",
                  !label && "py-4",
                  className
                )}
                ref={ref}
                disabled={disabled}
                onFocus={(e) => {
                  setIsFocused(true)
                  props.onFocus?.(e)
                }}
                onBlur={(e) => {
                  setIsFocused(false)
                  props.onBlur?.(e)
                }}
                onChange={handleChange}
                value={value !== undefined ? value : internalValue}
                placeholder={isFocused ? placeholder : undefined}
                maxLength={maxLength}
                {...props}
              />
            </div>

            {/* Right Side Elements (Clear, Spinner, Icons) */}
            <div className="pr-4 flex items-center gap-2">
              <AnimatePresence>
                {clearable && internalValue && !disabled && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="button"
                    onClick={handleClear}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>

              {loading && (
                <div className="animate-spin text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </div>
              )}

              {!loading && rightIcon && (
                <div className="text-muted-foreground">{rightIcon}</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Elements (Helper Text & Character Count) */}
        <div className="flex justify-between items-start px-1">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-medium text-destructive"
              >
                {error}
              </motion.p>
            ) : helperText ? (
              <motion.p
                key="helper"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-muted-foreground"
              >
                {helperText}
              </motion.p>
            ) : (
              <div key="empty" /> // Placeholder for spacing
            )}
          </AnimatePresence>

          {maxLength && (
            <span className="text-xs text-muted-foreground whitespace-nowrap pl-2">
              {characterCount ?? String(internalValue).length} / {maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
