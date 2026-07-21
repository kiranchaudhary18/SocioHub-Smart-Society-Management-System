import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  delay?: number;
  className?: string;
}

export function StatCard({ title, value, icon, trend, subtitle, delay = 0, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[24px] p-6 relative overflow-hidden group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all",
        className
      )}
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</span>
          <div className="flex items-end gap-3 mt-1">
            <span className="text-3xl font-heading font-black text-slate-800 tracking-tight">{value}</span>
            {trend && (
              <span className={cn(
                "text-xs font-bold mb-1 px-2 py-0.5 rounded-md",
                trend.isPositive ? "bg-[#72F1D1]/20 text-emerald-700" : "bg-[#FF7A7A]/10 text-red-700"
              )}>
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtitle && (
            <span className="text-xs font-medium text-slate-400 mt-2">{subtitle}</span>
          )}
        </div>
        
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100 text-slate-400 group-hover:scale-110 group-hover:text-[#8F7CFF] transition-all">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
