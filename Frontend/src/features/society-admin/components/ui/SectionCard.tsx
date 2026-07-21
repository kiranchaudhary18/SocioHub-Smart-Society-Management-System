import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  noPadding?: boolean;
}

export function SectionCard({ children, className, delay = 0, noPadding = false }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
