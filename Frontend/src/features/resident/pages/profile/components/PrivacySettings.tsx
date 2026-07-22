import { EyeOff } from "lucide-react";
import type { PrivacySettings as PrivacyType } from "../../../services/profile.service";

interface Props {
  privacy: PrivacyType;
  onToggle: (key: keyof PrivacyType, value: any) => void;
}

export function PrivacySettings({ privacy, onToggle }: Props) {
  
  const ToggleRow = ({ label, desc, stateKey }: { label: string, desc: string, stateKey: keyof PrivacyType }) => {
    const isEnabled = privacy[stateKey] as boolean;
    
    return (
      <div className="flex items-center justify-between py-4">
        <div className="flex flex-col pr-8">
          <span className="text-sm font-bold text-slate-800">{label}</span>
          <span className="text-xs font-medium text-slate-500 mt-0.5">{desc}</span>
        </div>
        
        <button 
          onClick={() => onToggle(stateKey, !isEnabled)}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 ease-in-out shrink-0 ${isEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}
        >
          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ease-in-out ${isEnabled ? 'translate-x-6.5 left-0.5' : 'translate-x-0 left-0.5'}`} />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3 bg-white/40">
        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
          <EyeOff className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-black text-slate-800">Privacy Settings</h2>
          <p className="text-sm font-medium text-slate-500 mt-0.5">Control what information is visible to other residents.</p>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-12">
        <div className="flex-1 flex flex-col divide-y divide-slate-100">
          <ToggleRow label="Show Contact Number" desc="Allow other verified residents to see your mobile number." stateKey="showContactNumber" />
          <ToggleRow label="Show Email Address" desc="Allow other verified residents to see your email address." stateKey="showEmail" />
          <ToggleRow label="Show Birthday" desc="Show a birthday cake icon next to your name on your birthday." stateKey="showBirthday" />
          <ToggleRow label="Allow Event Invitations" desc="Allow other residents to invite you to private events." stateKey="allowEventInvitations" />
          <ToggleRow label="Allow Direct Messages" desc="Allow other residents to send you direct messages." stateKey="allowCommunityMessages" />
        </div>
        
        <div className="w-full md:w-72 flex flex-col bg-slate-50/50 p-6 rounded-2xl border border-slate-100 h-fit">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Profile Visibility</label>
          <select 
            value={privacy.profileVisibility}
            onChange={(e) => onToggle('profileVisibility', e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all cursor-pointer"
          >
            <option value="PUBLIC">Public (Any resident)</option>
            <option value="SOCIETY_ONLY">Society Members Only</option>
            <option value="ADMIN_ONLY">Admins Only (Hidden)</option>
          </select>
          <p className="text-xs font-medium text-slate-500 mt-4 leading-relaxed">
            Changing this setting affects who can find your profile in the Resident Directory.
          </p>
        </div>
      </div>
    </div>
  );
}
