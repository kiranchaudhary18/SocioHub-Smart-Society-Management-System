import { motion } from "framer-motion";
import { format } from "date-fns";
import { CloudSun } from "lucide-react";

export function WelcomeSection() {
  const timeStr = format(new Date(), "h:mm a");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
          Good Morning,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F7CFF] via-[#3DD9FF] to-[#72F1D1] animate-gradient-x">
            Kiran 👋
          </span>
        </h1>
        <p className="text-slate-500 font-medium text-base">
          Here is what's happening across the ResiCore platform today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Weather Widget Placeholder */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD166] to-[#FF7A7A] flex items-center justify-center shrink-0">
            <CloudSun className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 leading-tight">Ahmedabad</p>
            <p className="text-sm font-bold text-slate-700 leading-tight">28°C Partly Cloudy</p>
          </div>
        </div>

        {/* Time Widget */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 leading-tight">Local Time</p>
            <p className="text-sm font-bold text-slate-700 leading-tight">{timeStr}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
