import type { Visitor } from "../../../services/visitor.service";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Link } from "react-router-dom";
import { MoreVertical, UserSquare2, ArrowUpDown, QrCode } from "lucide-react";
import { motion } from "framer-motion";

interface VisitorTableViewProps {
  visitors: Visitor[];
  isLoading: boolean;
}

export function VisitorTableView({ visitors, isLoading }: VisitorTableViewProps) {
  if (isLoading) {
    return (
      <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden p-6 animate-pulse">
        <div className="h-12 bg-slate-100/50 rounded-2xl mb-4" />
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-16 bg-slate-100/30 rounded-2xl mb-2" />
        ))}
      </div>
    );
  }

  if (visitors.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60">
        <UserSquare2 className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-700">No Visitors Found</h3>
        <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "APPROVED": return "success";
      case "INSIDE": return "info";
      case "PENDING": return "warning";
      case "REJECTED": return "danger";
      default: return "neutral";
    }
  };

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case "GUEST": return "text-[#FF5DA2]";
      case "DELIVERY": return "text-[#FFD166]";
      case "SERVICE": return "text-[#3DD9FF]";
      case "CAB": return "text-[#8F7CFF]";
      default: return "text-slate-500";
    }
  };

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <th className="px-6 py-5 whitespace-nowrap">Visitor</th>
              <th className="px-6 py-5 cursor-pointer hover:text-slate-700 group">
                <div className="flex items-center gap-2">
                  Visiting
                  <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="px-6 py-5 whitespace-nowrap">Purpose</th>
              <th className="px-6 py-5 whitespace-nowrap">Time</th>
              <th className="px-6 py-5 whitespace-nowrap">Status</th>
              <th className="px-6 py-5 whitespace-nowrap">Pass</th>
              <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, i) => (
              <motion.tr 
                key={visitor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group border-b border-slate-50 hover:bg-white transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img src={visitor.photo || `https://ui-avatars.com/api/?name=${visitor.firstName}+${visitor.lastName}&background=f8fafc&color=94a3b8`} alt={visitor.firstName} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <Link to={`/admin/visitors/${visitor.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors">
                        {visitor.firstName} {visitor.lastName}
                      </Link>
                      <span className="text-xs font-medium text-slate-500 mt-0.5">{visitor.phone}</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">{visitor.residentName}</span>
                    <span className="text-xs font-bold text-slate-400">{visitor.building} - Flat {visitor.flat}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-xs font-black tracking-wider uppercase ${getPurposeColor(visitor.purpose)}`}>
                    {visitor.purpose}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-slate-700">{visitor.expectedTime}</span>
                    {visitor.checkInTime && <span className="text-xs text-slate-400">In: {visitor.checkInTime}</span>}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge variant={getStatusVariant(visitor.status) as any}>
                    {visitor.status}
                  </StatusBadge>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {visitor.passId ? (
                    <div className="w-8 h-8 rounded-lg bg-[#72F1D1]/10 flex items-center justify-center border border-[#72F1D1]/20" title={`Pass: ${visitor.passId}`}>
                      <QrCode className="w-4 h-4 text-emerald-600" />
                    </div>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 inline-flex items-center justify-center text-slate-400 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white/30">
        <span className="text-sm font-bold text-slate-500">Showing 1 to {visitors.length} of {visitors.length} entries</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-400 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#8F7CFF] hover:text-[#8F7CFF] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
