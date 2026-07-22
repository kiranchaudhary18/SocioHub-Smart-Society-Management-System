import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Car, ShieldCheck, QrCode, FileText } from "lucide-react";
import type { VisitorHistoryRecord } from "../../../../services/visitor.service";

interface Props {
  record: VisitorHistoryRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryDetailsDrawer({ record, isOpen, onClose }: Props) {
  if (!record) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <h2 className="text-lg font-heading font-black text-slate-800">Visit Details</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Hero */}
            <div className="p-8 flex flex-col items-center border-b border-slate-50 bg-slate-50/50">
              <img src={record.photoUrl} alt={record.visitorName} className="w-24 h-24 rounded-3xl object-cover shadow-md border-2 border-white mb-4 bg-white" />
              <h3 className="text-2xl font-black text-slate-800">{record.visitorName}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full">{record.type}</span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                  record.status === "COMPLETED" ? "bg-slate-200 text-slate-700" : 
                  record.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {record.status}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Log Details</h4>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Actual Entry</span>
                    <span className="text-sm font-bold text-slate-800">{record.visitDate}, {record.actualEntryTime || "Pending"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Actual Exit</span>
                    <span className="text-sm font-bold text-slate-800">{record.actualExitTime ? `${record.visitDate}, ${record.actualExitTime}` : "Inside"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Vehicle Registered</span>
                    <span className="text-sm font-bold text-slate-800">{record.vehicleNumber || "No Vehicle"}</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security & Verification</h4>

                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    record.securityVerification === "VERIFIED" ? "bg-emerald-50 text-emerald-500" :
                    record.securityVerification === "PENDING" ? "bg-amber-50 text-amber-500" :
                    "bg-red-50 text-red-500"
                  }`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Gate Verification</span>
                    <span className="text-sm font-bold text-slate-800">{record.securityVerification}</span>
                  </div>
                </div>

                {record.passId && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400">Pass Used</span>
                      <span className="text-sm font-bold text-slate-800">{record.passId}</span>
                    </div>
                  </div>
                )}
              </div>

              {record.residentNotes && (
                <div className="mt-2 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl flex items-start gap-3">
                  <FileText className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1 block">Security Notes</span>
                    <p className="text-sm font-medium text-amber-900 leading-relaxed">{record.residentNotes}</p>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
