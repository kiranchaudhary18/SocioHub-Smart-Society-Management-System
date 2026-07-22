import { BarChart3 } from "lucide-react";

export function UtilityAnalyticsCharts() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const data = [45, 52, 38, 65, 48, 55, 60];

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-heading font-black text-slate-800 tracking-tight">Consumption Trends</h3>
        </div>
        <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none focus:border-[#8F7CFF] cursor-pointer">
          <option>Last 6 Months</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="flex-1 flex items-end gap-2 sm:gap-4 mt-auto">
        {data.map((val, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-3 group">
            <div className="w-full relative flex items-end justify-center h-48 bg-slate-50/50 rounded-t-xl border-x border-t border-slate-100/50 overflow-hidden">
              {/* Tooltip on hover */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none">
                {val}%
              </div>
              <div 
                className={`w-full transition-all duration-500 ease-out rounded-t-lg ${idx === data.length - 1 ? 'bg-gradient-to-t from-[#8F7CFF] to-[#3DD9FF]' : 'bg-slate-200 group-hover:bg-slate-300'}`}
                style={{ height: `${val}%` }}
              />
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${idx === data.length - 1 ? 'text-[#8F7CFF]' : 'text-slate-400'}`}>
              {months[idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
