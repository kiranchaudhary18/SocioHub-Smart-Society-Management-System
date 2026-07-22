import { motion } from "framer-motion";
import { Download, FileText, PhoneCall, AlertTriangle, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";

export function FlatQuickActions() {
  const actions = [
    { label: "Resident Certificate", icon: ScrollText, color: "text-[#3DD9FF]", bg: "bg-[#3DD9FF]/10", border: "hover:border-[#3DD9FF]/30", link: "#" },
    { label: "Parking Letter", icon: Download, color: "text-[#8F7CFF]", bg: "bg-[#8F7CFF]/10", border: "hover:border-[#8F7CFF]/30", link: "#" },
    { label: "Raise Property Issue", icon: AlertTriangle, color: "text-[#FF7A7A]", bg: "bg-[#FF7A7A]/10", border: "hover:border-[#FF7A7A]/30", link: "/resident/complaints" },
    { label: "Society Documents", icon: FileText, color: "text-[#FFD166]", bg: "bg-[#FFD166]/10", border: "hover:border-[#FFD166]/30", link: "/resident/documents" },
    { label: "Contact Office", icon: PhoneCall, color: "text-[#72F1D1]", bg: "bg-[#72F1D1]/10", border: "hover:border-[#72F1D1]/30", link: "#" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action, idx) => (
          <Link key={idx} to={action.link} className={`flex flex-col items-center justify-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-1 ${action.border} group`}>
            <div className={`w-12 h-12 rounded-xl ${action.bg} ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-700 text-center leading-tight">{action.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
