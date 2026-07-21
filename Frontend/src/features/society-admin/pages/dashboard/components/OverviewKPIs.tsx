import { StatCard } from "../../../components/ui/StatCard";
import type { DashboardStats } from "../../../services/dashboard.service";
import { Building2, Users, ShieldCheck, UserSquare2 } from "lucide-react";

interface OverviewKPIsProps {
  stats: DashboardStats['overview'];
}

export function OverviewKPIs({ stats }: OverviewKPIsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      <StatCard 
        title="Flats Occupied" 
        value={`${stats.flats.occupied}/${stats.flats.total}`} 
        icon={<Building2 className="w-6 h-6 text-[#3DD9FF]" />}
        subtitle={`${stats.flats.vacant} vacant flats`}
        delay={0.1}
      />
      <StatCard 
        title="Total Residents" 
        value={stats.residents.toLocaleString()} 
        icon={<Users className="w-6 h-6 text-[#8F7CFF]" />}
        trend={{ value: 2, isPositive: true }}
        delay={0.2}
      />
      <StatCard 
        title="Workforce" 
        value={stats.staff + stats.security} 
        icon={<ShieldCheck className="w-6 h-6 text-[#72F1D1]" />}
        subtitle={`${stats.security} Security • ${stats.staff} Staff`}
        delay={0.3}
      />
      <StatCard 
        title="Visitors Today" 
        value={stats.visitorsToday} 
        icon={<UserSquare2 className="w-6 h-6 text-[#FFD166]" />}
        trend={{ value: 12, isPositive: true }}
        delay={0.4}
      />
    </div>
  );
}
