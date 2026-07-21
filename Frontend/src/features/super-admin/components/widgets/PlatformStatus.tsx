import { motion } from "framer-motion";
import { usePlatformHealth } from "../../hooks/useDashboardData";
import { Activity } from "lucide-react";

export function PlatformStatus() {
  const { data: health, isLoading } = usePlatformHealth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] h-full flex flex-col"
    >
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-xl font-heading font-extrabold text-slate-800 flex items-center gap-2">
          System Health
          <Activity className="w-5 h-5 text-[#72F1D1]" />
        </h3>
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#72F1D1]/10 rounded-full text-xs font-bold text-teal-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          Live
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {isLoading ? (
          [1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />
          ))
        ) : (
          health?.map((service, index) => (
            <motion.div 
              key={service.service}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/60 transition-colors"
            >
              <div>
                <p className="text-sm font-bold text-slate-800">{service.service}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-medium text-slate-400">Latency: {service.latency}</span>
                  <span className="text-xs font-medium text-slate-300">•</span>
                  <span className="text-xs font-medium text-slate-400">Uptime: {service.uptime}</span>
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                service.status === 'Operational' 
                  ? 'bg-teal-50 text-teal-600' 
                  : 'bg-amber-50 text-amber-600'
              }`}>
                {service.status}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
