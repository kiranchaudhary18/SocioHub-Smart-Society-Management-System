import { motion } from "framer-motion";
import { Building2, Navigation, MapPin, Clock, Briefcase, Phone, Mail, FileText } from "lucide-react";
import type { SocietyInfo } from "../../../services/myHome.service";

interface Props {
  info: SocietyInfo;
}

export function FlatSocietyInfo({ info }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#72F1D1]/10 text-[#00c49a] flex items-center justify-center shrink-0 border border-[#72F1D1]/20">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">{info.name}</h3>
            <p className="text-sm font-medium text-slate-500 max-w-sm mt-1">{info.address}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-colors shrink-0">
          <Navigation className="w-4 h-4" /> Get Directions
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Management Office</span>
              <span className="text-sm font-bold text-slate-800">{info.managementOffice}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Office Timings</span>
              <span className="text-sm font-bold text-slate-800">{info.officeTiming}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Security Main Gate</span>
              <span className="text-sm font-bold text-slate-800">{info.securityContact}</span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Society Email</span>
              <span className="text-sm font-bold text-slate-800">{info.email}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
