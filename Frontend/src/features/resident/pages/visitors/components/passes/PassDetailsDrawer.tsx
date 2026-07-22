import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Download, Share2, Calendar, Clock, Car, FileText, CheckCircle2 } from "lucide-react";
import type { VisitorPass } from "../../../../services/visitor.service";

interface Props {
  pass: VisitorPass | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PassDetailsDrawer({ pass, isOpen, onClose }: Props) {
  if (!pass) return null;

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
              <h2 className="text-lg font-heading font-black text-slate-800">Visitor Pass Details</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 flex flex-col items-center bg-slate-50 border-b border-slate-100">
              {/* QR Pass Card */}
              <div className="w-full max-w-[320px] bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col">
                <div className={`p-6 flex flex-col items-center text-center text-white relative ${
                  pass.status === "ACTIVE" ? "bg-[#3DD9FF]" : 
                  pass.status === "COMPLETED" ? "bg-emerald-500" :
                  pass.status === "EXPIRED" ? "bg-slate-400" : "bg-red-500"
                }`}>
                  <div className="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                    {pass.status}
                  </div>
                  <CheckCircle2 className="w-12 h-12 mb-3 text-white/90" />
                  <h4 className="text-xl font-black">{pass.visitorName}</h4>
                  <span className="text-sm font-medium opacity-90 mt-1">{pass.type} • {pass.purpose}</span>
                </div>

                <div className="p-8 flex flex-col items-center bg-slate-50 border-b border-slate-100 border-dashed">
                  <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center relative">
                     {pass.status !== "ACTIVE" && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center rounded-2xl z-10">
                           <span className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                              {pass.status}
                           </span>
                        </div>
                     )}
                    <QrCode className={`w-full h-full ${pass.status !== "ACTIVE" ? "text-slate-300" : "text-slate-800"}`} strokeWidth={1} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 tracking-[0.2em] mt-4 uppercase">
                    {pass.id}
                  </span>
                </div>

                <div className="p-6 flex items-center justify-between bg-white text-center">
                  <div className="flex flex-col items-center flex-1 border-r border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</span>
                    <span className="text-sm font-black text-slate-800 mt-0.5">{pass.visitDate}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</span>
                    <span className="text-sm font-black text-slate-800 mt-0.5">{pass.expectedTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-6">
              
              <div className="flex items-center gap-4">
                <button className="flex-1 py-3 bg-[#8F7CFF] hover:bg-[#7b68ee] text-white rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex-1 py-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visit Information</h4>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Vehicle Number</span>
                    <span className="text-sm font-bold text-slate-800">{pass.vehicleNumber || "No Vehicle"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Generated On</span>
                    <span className="text-sm font-bold text-slate-800">{new Date(pass.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Notes for Security</span>
                    <span className="text-sm font-bold text-slate-800">{pass.notes || "None provided"}</span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
