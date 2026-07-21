import type { Resident } from "../../../services/resident.service";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Link } from "react-router-dom";
import { MoreVertical, Users, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";

interface ResidentTableViewProps {
  residents: Resident[];
  isLoading: boolean;
}

export function ResidentTableView({ residents, isLoading }: ResidentTableViewProps) {
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
    <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <th className="px-6 py-5 whitespace-nowrap">Resident</th>
              <th className="px-6 py-5 cursor-pointer hover:text-slate-700 group">
                <div className="flex items-center gap-2">
                  Building & Flat
                  <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </th>
              <th className="px-6 py-5">Contact Info</th>
              <th className="px-6 py-5">Type</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident, i) => (
              <motion.tr 
                key={resident.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group border-b border-slate-50 hover:bg-white transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img src={resident.avatar || `https://ui-avatars.com/api/?name=${resident.firstName}+${resident.lastName}&background=f1f5f9&color=64748b`} alt={resident.firstName} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                    <div className="flex flex-col">
                      <Link to={`/admin/residents/${resident.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors">
                        {resident.firstName} {resident.lastName}
                      </Link>
                      <span className="text-xs font-medium text-slate-500 mt-0.5">Moved in {resident.moveInDate}</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">{resident.building}</span>
                    <span className="text-xs font-bold text-slate-400">Flat {resident.flat}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-slate-600">{resident.phone}</span>
                    <span className="text-xs text-slate-400">{resident.email}</span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge 
                    variant={resident.type === 'OWNER' ? 'info' : 'success'}
                  >
                    {resident.type}
                  </StatusBadge>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge 
                    variant={resident.status === 'ACTIVE' ? 'success' : resident.status === 'PENDING' ? 'warning' : 'neutral'}
                  >
                    {resident.status}
                  </StatusBadge>
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
        <span className="text-sm font-bold text-slate-500">Showing 1 to {residents.length} of {residents.length} entries</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-400 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:border-[#8F7CFF] hover:text-[#8F7CFF] transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
