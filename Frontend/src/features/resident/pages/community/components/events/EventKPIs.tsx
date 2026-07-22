import { motion } from "framer-motion";
import { CalendarClock, CalendarCheck2, CheckCircle2, CalendarRange } from "lucide-react";
import type { EventKPIs as KPIsType } from "../../../../services/community.service";

interface Props {
  kpis: KPIsType;
}

export function EventKPIs({ kpis }: Props) {
  const data = [
    { label: "Upcoming Events", value: kpis.upcoming, icon: CalendarClock, color: "text-[#8F7CFF]", bg: "bg-[#8F7CFF]/10", desc: "Planned for future" },
    { label: "Registered", value: kpis.registered, icon: CalendarCheck2, color: "text-[#3DD9FF]", bg: "bg-[#3DD9FF]/10", desc: "Your participation" },
    { label: "Completed", value: kpis.completed, icon: CheckCircle2, color: "text-[#72F1D1]", bg: "bg-[#72F1D1]/10", desc: "Past events" },
    { label: "This Month", value: kpis.thisMonth, icon: CalendarRange, color: "text-amber-400", bg: "bg-amber-400/10", desc: "Total scheduled" },
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
