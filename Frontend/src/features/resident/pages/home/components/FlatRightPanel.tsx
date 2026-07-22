import { motion } from "framer-motion";
import { Cloud, Wallet, PhoneCall, BellRing, Navigation } from "lucide-react";
import type { RightPanelData } from "../../../services/myHome.service";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Props {
  data: RightPanelData;
}

export function FlatRightPanel({ data }: Props) {
  const currentDate = format(new Date(), "EEEE, MMMM do");

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
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

      {/* Maintenance Status */}
      <div className="bg-gradient-to-br from-[#8F7CFF]/10 to-transparent border border-[#8F7CFF]/20 rounded-[32px] p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8F7CFF]/20 text-[#8F7CFF] flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Maintenance</span>
            <span className="text-sm font-black text-slate-800 tracking-tight">{data.maintenanceStatus === "PAID" ? "All Clear" : `₹${data.currentDue.toLocaleString()}`}</span>
          </div>
        </div>
        
        {data.maintenanceStatus !== "PAID" && (
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Due: {data.dueDate}</span>
            <Link to="/resident/payments" className="px-4 py-1.5 bg-[#8F7CFF] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-[#7b68ee] transition-colors">
              Pay Now
            </Link>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white/60 backdrop-blur-xl border border-red-100 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(255,0,0,0.02)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-red-50 pb-3">
          <PhoneCall className="w-4 h-4 text-red-500" />
          <h4 className="text-sm font-bold text-slate-800">Emergency Quick Dial</h4>
        </div>
        <div className="flex flex-col gap-2">
          {data.emergencyContacts.map((contact, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 hover:border-red-200 transition-colors group cursor-pointer shadow-sm">
              <span className="text-sm font-bold text-slate-800">{contact.title}</span>
              <span className="text-xs font-black text-red-500">{contact.number}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notice */}
      {data.recentNotice && (
        <div className="bg-[#FFD166]/10 border border-[#FFD166]/20 rounded-[32px] p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-amber-600">
            <BellRing className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Latest Notice</h4>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800 line-clamp-2">{data.recentNotice.title}</span>
            <span className="text-xs font-medium text-slate-500 mt-1">{new Date(data.recentNotice.date).toLocaleDateString()}</span>
          </div>
          <Link to="/resident/community/notices" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 mt-2">
            View Notice <Navigation className="w-3 h-3 rotate-90" />
          </Link>
        </div>
      )}

    </motion.div>
  );
}
