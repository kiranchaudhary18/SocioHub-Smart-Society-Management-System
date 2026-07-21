import { motion } from "framer-motion";
import { CheckCircle, XCircle, ExternalLink, ShieldAlert } from "lucide-react";
import { usePendingApprovals } from "../../hooks/useDashboardData";
import { formatDistanceToNow } from "date-fns";

export function PendingApprovals() {
  const { data: approvals, isLoading } = usePendingApprovals();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
    >
      <div className="p-6 sm:p-8 border-b border-white/40 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-heading font-extrabold text-slate-800 flex items-center gap-2">
            Pending Approvals
            <span className="flex items-center justify-center bg-[#FF5DA2]/10 text-[#FF5DA2] text-xs px-2 py-0.5 rounded-full font-bold">
              {approvals?.length || 0}
            </span>
          </h3>
          <p className="text-sm font-medium text-slate-500 mt-1">Review and approve new society registrations</p>
        </div>
        <button className="text-sm font-bold text-[#8F7CFF] hover:text-[#8F7CFF]/80 transition-colors">
          View All
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Society</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Secretary</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">City</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Created</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/40">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 w-32 bg-slate-200 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-200 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-20 bg-slate-200 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-16 bg-slate-200 rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-20 bg-slate-200 rounded ml-auto"></div></td>
                </tr>
              ))
            ) : approvals?.map((item) => (
              <tr key={item.id} className="hover:bg-white/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{item.societyName}</div>
                  <div className="text-xs text-slate-400 font-medium">{item.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-600">{item.secretary.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                    {item.city}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-500">
                    {formatDistanceToNow(new Date(item.created), { addSuffix: true })}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#3DD9FF] hover:shadow-md transition-all tooltip-trigger" title="View Details">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FF7A7A] hover:shadow-md transition-all tooltip-trigger" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#72F1D1] hover:shadow-md transition-all tooltip-trigger" title="Approve">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {approvals?.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-slate-300" />
            </div>
            <h4 className="text-lg font-bold text-slate-700">No pending approvals</h4>
            <p className="text-slate-500 font-medium mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
