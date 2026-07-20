import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] transition-all duration-200",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-600 hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-600 hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-neutral-100 hover:text-foreground",
        danger:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-danger-600 hover:shadow-md hover:-translate-y-0.5",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success-600 hover:shadow-md hover:-translate-y-0.5",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning-600 hover:shadow-md hover:-translate-y-0.5",
        gradient:
          "bg-gradient-to-r from-aurora-mint via-aurora-aqua to-aurora-lavender text-foreground shadow-lg hover:shadow-glow hover:-translate-y-1 bg-[length:200%_auto] hover:bg-right transition-all duration-500",
        glass:
          "glass-light text-foreground hover:bg-white/40 hover:shadow-glow hover:-translate-y-1",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-12 rounded-xl px-8 text-lg",
        xl: "h-14 rounded-2xl px-10 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : motion.button

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading || disabled}
        whileTap={asChild ? undefined : { scale: 0.98 }}
        {...(props as any)}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        <SlottableChild asChild={asChild}>{children}</SlottableChild>
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

// Helper to support asChild safely with leftIcon/rightIcon
const SlottableChild = ({ asChild, children }: { asChild: boolean; children: React.ReactNode }) => {
  if (asChild) {
    return <Slot>{children}</Slot>
  }
  return <>{children}</>
}

export { Button, buttonVariants }
