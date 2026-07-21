import { SectionCard } from "../../../components/ui/SectionCard";
import { ActionButton } from "../../../components/ui/ActionButton";
import type { DashboardStats } from "../../../services/dashboard.service";
import { CheckCircle2, Clock, CalendarDays, Phone, ShieldAlert, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

interface RightSidebarProps {
  tasks: DashboardStats['pendingTasks'];
}

export function RightSidebar({ tasks }: RightSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Today's Tasks & Approvals */}
      <SectionCard className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Your Tasks</h3>
          <span className="w-6 h-6 rounded-full bg-[#FF7A7A] text-white text-xs font-bold flex items-center justify-center shadow-sm">
            {tasks.length}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {tasks.map((task, i) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              className="flex flex-col gap-2 p-3 rounded-2xl border border-slate-100 hover:border-[#72F1D1]/40 bg-white transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-bold text-slate-700 group-hover:text-[#72F1D1] transition-colors">{task.title}</span>
                {task.type === "Approval" && <CheckCircle2 className="w-4 h-4 text-[#FFD166] shrink-0" />}
                {task.type === "Task" && <Clock className="w-4 h-4 text-[#8F7CFF] shrink-0" />}
                {task.type === "Meeting" && <CalendarDays className="w-4 h-4 text-[#3DD9FF] shrink-0" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{task.type}</span>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  task.due === 'Today' ? 'bg-[#FF7A7A]/10 text-[#FF7A7A]' : 'bg-slate-100 text-slate-500'
                }`}>
                  Due {task.due}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        <ActionButton variant="outline" className="w-full mt-4" size="sm">View All Tasks</ActionButton>
      </SectionCard>

      {/* Emergency Contacts */}
      <SectionCard className="bg-gradient-to-br from-slate-900 to-slate-800 border-none text-white overflow-hidden relative">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF7A7A]/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#3DD9FF]/20 blur-3xl rounded-full" />
        
        <h3 className="text-lg font-bold text-white mb-4 relative z-10 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#FF7A7A]" /> Emergency
        </h3>
        
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-[#FFD166]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Main Gate</span>
                <span className="text-xs text-white/60">Ext. 999</span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center text-white transition-all shadow-sm"><Phone className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-[#FF7A7A]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Apollo Ambulance</span>
                <span className="text-xs text-white/60">1066</span>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center text-white transition-all shadow-sm"><Phone className="w-4 h-4" /></button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
