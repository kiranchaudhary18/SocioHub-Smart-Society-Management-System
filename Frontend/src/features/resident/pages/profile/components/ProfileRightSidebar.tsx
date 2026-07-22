import { CheckCircle2, ChevronRight, HelpCircle, PhoneCall, ExternalLink, ShieldAlert } from "lucide-react";
import type { ProfileCompletion } from "../../../services/profile.service";

interface Props {
  completion: ProfileCompletion;
}

export function ProfileRightSidebar({ completion }: Props) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completion.percentage / 100) * circumference;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Profile Completion Card */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center">
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none stroke-slate-100"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="fill-none stroke-[#8F7CFF] transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeLinecap="round"
              style={{ strokeDasharray: circumference, strokeDashoffset }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-heading font-black text-slate-800">{completion.percentage}%</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 text-center mb-2">Profile Completion</h3>
        <p className="text-xs font-medium text-slate-500 text-center mb-6 px-4">
          Complete your profile to unlock all society features and priority support.
        </p>

        {completion.suggestions.length > 0 && (
          <div className="w-full flex flex-col gap-2">
            {completion.suggestions.map((suggestion: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-600 group cursor-pointer hover:border-[#8F7CFF]/30 transition-colors">
                <div className="w-2 h-2 rounded-full bg-[#8F7CFF]" />
                <span className="flex-1">{suggestion}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#8F7CFF]" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Status */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[32px] p-6 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-white/90" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Account Status</h4>
          </div>
          <span className="text-2xl font-black">Active & Verified</span>
          <p className="text-xs font-medium text-emerald-100">All features unlocked. Dues are clear.</p>
        </div>
      </div>

      {/* Support & Help */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-4 h-4 text-[#8F7CFF]" />
          <h4 className="text-sm font-bold text-slate-800">Need Help?</h4>
        </div>
        
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group text-left">
            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-slate-400 group-hover:text-[#8F7CFF]" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">Society Office</span>
                <span className="text-[10px] font-bold text-slate-400">10:00 AM - 6:00 PM</span>
              </div>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-[#8F7CFF]" />
          </button>

          <button className="flex items-center justify-between p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors group text-left">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-red-400 group-hover:text-red-500" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-red-700">Main Security Gate</span>
                <span className="text-[10px] font-bold text-red-400">24/7 Available</span>
              </div>
            </div>
            <ExternalLink className="w-3 h-3 text-red-300 group-hover:text-red-500" />
          </button>
        </div>
      </div>

    </div>
  );
}
