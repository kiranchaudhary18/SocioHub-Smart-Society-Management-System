import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Building2, Users, FileSignature, ShieldCheck } from "lucide-react";
import { useDashboardKPIs } from "../../hooks/useDashboardData";

export function KPICards() {
  const { data: kpis, isLoading } = useDashboardKPIs();

  if (isLoading || !kpis) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white/40 backdrop-blur-md rounded-3xl animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Societies",
      value: kpis.totalSocieties.value,
      trend: kpis.totalSocieties.trend,
      positive: kpis.totalSocieties.positive,
      icon: Building2,
      color: "text-[#72F1D1]",
      bg: "bg-[#72F1D1]/10",
    },
    {
      title: "Active Residents",
      value: kpis.activeResidents.value.toLocaleString(),
      trend: kpis.activeResidents.trend,
      positive: kpis.activeResidents.positive,
      icon: Users,
      color: "text-[#8F7CFF]",
      bg: "bg-[#8F7CFF]/10",
    },
    {
      title: "Pending Requests",
      value: kpis.pendingRequests.value,
      trend: kpis.pendingRequests.trend,
      positive: kpis.pendingRequests.positive,
      icon: FileSignature,
      color: "text-[#FF5DA2]",
      bg: "bg-[#FF5DA2]/10",
    },
    {
      title: "Active Admins",
      value: kpis.activeAdmins.value,
      trend: kpis.activeAdmins.trend,
      positive: kpis.activeAdmins.positive,
      icon: ShieldCheck,
      color: "text-[#3DD9FF]",
      bg: "bg-[#3DD9FF]/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(143,124,255,0.08)] transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${card.positive ? 'bg-[#72F1D1]/10 text-teal-600' : 'bg-[#FF7A7A]/10 text-[#FF7A7A]'}`}>
              {card.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{card.trend.split(' ')[0]}</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-slate-400 mb-1">{card.title}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-black text-slate-800">{card.value}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
