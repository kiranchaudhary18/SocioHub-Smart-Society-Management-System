import { motion } from "framer-motion";
import type { Resident } from "../../../services/resident.service";
import { Building2, Mail, Phone, Users, Car, Eye, Edit2, History, Ban, MoreVertical } from "lucide-react";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Link } from "react-router-dom";

interface ResidentCardViewProps {
  residents: Resident[];
  isLoading: boolean;
}

export function ResidentCardView({ residents, isLoading }: ResidentCardViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-white/40 rounded-3xl p-6 h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (residents.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60">
        <Users className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-700">No Residents Found</h3>
        <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {residents.map((resident, i) => (
        <motion.div
          key={resident.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-6 flex flex-col relative group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-white transition-all overflow-hidden"
        >
          {/* Top colored strip based on type */}
          <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${resident.type === 'OWNER' ? 'from-[#3DD9FF] to-[#3DD9FF]/50' : 'from-[#8F7CFF] to-[#8F7CFF]/50'}`} />

          {/* Header (Avatar + Name) */}
          <div className="flex items-start gap-4 mb-5 relative z-10 pt-2">
            <div className="relative">
              <img src={resident.avatar || `https://ui-avatars.com/api/?name=${resident.firstName}+${resident.lastName}&background=f1f5f9&color=64748b`} alt={resident.firstName} className="w-14 h-14 rounded-full shadow-sm ring-4 ring-white object-cover" />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${resident.status === 'ACTIVE' ? 'bg-[#72F1D1]' : resident.status === 'PENDING' ? 'bg-[#FFD166]' : 'bg-slate-300'}`} />
            </div>
            
            <div className="flex flex-col flex-1">
              <Link to={`/admin/residents/${resident.id}`} className="text-lg font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors leading-tight line-clamp-1">
                {resident.firstName} {resident.lastName}
              </Link>
              <div className="flex items-center gap-2 mt-1.5">
                <StatusBadge 
                  variant={resident.type === 'OWNER' ? 'info' : 'success'}
                >
                  {resident.type}
                </StatusBadge>
              </div>
            </div>

            {/* Quick Actions Dropdown Trigger (Visual Only for now) */}
            <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors shrink-0">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3 relative z-10 flex-1">
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50/50 p-2 rounded-xl">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{resident.building} - Flat {resident.flat}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium px-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{resident.phone}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium px-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{resident.email}</span>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500" title="Family Members">
                <Users className="w-4 h-4 text-[#FF7A7A]" />
                <span>{resident.familyMembersCount}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500" title="Vehicles">
                <Car className="w-4 h-4 text-[#FFD166]" />
                <span>{resident.vehiclesCount}</span>
              </div>
            </div>
            
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              IN: {resident.moveInDate.split(',')[0]}
            </span>
          </div>

          {/* Hover Overlay Actions */}
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex flex-col items-center justify-center gap-3 rounded-3xl scale-95 group-hover:scale-100 shadow-inner">
            <div className="grid grid-cols-2 gap-3 w-3/4">
              <Link to={`/admin/residents/${resident.id}`} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#8F7CFF]/10 text-[#8F7CFF] hover:bg-[#8F7CFF] hover:text-white transition-colors">
                <Eye className="w-5 h-5" />
                <span className="text-xs font-bold">View</span>
              </Link>
              <button className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#3DD9FF]/10 text-[#3DD9FF] hover:bg-[#3DD9FF] hover:text-white transition-colors">
                <Edit2 className="w-5 h-5" />
                <span className="text-xs font-bold">Edit</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-800 hover:text-white transition-colors">
                <History className="w-5 h-5" />
                <span className="text-xs font-bold">History</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#FF7A7A]/10 text-[#FF7A7A] hover:bg-[#FF7A7A] hover:text-white transition-colors">
                <Ban className="w-5 h-5" />
                <span className="text-xs font-bold">Block</span>
              </button>
            </div>
          </div>

        </motion.div>
      ))}
    </div>
  );
}
