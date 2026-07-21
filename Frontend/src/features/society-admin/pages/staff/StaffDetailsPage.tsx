import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { staffService } from "../../services/staff.service";
import type { Staff } from "../../services/staff.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  ArrowLeft, Phone, Mail, MapPin, Briefcase, Calendar, 
  Clock, Download, Edit3, UserMinus, ShieldAlert, CheckCircle2,
  FileText, Activity
} from "lucide-react";

export default function StaffDetailsPage() {
  const { staffId } = useParams<{ staffId: string }>();
  const [staff, setStaff] = useState<Staff | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (staffId) {
      staffService.getStaff(staffId).then(data => {
        if (data) setStaff(data);
        setIsLoading(false);
      });
    }
  }, [staffId]);

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

  if (!staff) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Staff Member Not Found</h2>
        <Link to="/admin/staff" className="mt-4 text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Staff Management
        </Link>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE": return "success";
      case "ON_LEAVE": return "warning";
      case "INACTIVE": return "danger";
      default: return "neutral";
    }
  };

  const getDepartmentColor = (dept: string) => {
    switch (dept) {
      case "MAINTENANCE": return "text-[#3DD9FF] bg-[#3DD9FF]/10 border-[#3DD9FF]/20";
      case "HOUSEKEEPING": return "text-[#FFD166] bg-[#FFD166]/10 border-[#FFD166]/20";
      case "ADMINISTRATION": return "text-[#8F7CFF] bg-[#8F7CFF]/10 border-[#8F7CFF]/20";
      case "SECURITY": return "text-[#FF7A7A] bg-[#FF7A7A]/10 border-[#FF7A7A]/20";
      default: return "text-slate-500 bg-slate-100 border-slate-200";
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/admin/staff" className="flex items-center gap-2 text-slate-500 hover:text-[#8F7CFF] transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white">
          <ArrowLeft className="w-4 h-4" /> Back to Staff List
        </Link>
        <div className="flex items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Edit3 className="w-4 h-4" />}>Edit Profile</ActionButton>
          <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Download Profile</ActionButton>
        </div>
      </div>

      {/* Hero Profile Card */}
      <SectionCard className="relative overflow-hidden bg-white/60 p-0 border-none shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-br from-[#8F7CFF]/20 to-[#3DD9FF]/10" />
        
        <div className="relative z-10 px-8 pb-8 pt-20 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 text-center md:text-left">
          <div className="relative">
            <img src={staff.photo || `https://ui-avatars.com/api/?name=${staff.firstName}+${staff.lastName}&background=f1f5f9&color=64748b`} alt={staff.firstName} className="w-32 h-32 rounded-3xl shadow-xl ring-8 ring-white object-cover bg-white" />
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${staff.status === 'ACTIVE' ? 'bg-[#72F1D1]' : staff.status === 'ON_LEAVE' ? 'bg-[#FFD166]' : 'bg-[#FF7A7A]'}`} />
          </div>
          
          <div className="flex flex-col flex-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-tight">
                {staff.firstName} {staff.lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className={`px-2.5 py-1 rounded-md border text-[10px] font-black uppercase tracking-widest ${getDepartmentColor(staff.department)}`}>
                  {staff.department}
                </span>
                <StatusBadge variant={getStatusVariant(staff.status) as any}>{staff.status.replace('_', ' ')}</StatusBadge>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <Briefcase className="w-4 h-4 text-[#8F7CFF]" />
                {staff.role} ({staff.employmentType.replace('_', ' ')})
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm text-slate-700 font-bold">
                <Clock className="w-4 h-4 text-[#3DD9FF]" />
                {staff.shift}
              </span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Personal Information */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <UserMinus className="w-5 h-5 text-[#FFD166]" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone
                </span>
                <span className="font-bold text-slate-800 text-lg">{staff.phone}</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email
                </span>
                <span className="font-bold text-slate-800 text-lg">{staff.email || 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-slate-50 rounded-2xl border border-slate-100 md:col-span-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Address
                </span>
                <span className="font-bold text-slate-800">123 Staff Quarters, Block D, Society Premises.</span>
              </div>
            </div>
          </SectionCard>

          {/* Activity Timeline */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#8F7CFF]" /> Activity Timeline
            </h3>
            
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative mb-6">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#72F1D1] rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-700">Punched In</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">Today at 08:05 AM (Gate 1)</span>
                </div>
              </div>
              <div className="relative mb-6">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#3DD9FF] rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-700">Completed Task: Plumbing repair in A-204</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">Yesterday at 16:30 PM</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-slate-200 rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-700">Joined Society</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">{staff.joiningDate}</span>
                </div>
              </div>
            </div>
          </SectionCard>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Quick Actions
            </h3>
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#8F7CFF]/10 hover:bg-[#8F7CFF] text-[#8F7CFF] hover:text-white font-bold text-sm transition-colors border border-transparent shadow-sm group">
                <Briefcase className="w-4 h-4" /> Assign Task
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-slate-200 shadow-sm group">
                <Calendar className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" /> Mark Leave
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 text-slate-600 font-bold text-sm transition-colors border border-transparent group mt-2">
                <span className="flex items-center gap-3 text-slate-600 group-hover:text-red-600 transition-colors">
                  <ShieldAlert className="w-4 h-4 text-slate-400 group-hover:text-red-600" /> Deactivate Staff
                </span>
              </button>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-400" /> Documents
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:border-[#8F7CFF]/40 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-slate-700 truncate group-hover:text-[#8F7CFF] transition-colors">Aadhar Card.pdf</span>
                  <span className="text-xs font-medium text-slate-400">Verified ID Proof</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:border-[#8F7CFF]/40 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-slate-700 truncate group-hover:text-[#8F7CFF] transition-colors">Employment Contract.pdf</span>
                  <span className="text-xs font-medium text-slate-400">Signed {staff.joiningDate}</span>
                </div>
              </div>
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}
