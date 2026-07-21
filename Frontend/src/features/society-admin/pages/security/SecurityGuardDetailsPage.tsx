import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { securityService } from "../../services/security.service";
import type { SecurityGuard } from "../../services/security.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  ArrowLeft, Phone, MapPin, Briefcase, CalendarClock, 
  Clock, ShieldAlert, History, UserCheck, ShieldCheck,
  AlertTriangle, Sun, Moon
} from "lucide-react";

export default function SecurityGuardDetailsPage() {
  const { guardId } = useParams<{ guardId: string }>();
  const [guard, setGuard] = useState<SecurityGuard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (guardId) {
      securityService.getGuard(guardId).then(data => {
        if (data) setGuard(data);
        setIsLoading(false);
      });
    }
  }, [guardId]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 animate-pulse">
        <div className="h-48 bg-slate-100 rounded-[32px] w-full" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="h-96 bg-slate-100 rounded-[32px] xl:col-span-2" />
          <div className="h-96 bg-slate-100 rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (!guard) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Security Guard Not Found</h2>
        <Link to="/admin/security" className="mt-4 text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Security Guards
        </Link>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ON_DUTY": return "success";
      case "ON_LEAVE": return "warning";
      case "OFF_DUTY": return "neutral";
      default: return "neutral";
    }
  };

  const getShiftIcon = (shift: string) => {
    switch (shift) {
      case "MORNING": return <Sun className="w-4 h-4 text-[#FFD166]" />;
      case "NIGHT": return <Moon className="w-4 h-4 text-[#8F7CFF]" />;
      default: return <Sun className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/admin/security" className="flex items-center gap-2 text-slate-500 hover:text-[#8F7CFF] transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white">
          <ArrowLeft className="w-4 h-4" /> Back to Guards List
        </Link>
        <div className="flex items-center gap-3">
          <ActionButton variant="outline" leftIcon={<ShieldAlert className="w-4 h-4" />}>Report Incident</ActionButton>
          <ActionButton variant="primary" leftIcon={<CalendarClock className="w-4 h-4" />}>Change Shift</ActionButton>
        </div>
      </div>

      {/* Hero Profile Card */}
      <SectionCard className="relative overflow-hidden bg-white/60 p-0 border-none shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-slate-200 to-[#72F1D1]/20" />
        
        <div className="relative z-10 px-8 pb-8 pt-20 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 text-center md:text-left">
          <div className="relative">
            <img src={guard.photo || `https://ui-avatars.com/api/?name=${guard.firstName}+${guard.lastName}&background=f1f5f9&color=64748b`} alt={guard.firstName} className="w-32 h-32 rounded-3xl shadow-xl ring-8 ring-white object-cover bg-white" />
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${guard.status === 'ON_DUTY' ? 'bg-[#72F1D1]' : guard.status === 'ON_LEAVE' ? 'bg-[#FFD166]' : 'bg-slate-400'}`} />
          </div>
          
          <div className="flex flex-col flex-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-tight flex items-center gap-2 justify-center md:justify-start">
                {guard.firstName} {guard.lastName}
                <ShieldCheck className="w-6 h-6 text-[#72F1D1]" />
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <StatusBadge variant={getStatusVariant(guard.status) as any}>{guard.status.replace('_', ' ')}</StatusBadge>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <MapPin className="w-4 h-4 text-[#FF7A7A]" />
                {guard.assignedGate}
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm text-slate-700 font-bold uppercase tracking-wide">
                {getShiftIcon(guard.currentShift)}
                {guard.currentShift} SHIFT
              </span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Details */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#8F7CFF]" /> Guard Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone Number
                </span>
                <span className="font-bold text-slate-800 text-lg">{guard.phone}</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Agency
                </span>
                <span className="font-bold text-slate-800 text-lg">{guard.agency || 'Direct Hire'}</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-red-50 rounded-2xl border border-red-100 md:col-span-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Emergency Contact
                </span>
                <span className="font-bold text-red-700">{guard.emergencyContact}</span>
              </div>
            </div>
          </SectionCard>

          {/* Activity Timeline */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-[#FFD166]" /> Shift Timeline
            </h3>
            
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative mb-6">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#72F1D1] rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-700">Shift Started</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">Today at 08:00 AM</span>
                </div>
              </div>
              <div className="relative mb-6">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-slate-200 rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-700">Patrol Completed: Block A</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">Today at 09:30 AM</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#3DD9FF] rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-700">Shift Ended</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">Yesterday at 16:00 PM</span>
                </div>
              </div>
            </div>
          </SectionCard>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#3DD9FF]" /> Quick Actions
            </h3>
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-slate-200 shadow-sm group">
                <CalendarClock className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" /> View Attendance
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 text-slate-600 font-bold text-sm transition-colors border border-transparent group mt-2">
                <span className="flex items-center gap-3 text-slate-600 group-hover:text-red-600 transition-colors">
                  <ShieldAlert className="w-4 h-4 text-slate-400 group-hover:text-red-600" /> Revoke Access
                </span>
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
