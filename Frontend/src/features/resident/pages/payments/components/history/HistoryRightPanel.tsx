import { motion } from "framer-motion";
import { HelpCircle, CalendarClock, Phone } from "lucide-react";
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
      {/* Date */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-2">
        <h4 className="text-sm font-bold text-slate-800">{currentDate}</h4>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <CalendarClock className="w-4 h-4 text-[#8F7CFF]" />
          <span>Next Bill: 5th Aug</span>
        </div>
      </div>

      {/* Support Contacts */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Phone className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Support Contacts</h4>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm cursor-default">
            <span className="text-sm font-bold text-slate-800">Management Office</span>
            <span className="text-xs font-black text-[#8F7CFF]">+91 98765 00001</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm cursor-default">
            <span className="text-sm font-bold text-slate-800">Finance Team</span>
            <span className="text-xs font-black text-[#8F7CFF]">Ext. 402</span>
          </div>
        </div>
      </div>

      {/* Help Notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-[32px] p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-blue-500">
          <HelpCircle className="w-4 h-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">Payment Help</h4>
        </div>
        <p className="text-sm font-medium text-blue-900 leading-relaxed">
          If a transaction failed but money was deducted, it will automatically refund to your account within 5-7 business days. Please do not re-initiate payment immediately.
        </p>
      </div>

    </motion.div>
  );
}
