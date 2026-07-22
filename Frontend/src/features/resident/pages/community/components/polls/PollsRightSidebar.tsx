import { Users, BarChart3, TrendingUp } from "lucide-react";

export function PollsRightSidebar() {
  return (
    <div className="flex flex-col gap-6">
      
      <div className="bg-gradient-to-br from-[#3DD9FF] to-[#0A84FF] rounded-[32px] p-6 shadow-xl text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-center gap-2 relative z-10 mb-4">
          <TrendingUp className="w-5 h-5 text-white/80" />
          <span className="text-sm font-bold uppercase tracking-wider text-white/80">Community Voice</span>
        </div>
        <div className="relative z-10 flex flex-col gap-1">
          <h4 className="text-4xl font-heading font-black leading-tight">78%</h4>
          <span className="text-sm font-medium text-white/90">Average participation rate in recent polls. Your voice shapes our community!</span>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <BarChart3 className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Quick Stats</h4>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Voters</span>
              <span className="text-sm font-black text-slate-800">420 Residents</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
