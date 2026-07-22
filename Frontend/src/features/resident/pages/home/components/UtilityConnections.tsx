import { motion } from "framer-motion";
import { Zap, Droplets, Flame, Wifi, BatteryCharging, Droplet } from "lucide-react";
import type { UtilityConnections as IUtilityConnections } from "../../../services/myHome.service";

interface Props {
  utilities: IUtilityConnections;
}

export function UtilityConnections({ utilities }: Props) {
  const items = [
    { label: "Electricity", value: utilities.electricityMeter, icon: Zap, bg: "bg-[#FFD166]/10", text: "text-[#FFD166]" },
    { label: "Water Connection", value: utilities.waterConnection, icon: Droplets, bg: "bg-[#3DD9FF]/10", text: "text-[#3DD9FF]" },
    { label: "Gas Connection", value: utilities.gasConnection, icon: Flame, bg: "bg-[#FF7A7A]/10", text: "text-[#FF7A7A]" },
    { label: "Internet", value: utilities.internetProvider, icon: Wifi, bg: "bg-[#8F7CFF]/10", text: "text-[#8F7CFF]" },
    { label: "Power Backup", value: utilities.powerBackup, icon: BatteryCharging, bg: "bg-[#72F1D1]/10", text: "text-[#72F1D1]" },
    { label: "Water Tank", value: utilities.waterTank, icon: Droplet, bg: "bg-[#3DD9FF]/10", text: "text-[#3DD9FF]" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <div className="w-12 h-12 rounded-xl bg-[#FFD166]/10 text-amber-500 flex items-center justify-center">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Utility Connections</h3>
          <p className="text-sm font-medium text-slate-500">Meters and registered services</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.text} flex items-center justify-center shrink-0`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</span>
              <span className="text-sm font-black text-slate-800 leading-tight">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
