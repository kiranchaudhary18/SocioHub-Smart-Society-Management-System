import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full items-center justify-center transition-all duration-300",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        default: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-base",
        xl: "h-20 w-20 text-xl",
      },
      variant: {
        default: "bg-neutral-100 text-neutral-600 border border-neutral-200",
        primary: "bg-primary-100 text-primary-700 border border-primary-200",
        glass: "glass-light text-foreground shadow-sm",
        gradient: "bg-gradient-to-br from-aurora-mint to-aurora-aqua text-foreground border-none",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  status?: "online" | "offline" | "busy" | "away"
  roleIndicator?: React.ReactNode
  animated?: boolean
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, variant, src, alt, fallback, status, roleIndicator, animated = false, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)

    const Comp = animated ? motion.div : "div"
    const animationProps = animated ? { whileHover: { scale: 1.05 } } : {}

    const getStatusColor = () => {
      switch (status) {
        case "online": return "bg-success"
        case "offline": return "bg-neutral-400"
        case "busy": return "bg-destructive"
        case "away": return "bg-warning"
        default: return ""
      }
    }

    return (
      <div className="relative inline-block">
        <Comp
          ref={ref}
          className={cn(avatarVariants({ size, variant, className }))}
          {...animationProps}
          {...(props as any)}
        >
          {src && !imageError ? (
            <img
              src={src}
              alt={alt || "Avatar"}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="font-semibold font-heading uppercase tracking-wider">
              {fallback || alt?.charAt(0) || "?"}
            </span>
          )}
        </Comp>

        {/* Status Indicator */}
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full border-2 border-background",
              getStatusColor(),
              size === "xs" ? "h-2 w-2" : size === "sm" ? "h-2.5 w-2.5" : size === "lg" ? "h-4 w-4" : size === "xl" ? "h-5 w-5" : "h-3 w-3"
            )}
          />
        )}

        {/* Role Indicator (e.g. small badge or icon at top right) */}
        {roleIndicator && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-background p-0.5 shadow-sm z-10">
            {roleIndicator}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar, avatarVariants }
