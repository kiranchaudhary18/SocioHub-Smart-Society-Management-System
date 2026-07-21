import { motion } from "framer-motion";
import { Search, Filter, Plus, MoreVertical, Building2, Users, CreditCard } from "lucide-react";
import { useSocieties } from "../hooks/useSocieties";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function AllSocietiesPage() {
  const { data: societies, isLoading } = useSocieties();

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
            All Societies
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Manage all onboarded societies on the platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/super-admin/societies/create" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#72F1D1] to-[#3DD9FF] hover:opacity-90 transition-opacity text-sm font-bold text-slate-900 shadow-lg shadow-[#72F1D1]/30"
          >
            <Plus className="w-4 h-4" />
            Add Society
          </Link>
        </div>
      </motion.div>

      {/* Filters Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[24px] p-4 mb-6 flex flex-col md:flex-row gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search societies..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 focus:outline-none focus:ring-4 focus:ring-[#8F7CFF]/10 focus:border-[#8F7CFF]/40 text-sm font-medium transition-all"
          />
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 hover:bg-white transition-colors text-sm font-bold text-slate-700">
            Status: All
          </button>
        </div>
      </motion.div>

      {/* Grid View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {isLoading ? (
          [1,2,3,4,5,6].map(i => <div key={i} className="h-[280px] bg-white/40 backdrop-blur-md rounded-[32px] animate-pulse" />)
        ) : (
          societies?.map((society) => (
            <div key={society.id} className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(143,124,255,0.08)] transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8F7CFF]/10 to-[#3DD9FF]/10 border border-[#8F7CFF]/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#8F7CFF]" />
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <Link to={`/super-admin/societies/${society.id}`} className="text-xl font-heading font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors line-clamp-1 mb-1">
                  {society.name}
                </Link>
                <p className="text-sm font-medium text-slate-500">{society.location}</p>
              </div>

              <div className="mb-6">
                <div className="bg-white/50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Residents</span>
                  </div>
                  <p className="text-lg font-bold text-slate-700">{society.residentsCount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    society.status === 'Active' ? 'bg-[#72F1D1]/20 text-teal-700' :
                    society.status === 'Suspended' ? 'bg-[#FF7A7A]/10 text-[#FF7A7A]' :
                    'bg-[#FFD166]/20 text-[#D49F1C]'
                  }`}>
                    {society.status}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-400">
                  Since {format(new Date(society.joinDate), "MMM yyyy")}
                </span>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}
