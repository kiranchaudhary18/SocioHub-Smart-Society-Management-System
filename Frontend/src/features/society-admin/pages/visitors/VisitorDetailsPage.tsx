import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { visitorService } from "../../services/visitor.service";
import type { Visitor } from "../../services/visitor.service";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  ArrowLeft, Phone, Building2, Clock, Car, QrCode, 
  ShieldAlert, History, Check, X, LogIn, LogOut, Printer
} from "lucide-react";
export default function VisitorDetailsPage() {
  const { visitorId } = useParams<{ visitorId: string }>();
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (visitorId) {
      visitorService.getVisitor(visitorId).then(data => {
        if (data) setVisitor(data);
        setIsLoading(false);
      });
    }
  }, [visitorId]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 animate-pulse">
        <div className="h-64 bg-slate-100 rounded-[32px] w-full" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="h-96 bg-slate-100 rounded-[32px] xl:col-span-2" />
          <div className="h-96 bg-slate-100 rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (!visitor) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Visitor Not Found</h2>
        <Link to="/admin/visitors" className="mt-4 text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Visitors
        </Link>
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
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/admin/visitors" className="flex items-center gap-2 text-slate-500 hover:text-[#8F7CFF] transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white">
          <ArrowLeft className="w-4 h-4" /> Back to Visitor Management
        </Link>
      </div>

      {/* Hero Profile Card */}
      <SectionCard className="relative overflow-hidden bg-white/60 p-0 border-none shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-[#72F1D1]/20 to-[#3DD9FF]/10`} />
        
        <div className="relative z-10 px-8 pb-8 pt-20 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 text-center md:text-left">
          <div className="relative">
            <img src={visitor.photo || `https://ui-avatars.com/api/?name=${visitor.firstName}+${visitor.lastName}&background=f1f5f9&color=64748b`} alt={visitor.firstName} className="w-32 h-32 rounded-3xl shadow-xl ring-8 ring-white object-cover bg-white" />
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${visitor.status === 'INSIDE' ? 'bg-[#3DD9FF]' : visitor.status === 'APPROVED' ? 'bg-[#72F1D1]' : 'bg-slate-300'}`} />
          </div>
          
          <div className="flex flex-col flex-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-tight">
                {visitor.firstName} {visitor.lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${getPurposeColor(visitor.purpose)}`}>
                  {visitor.purpose}
                </span>
                <StatusBadge variant={getStatusVariant(visitor.status) as any}>{visitor.status}</StatusBadge>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm font-medium text-slate-500">
              {visitor.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {visitor.phone}
                </span>
              )}
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm text-slate-700 font-bold">
                <Building2 className="w-4 h-4 text-[#8F7CFF]" />
                {visitor.residentName} ({visitor.building} - {visitor.flat})
              </span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column - Main Details */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Timeline */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FFD166]" /> Visit Timeline
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center relative">
              <div className="hidden sm:block absolute left-8 right-8 top-1/2 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
              
              <div className="flex flex-col items-center gap-3 relative z-10 w-full sm:w-1/3">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm font-bold text-slate-700">Expected</span>
                  <span className="text-xs font-bold text-slate-400">{visitor.expectedTime}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 relative z-10 w-full sm:w-1/3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${visitor.checkInTime ? 'bg-[#3DD9FF]/10 border-2 border-[#3DD9FF]/30' : 'bg-white border-2 border-slate-200'}`}>
                  <LogIn className={`w-5 h-5 ${visitor.checkInTime ? 'text-[#3DD9FF]' : 'text-slate-400'}`} />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm font-bold text-slate-700">Check-in</span>
                  <span className="text-xs font-bold text-slate-400">{visitor.checkInTime || 'Pending'}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 relative z-10 w-full sm:w-1/3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${visitor.checkOutTime ? 'bg-slate-800 border-2 border-slate-700' : 'bg-white border-2 border-slate-200'}`}>
                  <LogOut className={`w-5 h-5 ${visitor.checkOutTime ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm font-bold text-slate-700">Check-out</span>
                  <span className="text-xs font-bold text-slate-400">{visitor.checkOutTime || 'Pending'}</span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard>
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Car className="w-5 h-5 text-[#72F1D1]" /> Vehicle Details
              </h3>
              {visitor.vehicleNumber ? (
                <div className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Car className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registration</span>
                    <span className="text-lg font-black text-slate-700 tracking-wider bg-slate-100 px-3 py-1 rounded-lg mt-1 w-fit border border-slate-200">{visitor.vehicleNumber}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full p-6 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                  <span className="text-sm font-bold text-slate-400">No vehicle registered.</span>
                </div>
              )}
            </SectionCard>

            <SectionCard>
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-[#8F7CFF]" /> Previous Visits
              </h3>
              <div className="w-full p-6 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <span className="text-sm font-bold text-slate-400">First time visitor.</span>
              </div>
            </SectionCard>
          </div>

        </div>

        {/* Right Column - Actions */}
        <div className="flex flex-col gap-6">
          
          <SectionCard className="bg-gradient-to-br from-white to-[#FF7A7A]/5 border-[#FF7A7A]/20">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#FF7A7A]" /> Security Notes
            </h3>
            <p className="text-sm text-slate-600 font-medium bg-white p-4 rounded-xl border border-slate-100">
              Verify ID proof at the main gate. Ensure visitor wears the badge visibly at all times.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
            
            {visitor.status === 'PENDING' && (
              <div className="flex gap-3 mb-4 border-b border-slate-100 pb-4">
                <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[#72F1D1] text-emerald-900 hover:bg-emerald-400 font-bold text-sm transition-all shadow-sm">
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-slate-200 text-[#FF7A7A] hover:bg-[#FF7A7A] hover:text-white hover:border-[#FF7A7A] font-bold text-sm transition-all shadow-sm">
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#8F7CFF]/10 hover:bg-[#8F7CFF] text-[#8F7CFF] hover:text-white font-bold text-sm transition-colors border border-transparent shadow-sm group">
                <QrCode className="w-4 h-4" /> Generate Visitor Pass
              </button>
              {visitor.passId && (
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-slate-200 shadow-sm group">
                  <Printer className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" /> Print Existing Pass
                </button>
              )}
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}
