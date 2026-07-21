import { SectionCard } from "../../../components/ui/SectionCard";
import type { DashboardStats } from "../../../services/dashboard.service";
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

interface ComplaintKanbanWidgetProps {
  complaints: DashboardStats['complaints'];
  delay?: number;
}

export function ComplaintKanbanWidget({ complaints, delay = 0 }: ComplaintKanbanWidgetProps) {
  const total = complaints.open + complaints.inProgress + complaints.resolved;

  return (
    <SectionCard delay={delay} className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Complaints Summary</h3>
        <span className="text-sm font-bold text-[#FF5DA2] bg-[#FF5DA2]/10 px-2.5 py-1 rounded-full">
          {complaints.highPriority} High Priority
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Open */}
        <div className="bg-white border border-[#FF7A7A]/20 shadow-[0_2px_10px_rgba(255,122,122,0.06)] rounded-2xl p-5 flex flex-col items-center text-center group hover:border-[#FF7A7A]/40 transition-all relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF7A7A]/50 to-[#FF7A7A]/10" />
          <div className="w-12 h-12 rounded-2xl bg-[#FF7A7A]/10 text-[#FF7A7A] flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-slate-800 tracking-tight">{complaints.open}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Open</span>
        </div>

        {/* In Progress */}
        <div className="bg-white border border-[#FFD166]/20 shadow-[0_2px_10px_rgba(255,209,102,0.06)] rounded-2xl p-5 flex flex-col items-center text-center group hover:border-[#FFD166]/40 transition-all relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FFD166]/50 to-[#FFD166]/10" />
          <div className="w-12 h-12 rounded-2xl bg-[#FFD166]/10 text-amber-500 flex items-center justify-center mb-3">
            <Clock className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-slate-800 tracking-tight">{complaints.inProgress}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Progress</span>
        </div>

        {/* Resolved */}
        <div className="bg-white border border-[#72F1D1]/20 shadow-[0_2px_10px_rgba(114,241,209,0.06)] rounded-2xl p-5 flex flex-col items-center text-center group hover:border-[#72F1D1]/40 transition-all relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#72F1D1]/50 to-[#72F1D1]/10" />
          <div className="w-12 h-12 rounded-2xl bg-[#72F1D1]/10 text-emerald-500 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black text-slate-800 tracking-tight">{complaints.resolved}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Resolved</span>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className="flex-1 h-2.5 bg-slate-100 rounded-full flex overflow-hidden shadow-inner">
          <div style={{ width: `${(complaints.resolved/total)*100}%` }} className="h-full bg-[#72F1D1]" />
          <div style={{ width: `${(complaints.inProgress/total)*100}%` }} className="h-full bg-[#FFD166]" />
          <div style={{ width: `${(complaints.open/total)*100}%` }} className="h-full bg-[#FF7A7A]" />
        </div>
      </div>
    </SectionCard>
  );
}
