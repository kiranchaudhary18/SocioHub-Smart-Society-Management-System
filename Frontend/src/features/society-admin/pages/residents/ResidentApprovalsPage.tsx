import { useState, useEffect } from "react";
import type { ApprovalRequest } from "../../services/resident.service";
import { residentService } from "../../services/resident.service";

import { StatusBadge } from "../../components/ui/StatusBadge";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, FileText, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResidentApprovalsPage() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    residentService.getApprovalRequests().then(data => {
      setApprovals(data);
      setIsLoading(false);
    });
  }, []);

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
    // TODO: Add actual API call
  };

  const handleReject = (id: string) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
    // TODO: Add actual API call
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <Link to="/admin/residents" className="text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2 mb-2 w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Residents
          </Link>
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight flex items-center gap-3">
            Approval Requests
            <span className="bg-[#FFD166]/20 text-[#FFD166] text-sm px-3 py-1 rounded-full">{approvals.length} Pending</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Review and manage new resident registrations.</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
        
        {isLoading ? (
          <div className="p-6 animate-pulse flex flex-col gap-4">
            <div className="h-24 bg-slate-100 rounded-2xl" />
            <div className="h-24 bg-slate-100 rounded-2xl" />
          </div>
        ) : approvals.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-[#72F1D1]" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">All Caught Up!</h3>
            <p className="text-slate-500 mt-2">There are no pending approval requests at the moment.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-slate-100/50">
            <AnimatePresence>
              {approvals.map((req, i) => (
                <motion.div 
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 hover:bg-white/50 transition-colors"
                >
                  
                  {/* Info */}
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8F7CFF]/10 to-[#3DD9FF]/10 flex items-center justify-center border border-white shadow-sm shrink-0">
                      <UserPlus className="w-6 h-6 text-[#8F7CFF]" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-slate-800">{req.firstName} {req.lastName}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <StatusBadge variant={req.type === 'OWNER' ? 'info' : 'success'}>{req.type}</StatusBadge>
                        <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {req.building} - Flat {req.flat}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-wider">
                        Requested on {req.requestDate}
                      </span>
                    </div>
                  </div>

                  {/* Documents & Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 xl:gap-10 border-t xl:border-t-0 border-slate-100 pt-4 xl:pt-0">
                    
                    {/* Docs */}
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted Documents</span>
                      <div className="flex flex-wrap gap-2">
                        {req.documents.map((doc, idx) => (
                          <a key={idx} href={doc.url} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-[#3DD9FF] hover:text-[#3DD9FF] transition-colors shadow-sm">
                            <FileText className="w-3.5 h-3.5" />
                            {doc.name}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                      <button 
                        onClick={() => handleReject(req.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-[#FF7A7A] hover:bg-[#FF7A7A] hover:text-white hover:border-[#FF7A7A] font-bold text-sm transition-all shadow-sm"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                      <button 
                        onClick={() => handleApprove(req.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#72F1D1] text-emerald-900 hover:bg-emerald-400 font-bold text-sm transition-all shadow-sm"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                    </div>

                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
