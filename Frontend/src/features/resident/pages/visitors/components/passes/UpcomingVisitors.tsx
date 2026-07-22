import { Clock, UserCircle2 } from "lucide-react";
import type { VisitorPass } from "../../../../services/visitor.service";

interface Props {
  visitors: VisitorPass[];
}

export function UpcomingVisitors({ visitors }: Props) {
  if (visitors.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No Upcoming Visitors</h3>
        <p className="text-sm font-medium text-slate-500">You don't have any visitors scheduled for today.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#3DD9FF]/10 text-[#00a3cc] flex items-center justify-center">
          <Clock className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-heading font-black text-slate-800 tracking-tight">Upcoming Today</h3>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-between group hover:border-[#3DD9FF]/30 transition-colors cursor-default">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                <UserCircle2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-800">{visitor.visitorName}</span>
                <span className="text-xs font-medium text-slate-500">{visitor.type} • {visitor.purpose}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-amber-100">
                Expected
              </span>
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {visitor.expectedTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
