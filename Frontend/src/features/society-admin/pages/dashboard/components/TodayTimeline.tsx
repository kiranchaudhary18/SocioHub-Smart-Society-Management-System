import { SectionCard } from "../../../components/ui/SectionCard";
import type { DashboardStats } from "../../../services/dashboard.service";
import { Users, AlertTriangle, Zap, UserSquare2 } from "lucide-react";
import { motion } from "framer-motion";

interface TodayTimelineProps {
  timeline: DashboardStats['timeline'];
  delay?: number;
}

export function TodayTimeline({ timeline, delay = 0 }: TodayTimelineProps) {
  const getIconAndColor = (type: string) => {
    switch (type) {
      case "Resident": return { icon: Users, color: "text-[#3DD9FF]", bg: "bg-[#3DD9FF]/10", ring: "ring-[#3DD9FF]" };
      case "Complaint": return { icon: AlertTriangle, color: "text-[#FF7A7A]", bg: "bg-[#FF7A7A]/10", ring: "ring-[#FF7A7A]" };
      case "Payment": return { icon: Zap, color: "text-[#72F1D1]", bg: "bg-[#72F1D1]/10", ring: "ring-[#72F1D1]" };
      case "Visitor": return { icon: UserSquare2, color: "text-[#FFD166]", bg: "bg-[#FFD166]/10", ring: "ring-[#FFD166]" };
      default: return { icon: Users, color: "text-slate-500", bg: "bg-slate-100", ring: "ring-slate-300" };
    }
  };

  return (
    <SectionCard delay={delay} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Today's Activity</h3>
        <button className="text-sm font-bold text-[#8F7CFF] hover:underline">View Log</button>
      </div>

      <div className="flex flex-col gap-0 flex-1">
        {timeline.map((item, i) => {
          const style = getIconAndColor(item.type);
          const isLast = i === timeline.length - 1;
          
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + (i * 0.1) }}
              className="flex items-start gap-4 relative"
            >
              {/* Vertical Line */}
              {!isLast && (
                <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-slate-200" />
              )}
              
              <div className={`w-10 h-10 rounded-full ${style.bg} flex items-center justify-center shrink-0 z-10 ring-4 ring-white`}>
                <style.icon className={`w-4 h-4 ${style.color}`} />
              </div>
              
              <div className="flex flex-col flex-1 pb-8 pt-2 pl-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                  <span className="text-xs font-bold text-slate-400">{item.time}</span>
                </div>
                <span className="text-sm text-slate-500 mt-1">{item.desc}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionCard>
  );
}
