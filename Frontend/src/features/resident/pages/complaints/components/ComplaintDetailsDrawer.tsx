import { motion, AnimatePresence } from "framer-motion";
import { X, Download, MapPin, AlignLeft, CalendarClock, User, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import type { Complaint } from "../../../services/complaint.service";

interface Props {
  complaint: Complaint | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ComplaintDetailsDrawer({ complaint, isOpen, onClose }: Props) {
  if (!complaint) return null;

  const renderStatusIcon = (status: string) => {
    switch(status) {
      case "RESOLVED":
      case "CLOSED":
        return <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 className="w-6 h-6" /></div>;
      case "REJECTED":
        return <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-sm"><AlertCircle className="w-6 h-6" /></div>;
      default:
        return <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm"><MessageSquare className="w-6 h-6" /></div>;
    }
  };

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
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-slate-50 shadow-2xl z-50 flex flex-col border-l border-slate-200 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-6 flex items-center justify-between z-10 shadow-sm">
              <h2 className="text-lg font-heading font-black text-slate-800 flex items-center gap-2">
                Ticket Details
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title Section */}
            <div className="p-8 bg-white border-b border-slate-200 flex items-start gap-4">
              {renderStatusIcon(complaint.status)}
              <div className="flex flex-col gap-2 w-full">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full uppercase tracking-wider font-mono self-start">
                  {complaint.id}
                </span>
                <h3 className="text-xl font-heading font-black text-slate-800">{complaint.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">{complaint.category}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
                    complaint.priority === 'URGENT' ? 'bg-red-50 border-red-100 text-red-600' :
                    complaint.priority === 'HIGH' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                    'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>Priority: {complaint.priority}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md border uppercase tracking-wider ${
                    complaint.status === 'OPEN' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    complaint.status === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    complaint.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>{complaint.status}</span>
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-6">
              
              {/* Description */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <AlignLeft className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Description</h4>
                </div>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {complaint.description}
                </p>
                <div className="flex items-center gap-2 mt-2 pt-3 border-t border-slate-100 text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold">{complaint.location}</span>
                </div>
              </div>

              {/* Assignment & Resolution */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned To</span>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-[#8F7CFF]" />
                    <span className="text-sm font-bold text-slate-800">{complaint.assignedTo || "Unassigned"}</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expected Resolution</span>
                  <div className="flex items-center gap-2 mt-1">
                    <CalendarClock className="w-4 h-4 text-[#3DD9FF]" />
                    <span className="text-sm font-bold text-slate-800">
                      {complaint.expectedResolution ? new Date(complaint.expectedResolution).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : "Pending Review"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Society Response */}
              {complaint.societyResponse && (
                <div className="bg-[#8F7CFF]/5 p-5 rounded-2xl border border-[#8F7CFF]/20 flex flex-col gap-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#8F7CFF]/10 rounded-bl-[100px] pointer-events-none" />
                  <span className="text-xs font-bold text-[#8F7CFF] uppercase tracking-wider">Society Response</span>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed relative z-10">
                    {complaint.societyResponse}
                  </p>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Activity Timeline</h4>
                <div className="flex flex-col gap-6 relative">
                  <div className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-slate-100" />
                  
                  {complaint.timeline.map((item, idx) => (
                    <div key={item.id} className="flex gap-4 relative z-10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm mt-0.5 ${
                        idx === complaint.timeline.length - 1 ? 'bg-[#8F7CFF]' : 'bg-slate-300'
                      }`}>
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{item.description}</span>
                        <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-2 pb-6">
                <button className="w-full py-4 bg-white border border-slate-200 hover:border-[#8F7CFF] hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 text-slate-600 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Complaint Copy
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
