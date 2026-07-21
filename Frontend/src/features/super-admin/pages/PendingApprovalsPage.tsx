import { motion } from "framer-motion";
import { Search, Filter, CheckCircle, XCircle, FileText, Download, Building2, User } from "lucide-react";
import { usePendingApprovals } from "../hooks/useDashboardData";
import { format } from "date-fns";

export default function PendingApprovalsPage() {
  const { data: approvals, isLoading } = usePendingApprovals();

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
            Pending Approvals
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Review and manage new society registrations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white transition-colors text-sm font-bold text-slate-700">
            <Download className="w-4 h-4 text-[#8F7CFF]" />
            Export
          </button>
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
            placeholder="Search societies by name, city, or secretary..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 focus:outline-none focus:ring-4 focus:ring-[#8F7CFF]/10 focus:border-[#8F7CFF]/40 text-sm font-medium transition-all"
          />
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 hover:bg-white transition-colors text-sm font-bold text-slate-700 whitespace-nowrap">
            <Filter className="w-4 h-4 text-slate-400" />
            Status: All
          </button>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 hover:bg-white transition-colors text-sm font-bold text-slate-700 whitespace-nowrap">
            City: All
          </button>
        </div>
      </motion.div>

      {/* Approvals List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-6"
      >
        {isLoading ? (
          [1,2,3].map(i => <div key={i} className="h-64 bg-white/40 backdrop-blur-md rounded-[32px] animate-pulse" />)
        ) : (
          approvals?.map((item) => (
            <div key={item.id} className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(143,124,255,0.08)] transition-all duration-300">
              
              <div className="flex flex-col xl:flex-row gap-8">
                {/* Left Col: Society & Sec Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8F7CFF]/20 to-[#3DD9FF]/20 flex items-center justify-center shrink-0">
                      <Building2 className="w-8 h-8 text-[#8F7CFF]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">{item.societyName}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{item.id}</span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          item.status === 'Pending' ? 'bg-[#FFD166]/20 text-[#D49F1C]' : 'bg-[#3DD9FF]/20 text-[#00A1C9]'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          Applied: {format(new Date(item.created), "MMM do, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/40 rounded-2xl p-4 border border-white">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" /> Secretary Details
                      </h4>
                      <div className="flex items-center gap-3">
                        <img src={item.secretary.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-slate-100" />
                        <div>
                          <p className="text-sm font-bold text-slate-700">{item.secretary.name}</p>
                          <p className="text-xs font-medium text-slate-500">{item.secretary.email}</p>
                          <p className="text-xs font-medium text-slate-500">{item.secretary.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/40 rounded-2xl p-4 border border-white">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Property Details</h4>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-700">{item.location.city}, {item.location.state}</p>
                        <p className="text-xs font-medium text-slate-500 leading-snug">{item.location.address}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs font-medium text-slate-500">{item.details.totalFlats} Flats • {item.details.blocks} Blocks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Col: Documents & Actions */}
                <div className="w-full xl:w-[320px] shrink-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Required Documents
                    </h4>
                    <div className="space-y-2 mb-6">
                      {item.documents.map((doc, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/40 px-3 py-2 rounded-xl border border-white">
                          <span className="text-xs font-medium text-slate-600 truncate mr-2">{doc.name}</span>
                          {doc.status === 'Verified' ? (
                            <CheckCircle className="w-4 h-4 text-[#72F1D1] shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-[#FFD166] border-t-transparent animate-spin shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="w-full bg-[#72F1D1] hover:bg-[#5FE0C0] text-slate-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#72F1D1]/30 flex justify-center items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Approve Society
                    </button>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2.5 rounded-xl transition-all flex justify-center items-center gap-2 text-sm">
                        Request Changes
                      </button>
                      <button className="flex-1 bg-[#FF7A7A]/10 hover:bg-[#FF7A7A]/20 text-[#FF7A7A] font-bold py-2.5 rounded-xl transition-all flex justify-center items-center gap-2 text-sm">
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}
