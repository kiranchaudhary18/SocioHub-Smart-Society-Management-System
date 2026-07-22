import { motion } from "framer-motion";
import { Cloud, RefreshCw } from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col"
      >
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 font-medium">Welcome back! Here's an overview of your home and community.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 self-start sm:self-auto"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-[#3DD9FF]/10 border border-[#3DD9FF]/20 rounded-2xl shadow-sm text-sm font-bold text-[#00a3cc]">
          <Cloud className="w-4 h-4" />
          <span>28°C Partly Cloudy</span>
        </div>

        <button 
          onClick={handleRefresh}
          className="w-10 h-10 flex items-center justify-center bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-sm text-slate-500 hover:text-[#8F7CFF] hover:bg-white transition-all"
          title="Refresh Data"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#8F7CFF]' : ''}`} />
        </button>
      </motion.div>
    </div>
  );
}
