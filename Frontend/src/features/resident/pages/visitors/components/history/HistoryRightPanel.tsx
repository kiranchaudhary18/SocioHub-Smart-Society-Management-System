import { motion } from "framer-motion";
import { ShieldAlert, Cloud, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export function HistoryRightPanel() {
  const currentDate = format(new Date(), "EEEE, MMMM do");

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      {/* Weather & Date */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2">
        <h4 className="text-sm font-bold text-slate-800">{currentDate}</h4>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <Cloud className="w-4 h-4 text-[#3DD9FF]" />
          <span>28°C Partly Cloudy</span>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white/60 backdrop-blur-xl border border-red-100 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(255,0,0,0.02)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-red-50 pb-3">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <h4 className="text-sm font-bold text-slate-800">Security Emergency</h4>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 shadow-sm cursor-default">
            <span className="text-sm font-bold text-slate-800">Main Gate</span>
            <span className="text-xs font-black text-red-500">+91 98765 43210</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 shadow-sm cursor-default">
            <span className="text-sm font-bold text-slate-800">Tower B Lobby</span>
            <span className="text-xs font-black text-red-500">+91 98765 43212</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-[#8F7CFF]/5 border border-[#8F7CFF]/20 rounded-[32px] p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[#8F7CFF]">
          <AlertCircle className="w-4 h-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Log Discrepancy</h4>
        </div>
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          If you notice any unauthorized entry logs or discrepancies in your visitor history, please report them to the society office immediately.
        </p>
      </div>

    </motion.div>
  );
}
