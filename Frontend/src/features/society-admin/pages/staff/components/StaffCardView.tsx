import type { Staff } from "../../../services/staff.service";
import { Link } from "react-router-dom";
import { MoreVertical, Phone, Briefcase, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "../../../components/ui/StatusBadge";

interface StaffCardViewProps {
  staffList: Staff[];
  isLoading: boolean;
}

export function StaffCardView({ staffList, isLoading }: StaffCardViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-64 bg-slate-100/50 rounded-[32px] animate-pulse" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {staffList.map((staff, i) => (
        <motion.div
          key={staff.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-white transition-all group relative flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <StatusBadge variant={getStatusVariant(staff.status) as any}>{staff.status.replace('_', ' ')}</StatusBadge>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition-colors text-slate-400 group-hover:text-slate-600">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <img 
                src={staff.photo || `https://ui-avatars.com/api/?name=${staff.firstName}+${staff.lastName}&background=f1f5f9&color=64748b`} 
                alt={staff.firstName} 
                className="w-20 h-20 rounded-2xl object-cover shadow-sm border-4 border-white"
              />
              {staff.status === 'ACTIVE' && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#72F1D1] rounded-full border-4 border-white" title="Active" />
              )}
            </div>
            
            <Link to={`/admin/staff/${staff.id}`} className="text-lg font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors leading-tight mb-1">
              {staff.firstName} {staff.lastName}
            </Link>
            <span className="text-sm font-medium text-slate-500 mb-2">{staff.role}</span>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${getDepartmentColor(staff.department)}`}>
              {staff.department}
            </span>
          </div>

          {/* Info Details */}
          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-2xl border border-white">
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Shift</span>
                <span className="text-xs font-bold text-slate-700">{staff.shift.split('(')[0].trim()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pt-2 border-t border-slate-100/50">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Phone className="w-3.5 h-3.5" />
                {staff.phone}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                Since {staff.joiningDate.split(' ')[2]}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
