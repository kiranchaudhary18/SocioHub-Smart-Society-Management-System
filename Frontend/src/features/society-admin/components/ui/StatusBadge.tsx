import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

interface StatusBadgeProps {
  variant: StatusVariant;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  animate?: boolean;
}

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-[#72F1D1]/20 text-emerald-700 border-[#72F1D1]/30",
  warning: "bg-[#FFD166]/20 text-amber-700 border-[#FFD166]/30",
  danger: "bg-[#FF7A7A]/10 text-red-700 border-[#FF7A7A]/30",
  info: "bg-[#3DD9FF]/10 text-sky-700 border-[#3DD9FF]/30",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
};

export function StatusBadge({ variant, children, icon, className, animate = false }: StatusBadgeProps) {
  const content = (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border",
      variantStyles[variant],
      className
    )}>
      {icon && <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">{icon}</span>}
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        {content}
      </motion.div>
    );
  }

  return content;
}
