import { motion } from "framer-motion";
import { PhoneCall, FileText, Clock, AlertTriangle, ShieldCheck, Wrench, Download } from "lucide-react";
import { Link } from "react-router-dom";

export function InformationPanel() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Emergency Contacts */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/60 backdrop-blur-xl border border-red-100 rounded-[24px] shadow-[0_4px_20px_rgba(255,0,0,0.02)] p-5 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-red-50">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
            <PhoneCall className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-800">Emergency Contacts</h3>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 hover:border-red-200 transition-colors group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Security Gate</span>
                <span className="text-xs font-medium text-slate-500">+91 98765 43210</span>
              </div>
            </div>
            <PhoneCall className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-slate-100 hover:border-red-200 transition-colors group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">Maintenance</span>
                <span className="text-xs font-medium text-slate-500">+91 98765 43211</span>
              </div>
            </div>
            <PhoneCall className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 border border-red-100 hover:border-red-300 transition-colors group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 group-hover:bg-red-200 transition-colors">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-red-700">Ambulance</span>
                <span className="text-xs font-bold text-red-500">108</span>
              </div>
            </div>
            <PhoneCall className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors" />
          </div>
        </div>
      </motion.div>

      {/* Document Center */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 flex flex-col"
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-800">Quick Documents</h3>
        </div>
        
        <div className="flex flex-col gap-2">
          {["Society Bye-Laws 2026", "Parking Guidelines", "Pet Policy", "Waste Segregation"].map((doc, idx) => (
            <Link key={idx} to="/resident/documents" className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-slate-400 group-hover:text-[#3DD9FF] transition-colors" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{doc}</span>
              </div>
              <Download className="w-4 h-4 text-slate-300 group-hover:text-[#3DD9FF] transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Office Timing */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#8F7CFF]/10 to-transparent border border-[#8F7CFF]/20 rounded-[24px] p-5 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-[#8F7CFF]/20 flex items-center justify-center text-[#8F7CFF] shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-sm font-bold text-slate-800 mb-1">Society Office Hours</h4>
          <p className="text-xs font-medium text-slate-600 mb-0.5">Mon - Sat: 9:00 AM - 6:00 PM</p>
          <p className="text-xs font-medium text-slate-500">Sunday Closed</p>
        </div>
      </motion.div>

    </div>
  );
}
