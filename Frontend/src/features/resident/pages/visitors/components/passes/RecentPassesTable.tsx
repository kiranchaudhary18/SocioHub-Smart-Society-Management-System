import { Eye, History, QrCode } from "lucide-react";
import type { VisitorPass } from "../../../../services/visitor.service";
import { cn } from "@/lib/utils";

interface Props {
  passes: VisitorPass[];
  onView: (pass: VisitorPass) => void;
}

export function RecentPassesTable({ passes, onView }: Props) {
  if (passes.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <History className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No Recent Passes</h3>
        <p className="text-sm font-medium text-slate-500">You haven't generated any visitor passes recently.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
          <History className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Recent Passes</h3>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Pass ID</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Visitor</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Type & Purpose</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Visit Date</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {passes.map((pass) => (
              <tr key={pass.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-4">
                  <span className="text-sm font-black text-slate-700 tracking-wide bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/50">
                    {pass.id}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{pass.visitorName}</span>
                    <span className="text-xs font-medium text-slate-500">{pass.phone}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{pass.type}</span>
                    <span className="text-xs font-medium text-slate-500">{pass.purpose}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{pass.visitDate}</span>
                    <span className="text-xs font-medium text-slate-500">{pass.expectedTime}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                    pass.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                    pass.status === "COMPLETED" ? "bg-blue-50 text-blue-600 border-blue-100" :
                    pass.status === "EXPIRED" ? "bg-slate-50 text-slate-600 border-slate-200" :
                    "bg-red-50 text-red-600 border-red-100"
                  )}>
                    {pass.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button 
                    onClick={() => onView(pass)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:border-[#8F7CFF] text-slate-600 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 rounded-xl text-sm font-bold shadow-sm transition-all"
                  >
                    <QrCode className="w-4 h-4 mr-2" /> View Pass
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
