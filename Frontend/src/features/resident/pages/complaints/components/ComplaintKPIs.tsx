import { motion } from "framer-motion";
import { AlertCircle, Clock, CheckCircle2, Ticket } from "lucide-react";
import type { ComplaintKPIs as KPIsType } from "../../../services/complaint.service";

interface Props {
  kpis: KPIsType;
}

export function ComplaintKPIs({ kpis }: Props) {
  const data = [
    { label: "Total Complaints", value: kpis.total, icon: Ticket, color: "text-[#8F7CFF]", bg: "bg-[#8F7CFF]/10", desc: "All time records" },
    { label: "Open Issues", value: kpis.open, icon: AlertCircle, color: "text-[#3DD9FF]", bg: "bg-[#3DD9FF]/10", desc: "Requires attention" },
    { label: "In Progress", value: kpis.inProgress, icon: Clock, color: "text-[#FFD166]", bg: "bg-[#FFD166]/10", desc: "Currently working" },
    { label: "Resolved", value: kpis.resolved, icon: CheckCircle2, color: "text-[#72F1D1]", bg: "bg-[#72F1D1]/10", desc: "Successfully closed" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group hover:-translate-y-1 transition-transform cursor-default"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-2xl xl:text-4xl font-heading font-black text-slate-800 tracking-tight">{item.value}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-700">{item.label}</span>
            <span className="text-xs font-medium text-slate-500 mt-0.5">{item.desc}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
