import { Eye, Clock, Users } from "lucide-react";
import type { VisitorHistoryRecord } from "../../../../services/visitor.service";
import { cn } from "@/lib/utils";

interface Props {
  records: VisitorHistoryRecord[];
  onViewDetails: (record: VisitorHistoryRecord) => void;
}

export function HistoryTable({ records, onViewDetails }: Props) {
  if (records.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <Users className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No History Found</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md">There are no visitor records matching your current filters. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Visitor</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Type & Purpose</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Visit Date</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Timings (Entry/Exit)</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Status</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-5">
                  <div className="flex items-center gap-4">
                    <img src={record.photoUrl} alt={record.visitorName} className="w-12 h-12 rounded-2xl bg-slate-100 object-cover shadow-sm border border-slate-200/50" />
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-800 tracking-wide">{record.visitorName}</span>
                      <span className="text-xs font-medium text-slate-500 mt-0.5">{record.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{record.type}</span>
                    <span className="text-xs font-medium text-slate-500 mt-0.5">{record.purpose}</span>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{record.visitDate}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{record.id}</span>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> {record.actualEntryTime || "Pending"}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {record.actualExitTime || "Inside"}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                    record.status === "COMPLETED" ? "bg-slate-100 text-slate-600 border-slate-200" : 
                    record.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    "bg-red-50 text-red-600 border-red-100"
                  )}>
                    {record.status}
                  </span>
                </td>
                <td className="px-4 py-5 text-right">
                  <button 
                    onClick={() => onViewDetails(record)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:border-[#8F7CFF] text-slate-600 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 rounded-xl text-sm font-bold shadow-sm transition-all"
                  >
                    <Eye className="w-4 h-4 mr-2" /> Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
        <span className="text-sm font-medium text-slate-500">Showing {records.length} records</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-400 rounded-xl text-sm font-bold shadow-sm disabled:opacity-50">Previous</button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-800 rounded-xl text-sm font-bold shadow-sm">Next</button>
        </div>
      </div>
    </div>
  );
}
