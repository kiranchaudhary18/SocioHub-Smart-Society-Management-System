import { motion } from "framer-motion";
import { Info, Phone, Mail, Clock, AlertTriangle } from "lucide-react";

export function ComplaintsRightSidebar() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col gap-6"
    >
      
      {/* Latest Notice */}
      <div className="bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] rounded-[32px] p-6 shadow-xl text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <AlertTriangle className="w-5 h-5" />
          <h4 className="text-sm font-bold uppercase tracking-wider">Society Notice</h4>
        </div>
        
        <p className="text-sm font-medium text-white/90 leading-relaxed mb-4 relative z-10">
          Water supply will be affected in Tower A and B on 25th July between 2 PM to 5 PM due to tank cleaning.
        </p>
        
        <button className="text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg backdrop-blur-md relative z-10">
          Acknowledge
        </button>
      </div>

      {/* Support Contacts */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Phone className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Emergency Contacts</h4>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm cursor-default">
            <span className="text-sm font-bold text-slate-800">Security Gate 1</span>
            <span className="text-xs font-black text-[#8F7CFF]">Ext. 101</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm cursor-default">
            <span className="text-sm font-bold text-slate-800">Facility Manager</span>
            <span className="text-xs font-black text-[#8F7CFF]">+91 98765 00000</span>
          </div>
        </div>
      </div>

      {/* Office Info */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Info className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Office Information</h4>
        </div>
        
        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800">Working Hours</span>
            <span className="text-xs font-medium text-slate-500">Mon - Sat: 9:00 AM to 6:00 PM</span>
            <span className="text-xs font-medium text-slate-500">Sunday: Closed</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800">Support Email</span>
            <span className="text-xs font-medium text-slate-500">support@societymanagement.com</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
