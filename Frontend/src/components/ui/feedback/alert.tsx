import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, Info, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11 overflow-hidden transition-all",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        success:
          "border-success/50 text-success-800 bg-success/10 dark:text-success-300 [&>svg]:text-success-600",
        danger:
          "border-destructive/50 text-destructive-800 bg-destructive/10 dark:text-destructive-300 [&>svg]:text-destructive-600",
        warning:
          "border-warning/50 text-warning-800 bg-warning/10 dark:text-warning-300 [&>svg]:text-warning-600",
        info:
          "border-info/50 text-info-800 bg-info/10 dark:text-info-300 [&>svg]:text-info-600",
        glass:
          "glass-light text-foreground border-border/50 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  icon?: boolean | React.ReactNode
  onClose?: () => void
  animated?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, children, icon = true, onClose, animated = true, ...props }, ref) => {
    
    // Auto-select icon based on variant if icon is true
    const renderIcon = () => {
      if (React.isValidElement(icon)) return icon
      if (icon === false) return null

      switch (variant) {
        case "success": return <CheckCircle className="h-5 w-5" />
        case "danger": return <XCircle className="h-5 w-5" />
        case "warning": return <AlertTriangle className="h-5 w-5" />
        case "info": return <Info className="h-5 w-5" />
        default: return <Info className="h-5 w-5" />
      }
    }

    const Comp = animated ? motion.div : "div"
    const animationProps = animated
      ? {
          initial: { opacity: 0, y: -10, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
          transition: { type: "spring", stiffness: 400, damping: 30 }
        }
      : {}

    return (
      <AnimatePresence>
        <Comp
          ref={ref}
          role="alert"
          className={cn(alertVariants({ variant }), className)}
          {...animationProps}
          {...(props as any)}
        >
          {/* Subtle background glow for premium variants */}
          {variant !== "default" && variant !== "glass" && (
             <div className={cn(
               "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none translate-x-10 -translate-y-10",
               variant === "success" && "bg-success",
               variant === "danger" && "bg-destructive",
               variant === "warning" && "bg-warning",
               variant === "info" && "bg-info"
             )} />
          )}

          {renderIcon()}
          
          <div className="flex-1">
            {title && (
              <h5 className="mb-1 font-heading font-semibold leading-none tracking-tight">
                {title}
              </h5>
            )}
            <div className="text-sm [&_p]:leading-relaxed">
              {children}
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </Comp>
      </AnimatePresence>
    )
  }
)
Alert.displayName = "Alert"

export { Alert, alertVariants }
