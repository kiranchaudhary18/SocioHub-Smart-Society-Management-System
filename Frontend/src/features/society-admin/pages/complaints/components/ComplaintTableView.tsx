import type { Complaint } from "../../../services/complaint.service";
import { Link } from "react-router-dom";
import { MoreVertical, ArrowUpDown, Wrench, Droplets, Zap, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "../../../components/ui/StatusBadge";

interface ComplaintTableViewProps {
  complaints: Complaint[];
  isLoading: boolean;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "PLUMBING": return <Droplets className="w-3.5 h-3.5" />;
    case "ELECTRICAL": return <Zap className="w-3.5 h-3.5" />;
    case "CARPENTRY": return <Wrench className="w-3.5 h-3.5" />;
    case "CLEANING": return <Sparkles className="w-3.5 h-3.5" />;
    case "SECURITY": return <Shield className="w-3.5 h-3.5" />;
    default: return <Wrench className="w-3.5 h-3.5" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "URGENT": return "text-[#FF7A7A] bg-[#FF7A7A]/10 border-[#FF7A7A]/20";
    case "HIGH": return "text-[#FFD166] bg-[#FFD166]/10 border-[#FFD166]/20";
    case "MEDIUM": return "text-[#3DD9FF] bg-[#3DD9FF]/10 border-[#3DD9FF]/20";
    case "LOW": return "text-slate-500 bg-slate-100 border-slate-200";
    default: return "text-slate-500 bg-slate-100 border-slate-200";
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "NEW": return "danger";
    case "ASSIGNED": return "warning";
    case "IN_PROGRESS": return "info";
    case "WAITING": return "neutral";
    case "RESOLVED": return "success";
    case "CLOSED": return "neutral";
    default: return "neutral";
  }
};

export function ComplaintTableView({ complaints, isLoading }: ComplaintTableViewProps) {
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

  if (complaints.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60">
        <h3 className="text-xl font-bold text-slate-700">No Complaints Found</h3>
        <p className="text-slate-500 mt-2">Adjust your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <th className="px-6 py-5 whitespace-nowrap">ID & Title</th>
              <th className="px-6 py-5 whitespace-nowrap">Resident</th>
              <th className="px-6 py-5 whitespace-nowrap">Category</th>
              <th className="px-6 py-5 cursor-pointer hover:text-slate-700 group">
                <div className="flex items-center gap-2">
                  Priority
                  <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="px-6 py-5 whitespace-nowrap">Status</th>
              <th className="px-6 py-5 whitespace-nowrap">Assigned To</th>
              <th className="px-6 py-5 whitespace-nowrap">Created</th>
              <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, i) => (
              <motion.tr 
                key={complaint.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group border-b border-slate-50 hover:bg-white transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col max-w-[250px]">
                    <span className="text-[10px] font-black text-slate-400 mb-0.5">{complaint.id}</span>
                    <Link to={`/admin/complaints/${complaint.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors truncate">
                      {complaint.title}
                    </Link>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">{complaint.residentName}</span>
                    <span className="text-xs font-bold text-slate-400">{complaint.building} - Flat {complaint.flat}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-600">
                    {getCategoryIcon(complaint.category)}
                    {complaint.category}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge variant={getStatusVariant(complaint.status) as any}>
                    {complaint.status.replace('_', ' ')}
                  </StatusBadge>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {complaint.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <img 
                        src={complaint.assignedStaffAvatar || `https://ui-avatars.com/api/?name=${complaint.assignedTo}&background=f1f5f9&color=64748b`} 
                        alt="Staff" 
                        className="w-6 h-6 rounded-full border border-slate-200"
                      />
                      <span className="text-sm font-bold text-slate-600">{complaint.assignedTo.split(' ')[0]}</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 italic">Unassigned</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-500">{complaint.createdAt}</span>
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
        <span className="text-sm font-bold text-slate-500">Showing {complaints.length} entries</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-400 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#8F7CFF] hover:text-[#8F7CFF] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
