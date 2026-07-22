import { ShieldCheck, Camera, Edit2, Key, Building2 } from "lucide-react";
import type { ResidentProfile, ResidenceInfo } from "../../../services/profile.service";

interface Props {
  profile: ResidentProfile;
  residence: ResidenceInfo;
}

export function ProfileSummary({ profile, residence }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#8F7CFF] to-[#604CE8] rounded-[32px] p-8 md:p-10 shadow-xl text-white relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
      
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3DD9FF]/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Avatar Container */}
      <div className="relative z-10 shrink-0">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-xl border-4 border-white/30 flex items-center justify-center text-4xl md:text-5xl font-heading font-black text-white shadow-2xl relative">
          {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          
          <button className="absolute bottom-2 right-2 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors border-2 border-[#8F7CFF] group">
            <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative z-10 w-full text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
          {profile.isVerified && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" /> Verified Member
            </div>
          )}
          <span className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-200 border border-white/20">
            {profile.role}
          </span>
          <span className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-200 border border-white/20">
            ID: {profile.id}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-white mb-2 tracking-tight">
          {profile.firstName} {profile.lastName}
        </h1>
        
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm font-medium text-slate-200 mb-6">
          <div className="flex items-center gap-1.5">
            <Key className="w-4 h-4 text-amber-300" />
            <span>Flat {residence.flatNumber}, {residence.building}</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-slate-400" />
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#3DD9FF]" />
            <span>{residence.societyName}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-auto">
          <button className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2">
            <Edit2 className="w-4 h-4" /> Edit Profile
          </button>
          <span className="text-xs font-bold text-white/70">
            Resident since {new Date(profile.residentSince).getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
