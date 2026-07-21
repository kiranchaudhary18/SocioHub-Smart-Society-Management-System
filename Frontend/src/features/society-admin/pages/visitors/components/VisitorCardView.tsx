import { motion } from "framer-motion";
import type { Visitor } from "../../../services/visitor.service";
import { Clock, MapPin, Phone, UserSquare2, Eye, Check, X, ShieldAlert, Car, QrCode } from "lucide-react";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Link } from "react-router-dom";

interface VisitorCardViewProps {
  visitors: Visitor[];
  isLoading: boolean;
}

export function VisitorCardView({ visitors, isLoading }: VisitorCardViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white/40 rounded-3xl p-6 h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (visitors.length === 0) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60">
        <UserSquare2 className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-xl font-bold text-slate-700">No Visitors Found</h3>
        <p className="text-slate-500 mt-2">Adjust your filters to see more results.</p>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "APPROVED": return "success";
      case "INSIDE": return "info";
      case "PENDING": return "warning";
      case "REJECTED": return "danger";
      default: return "neutral";
    }
  };

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case "GUEST": return "bg-[#FF5DA2]/10 text-[#FF5DA2]";
      case "DELIVERY": return "bg-[#FFD166]/10 text-[#FFD166]";
      case "SERVICE": return "bg-[#3DD9FF]/10 text-[#3DD9FF]";
      case "CAB": return "bg-[#8F7CFF]/10 text-[#8F7CFF]";
      default: return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {visitors.map((visitor, i) => (
        <motion.div
          key={visitor.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[28px] p-6 flex flex-col relative group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-white transition-all overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-5 relative z-10">
            <div className="relative shrink-0">
              <img src={visitor.photo || `https://ui-avatars.com/api/?name=${visitor.firstName}+${visitor.lastName}&background=f8fafc&color=94a3b8`} alt={visitor.firstName} className="w-16 h-16 rounded-2xl shadow-sm ring-4 ring-white object-cover" />
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <Link to={`/admin/visitors/${visitor.id}`} className="text-lg font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors truncate">
                  {visitor.firstName} {visitor.lastName}
                </Link>
                {visitor.passId && (
                  <div className="w-6 h-6 rounded-full bg-[#72F1D1]/20 flex items-center justify-center shrink-0" title="Pass Issued">
                    <QrCode className="w-3.5 h-3.5 text-[#72F1D1]" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${getPurposeColor(visitor.purpose)}`}>
                  {visitor.purpose}
                </span>
                <StatusBadge variant={getStatusVariant(visitor.status) as any}>{visitor.status}</StatusBadge>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3 relative z-10 flex-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-[#8F7CFF] shrink-0" />
              <div className="flex flex-col">
                <span className="text-slate-800 font-bold">{visitor.residentName}</span>
                <span className="text-xs text-slate-500">{visitor.building} - Flat {visitor.flat}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium mt-1">
              <Clock className="w-4 h-4 text-[#FFD166] shrink-0" />
              <div className="flex flex-col">
                <span className="text-slate-800 font-bold">{visitor.expectedTime}</span>
                {visitor.checkInTime && <span className="text-xs text-slate-500">In: {visitor.checkInTime}</span>}
              </div>
            </div>

            {(visitor.phone || visitor.vehicleNumber) && (
              <div className="flex items-center gap-4 mt-2 pt-3 border-t border-slate-200/50">
                {visitor.phone && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {visitor.phone}
                  </div>
                )}
                {visitor.vehicleNumber && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Car className="w-3.5 h-3.5 text-slate-400" />
                    {visitor.vehicleNumber}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hover Overlay Actions */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex flex-col items-center justify-center gap-3 rounded-[28px] scale-95 group-hover:scale-100 shadow-inner">
            <div className="grid grid-cols-2 gap-3 w-[80%]">
              <Link to={`/admin/visitors/${visitor.id}`} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#8F7CFF]/10 text-[#8F7CFF] hover:bg-[#8F7CFF] hover:text-white transition-colors">
                <Eye className="w-5 h-5" />
                <span className="text-xs font-bold">View</span>
              </Link>
              
              {visitor.status === 'PENDING' ? (
                <>
                  <button className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#72F1D1]/10 text-[#14b8a6] hover:bg-[#72F1D1] hover:text-teal-900 transition-colors">
                    <Check className="w-5 h-5" />
                    <span className="text-xs font-bold">Approve</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#FF7A7A]/10 text-[#FF7A7A] hover:bg-[#FF7A7A] hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                    <span className="text-xs font-bold">Reject</span>
                  </button>
                </>
              ) : (
                <button className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-800 hover:text-white transition-colors">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="text-xs font-bold">Flag</span>
                </button>
              )}
            </div>
          </div>

        </motion.div>
      ))}
    </div>
  );
}
