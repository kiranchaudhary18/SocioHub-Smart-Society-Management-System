import { motion } from "framer-motion";
import { Building2, Home, Hash, ArrowUpToLine, MapPin, Key, UserCheck, CalendarDays, Settings } from "lucide-react";
import type { PropertyOverview as IPropertyOverview } from "../../../services/myHome.service";

interface Props {
  overview: IPropertyOverview;
}

export function PropertyOverview({ overview }: Props) {
  const items = [
    { label: "Flat Number", value: overview.flatNumber, icon: Hash, color: "text-[#8F7CFF]", bg: "bg-[#8F7CFF]/10" },
    { label: "Tower", value: overview.tower, icon: Building2, color: "text-[#3DD9FF]", bg: "bg-[#3DD9FF]/10" },
    { label: "Wing", value: overview.wing, icon: MapPin, color: "text-[#72F1D1]", bg: "bg-[#72F1D1]/10" },
    { label: "Floor", value: overview.floor, icon: ArrowUpToLine, color: "text-[#FFD166]", bg: "bg-[#FFD166]/10" },
    { label: "Property Type", value: overview.propertyType, icon: Home, color: "text-[#FF5DA2]", bg: "bg-[#FF5DA2]/10" },
    { label: "Ownership", value: overview.ownershipStatus, icon: Key, color: "text-[#8F7CFF]", bg: "bg-[#8F7CFF]/10" },
    { label: "Occupancy", value: overview.occupancyStatus, icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-100" },
    { label: "Move-in Date", value: overview.moveInDate, icon: CalendarDays, color: "text-[#3DD9FF]", bg: "bg-[#3DD9FF]/10" },
    { label: "Maintenance", value: overview.maintenanceCategory, icon: Settings, color: "text-slate-500", bg: "bg-slate-100" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <div className="w-12 h-12 rounded-xl bg-[#8F7CFF]/10 text-[#8F7CFF] flex items-center justify-center">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Property Overview</h3>
          <p className="text-sm font-medium text-slate-500">General details about this residence</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 hover:bg-white transition-colors group">
            <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</span>
            <span className="text-sm font-black text-slate-800 leading-tight">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
