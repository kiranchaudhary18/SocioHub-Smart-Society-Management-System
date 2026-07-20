import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200",
        primary:
          "bg-primary-100 text-primary-900 border border-primary-200 hover:bg-primary-200",
        secondary:
          "bg-secondary-100 text-secondary-900 border border-secondary-200 hover:bg-secondary-200",
        success:
          "bg-success/20 text-success-700 border border-success/30 hover:bg-success/30",
        warning:
          "bg-warning/20 text-warning-700 border border-warning/30 hover:bg-warning/30",
        error:
          "bg-destructive/10 text-destructive-700 border border-destructive/30 hover:bg-destructive/20",
        info:
          "bg-info/20 text-info-700 border border-info/30 hover:bg-info/30",
        gradient:
          "bg-gradient-to-r from-aurora-mint via-aurora-aqua to-aurora-lavender text-foreground shadow-sm hover:shadow-glow border-none",
        glass:
          "glass-light text-foreground hover:bg-white/40",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  animated?: boolean
  dot?: boolean
}

function Badge({
  className,
  variant,
  size,
  animated = false,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = animated ? motion.div : "div"

  const animationProps = animated
    ? {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      }
    : {}

  return (
    <Comp
      className={cn(badgeVariants({ variant, size }), className)}
      {...animationProps}
      {...(props as any)}
    >
      {dot && (
        <span
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full",
            variant === "success" && "bg-success-500",
            variant === "warning" && "bg-warning-500",
            variant === "error" && "bg-destructive",
            variant === "info" && "bg-info-500",
            (!variant || variant === "default") && "bg-neutral-500"
          )}
        />
      )}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
