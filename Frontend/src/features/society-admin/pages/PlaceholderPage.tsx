import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/80 shadow-sm rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8F7CFF]/5 to-[#3DD9FF]/5 pointer-events-none" />
        
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 relative z-10 border border-slate-100">
          <Wrench className="w-8 h-8 text-[#8F7CFF]" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 relative z-10">{title}</h2>
        <p className="text-slate-500 font-medium relative z-10 text-sm">
          This module is part of the foundational architecture. 
          Detailed CRUD operations and business logic will be built here soon.
        </p>
      </motion.div>
    </div>
  );
}
