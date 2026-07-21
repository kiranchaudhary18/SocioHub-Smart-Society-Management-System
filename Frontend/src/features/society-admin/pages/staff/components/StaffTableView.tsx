import type { Staff } from "../../../services/staff.service";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Link } from "react-router-dom";
import { MoreVertical, Briefcase, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";

interface StaffTableViewProps {
  staffList: Staff[];
  isLoading: boolean;
}

export function StaffTableView({ staffList, isLoading }: StaffTableViewProps) {
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

  if (staffList.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60">
        <Briefcase className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-700">No Staff Found</h3>
        <p className="text-slate-500 mt-2">Adjust your search or filters.</p>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE": return "success";
      case "ON_LEAVE": return "warning";
      case "INACTIVE": return "danger";
      default: return "neutral";
    }
  };

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case "MAINTENANCE": return "text-[#3DD9FF] bg-[#3DD9FF]/10";
      case "HOUSEKEEPING": return "text-[#FFD166] bg-[#FFD166]/10";
      case "ADMINISTRATION": return "text-[#8F7CFF] bg-[#8F7CFF]/10";
      case "SECURITY": return "text-[#FF7A7A] bg-[#FF7A7A]/10";
      default: return "text-slate-500 bg-slate-100";
    }
  };

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <th className="px-6 py-5 whitespace-nowrap">Employee</th>
              <th className="px-6 py-5 whitespace-nowrap">Role & Dept</th>
              <th className="px-6 py-5 whitespace-nowrap">Contact</th>
              <th className="px-6 py-5 cursor-pointer hover:text-slate-700 group">
                <div className="flex items-center gap-2">
                  Shift
                  <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="px-6 py-5 whitespace-nowrap">Status</th>
              <th className="px-6 py-5 whitespace-nowrap">Joining Date</th>
              <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff, i) => (
              <motion.tr 
                key={staff.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group border-b border-slate-50 hover:bg-white transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img src={staff.photo || `https://ui-avatars.com/api/?name=${staff.firstName}+${staff.lastName}&background=f8fafc&color=94a3b8`} alt={staff.firstName} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <Link to={`/admin/staff/${staff.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors">
                        {staff.firstName} {staff.lastName}
                      </Link>
                      <span className="text-[10px] font-black tracking-wider text-slate-400 mt-0.5">{staff.id}</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-bold text-slate-700">{staff.role}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${getDepartmentColor(staff.department)}`}>
                      {staff.department}
                    </span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{staff.phone}</span>
                    {staff.email && <span className="text-xs text-slate-400">{staff.email}</span>}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {staff.shift.split('(')[0].trim()}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge variant={getStatusVariant(staff.status) as any}>
                    {staff.status.replace('_', ' ')}
                  </StatusBadge>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-slate-500">{staff.joiningDate}</span>
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
        <span className="text-sm font-bold text-slate-500">Showing {staffList.length} entries</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-400 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#8F7CFF] hover:text-[#8F7CFF] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
