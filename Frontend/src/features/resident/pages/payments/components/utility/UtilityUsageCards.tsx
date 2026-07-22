import { Droplets, Zap, Flame, TrendingDown, TrendingUp } from "lucide-react";

export function UtilityUsageCards() {
  return (
    <div className="flex flex-col xl:flex-row gap-6 w-full">
      {/* Water Usage */}
      <div className="flex-1 bg-white/60 backdrop-blur-xl border border-[#3DD9FF]/30 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3DD9FF]/10 text-[#3DD9FF] flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Water Usage</h4>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> 12%
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-heading font-black text-slate-800 tracking-tight">15,000</span>
          <span className="text-sm font-medium text-slate-500 mb-1">Liters</span>
        </div>
        
        {/* Mini Chart visualization (CSS based) */}
        <div className="flex items-end gap-1.5 h-12 mt-6">
          <div className="flex-1 bg-[#3DD9FF]/20 rounded-t-md h-[60%]" />
          <div className="flex-1 bg-[#3DD9FF]/20 rounded-t-md h-[80%]" />
          <div className="flex-1 bg-[#3DD9FF]/20 rounded-t-md h-[40%]" />
          <div className="flex-1 bg-[#3DD9FF]/20 rounded-t-md h-[90%]" />
          <div className="flex-1 bg-[#3DD9FF]/80 rounded-t-md h-[50%]" /> {/* Current Month */}
        </div>
      </div>

      {/* Electricity Usage */}
      <div className="flex-1 bg-white/60 backdrop-blur-xl border border-[#FFD166]/30 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD166]/10 text-amber-500 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Electricity</h4>
          </div>
          <span className="px-2.5 py-1 bg-red-50 text-red-500 text-xs font-bold rounded-lg flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 5%
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-heading font-black text-slate-800 tracking-tight">250</span>
          <span className="text-sm font-medium text-slate-500 mb-1">kWh</span>
        </div>
        
        <div className="flex items-end gap-1.5 h-12 mt-6">
          <div className="flex-1 bg-[#FFD166]/20 rounded-t-md h-[70%]" />
          <div className="flex-1 bg-[#FFD166]/20 rounded-t-md h-[60%]" />
          <div className="flex-1 bg-[#FFD166]/20 rounded-t-md h-[75%]" />
          <div className="flex-1 bg-[#FFD166]/20 rounded-t-md h-[85%]" />
          <div className="flex-1 bg-amber-400 rounded-t-md h-[90%]" />
        </div>
      </div>

      {/* Gas Usage */}
      <div className="flex-1 bg-white/60 backdrop-blur-xl border border-[#FF7A7A]/30 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF7A7A]/10 text-red-500 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Piped Gas</h4>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> 2%
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-heading font-black text-slate-800 tracking-tight">12</span>
          <span className="text-sm font-medium text-slate-500 mb-1">SCM</span>
        </div>
        
        <div className="flex items-end gap-1.5 h-12 mt-6">
          <div className="flex-1 bg-[#FF7A7A]/20 rounded-t-md h-[80%]" />
          <div className="flex-1 bg-[#FF7A7A]/20 rounded-t-md h-[85%]" />
          <div className="flex-1 bg-[#FF7A7A]/20 rounded-t-md h-[70%]" />
          <div className="flex-1 bg-[#FF7A7A]/20 rounded-t-md h-[75%]" />
          <div className="flex-1 bg-red-400 rounded-t-md h-[65%]" />
        </div>
      </div>

    </div>
  );
}
