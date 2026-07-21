import { motion } from "framer-motion";
import { 
  User, Mail, Camera, ShieldCheck, CheckCircle2
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { data: profile } = useProfile();

  if (!profile) return null;

  return (
    <div className="w-full max-w-[1000px] mx-auto pb-8 flex flex-col h-full gap-6">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2 shrink-0 mb-4"
      >
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          My Profile
        </h1>
        <p className="text-slate-500 font-medium text-base">
          Update your personal information and profile photo.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-12"
      >
        
        {/* LEFT: Avatar Upload */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-40 h-40 mb-6 group">
            <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Hover overlay for changing photo */}
            <button className="absolute inset-0 bg-slate-900/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
              <Camera className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">Change</span>
            </button>
            
            {/* Static button badge */}
            <button className="absolute bottom-1 right-1 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-[#8F7CFF] hover:border-[#8F7CFF]/50 transition-colors shadow-lg group-hover:hidden">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8F7CFF]/10 text-[#8F7CFF] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            {profile.role}
          </div>
        </div>

        {/* RIGHT: Personal Info Form */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Personal Details</h3>
            <p className="text-sm font-medium text-slate-500">
              Only your name and photo can be modified. Other details are managed by the platform.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Name - Editable */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" /> Full Name
              </label>
              <input 
                type="text" 
                defaultValue={profile.name} 
                className="w-full max-w-md px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:bg-white focus:border-[#8F7CFF] transition-all text-slate-700 font-medium shadow-sm" 
              />
            </div>

            {/* Email - Read Only */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" /> Email Address
              </label>
              <div className="relative max-w-md">
                <input 
                  type="email" 
                  defaultValue={profile.email} 
                  disabled 
                  className="w-full px-4 py-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-500 cursor-not-allowed font-medium" 
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-white rounded-md shadow-sm border border-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8F7CFF]" />
                  <span className="text-[10px] font-bold text-slate-600">Managed by Platform</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8F7CFF] hover:bg-[#7b68ee] text-white text-sm font-bold shadow-lg shadow-[#8F7CFF]/30 transition-all">
              <CheckCircle2 className="w-4 h-4" />
              Save Changes
            </button>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
