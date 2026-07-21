import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function ActionButton({ 
  children, 
  variant = "primary", 
  size = "md", 
  isLoading = false, 
  leftIcon, 
  rightIcon, 
  className,
  disabled,
  ...props 
}: ActionButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all relative overflow-hidden group";
  
  const variants = {
    primary: "bg-slate-900 text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 border border-transparent",
    secondary: "bg-white text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-slate-200/60 hover:border-slate-300 hover:bg-slate-50",
    danger: "bg-[#FF7A7A]/10 text-[#FF7A7A] hover:bg-[#FF7A7A]/20 border border-transparent",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100/50 hover:text-slate-900 border border-transparent",
    outline: "bg-transparent border-2 border-slate-200 text-slate-700 hover:border-[#8F7CFF] hover:text-[#8F7CFF]",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs rounded-xl",
    md: "h-11 px-6 text-sm rounded-2xl",
    lg: "h-14 px-8 text-base rounded-[20px]",
    icon: "h-11 w-11 rounded-2xl",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isDisabled && "opacity-60 cursor-not-allowed hover:transform-none hover:shadow-none",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {/* Aurora Gradient overlay for primary buttons */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#8F7CFF] to-[#3DD9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      <div className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon}
        {size !== "icon" && children}
        {!isLoading && rightIcon}
      </div>
    </button>
  );
}
