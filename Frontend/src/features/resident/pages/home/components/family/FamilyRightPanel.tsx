import { motion } from "framer-motion";
import { ShieldAlert, Building2, PhoneCall, Cloud, Info } from "lucide-react";
import { format } from "date-fns";

export function FamilyRightPanel() {
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
          <h4 className="text-sm font-bold text-slate-800">Emergency Numbers</h4>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 hover:border-red-200 transition-colors cursor-pointer shadow-sm">
            <span className="text-sm font-bold text-slate-800">Security Gate</span>
            <span className="text-xs font-black text-red-500">+91 98765 43210</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 hover:border-red-200 transition-colors cursor-pointer shadow-sm">
            <span className="text-sm font-bold text-slate-800">Ambulance</span>
            <span className="text-xs font-black text-red-500">108</span>
          </div>
        </div>
      </div>

      {/* Society Office */}
      <div className="bg-gradient-to-br from-[#8F7CFF]/10 to-transparent border border-[#8F7CFF]/20 rounded-[32px] p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b border-[#8F7CFF]/10 pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#8F7CFF]/20 text-[#8F7CFF] flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">Society Office</h4>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Timings</span>
            <span className="text-sm font-bold text-slate-700">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Maintenance</span>
            <span className="text-sm font-bold text-slate-700">+91 98765 43211</span>
          </div>
        </div>
        
        <button className="w-full py-2.5 bg-white border border-[#8F7CFF]/20 text-[#8F7CFF] hover:bg-[#8F7CFF] hover:text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2 mt-2">
          <PhoneCall className="w-3.5 h-3.5" /> Call Office
        </button>
      </div>

    </motion.div>
  );
}
