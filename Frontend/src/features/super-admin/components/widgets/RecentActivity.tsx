import { motion } from "framer-motion";
import { useRecentActivity } from "../../hooks/useDashboardData";
import { Plus, Check, UserPlus, CreditCard, AlertCircle } from "lucide-react";

export function RecentActivity() {
  const { data: activities, isLoading } = useRecentActivity();

  const getIcon = (type: string) => {
    switch (type) {
      case "create": return Plus;
      case "approve": return Check;
      case "join": return UserPlus;
      case "payment": return CreditCard;
      case "alert": return AlertCircle;
      default: return Plus;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] h-full flex flex-col"
    >
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-xl font-heading font-extrabold text-slate-800">Recent Activity</h3>
        <button className="text-sm font-bold text-[#8F7CFF] hover:text-[#8F7CFF]/80 transition-colors">
          View All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative">
        <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-200/50" />
        
        {isLoading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-4 mb-6 relative animate-pulse">
              <div className="w-12 h-12 rounded-full bg-slate-200 z-10 shrink-0" />
              <div className="pt-1 flex-1">
                <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                <div className="h-3 w-48 bg-slate-200 rounded" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-6 relative">
            {activities?.map((activity, index) => {
              const Icon = getIcon(activity.type);
              
              return (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  key={activity.id}
                  className="flex gap-4 relative group"
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center z-10 shrink-0 shadow-sm border border-white transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${activity.color}15`, color: activity.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="pt-1 flex-1 pb-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#8F7CFF] transition-colors">{activity.title}</h4>
                      <span className="text-xs font-bold text-slate-400 whitespace-nowrap ml-2">{activity.time}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 leading-snug">{activity.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
