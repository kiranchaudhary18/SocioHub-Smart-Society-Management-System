import { useState, useEffect } from "react";
import { profileService } from "../../services/profile.service";
import type { ProfileSettings } from "../../services/profile.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  User, Shield, Smartphone, Globe, AlertTriangle, 
  Save, Activity, CheckCircle2, BadgeCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    profileService.getProfile().then(data => {
      setProfile(data);
      setIsLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await profileService.updateProfile(profile!);
    setIsSaving(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const InputField = ({ label, value, type = "text", onChange }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all"
      />
    </div>
  );

  if (isLoading || !profile) {
    return (
      <div className="w-full h-full flex flex-col p-6 gap-6 animate-pulse">
        <div className="w-full h-48 bg-slate-100 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-100 rounded-3xl" />
          <div className="h-96 bg-slate-100 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 pb-12 relative max-w-6xl mx-auto">
      
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 flex items-center gap-3 bg-[#72F1D1] text-emerald-950 px-6 py-4 rounded-2xl shadow-xl font-bold"
          >
            <CheckCircle2 className="w-6 h-6" />
            Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
          <span>Settings</span>
          <span className="text-slate-300">/</span>
          <span className="text-[#8F7CFF]">Profile</span>
        </div>
        <ActionButton 
          variant="primary" 
          leftIcon={isSaving ? <Activity className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Profile'}
        </ActionButton>
      </div>

      {/* Profile Hero Card */}
      <SectionCard className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8 bg-gradient-to-br from-white to-slate-50/50">
        <div className="relative group cursor-pointer">
          <img src={profile.personal.avatarUrl} alt="Avatar" className="w-32 h-32 rounded-3xl shadow-lg border-4 border-white object-cover" />
          <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs font-bold">Edit</span>
          </div>
          {profile.professional.verificationStatus === 'VERIFIED' && (
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm" title="Verified Admin">
              <BadgeCheck className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="flex flex-col text-center md:text-left flex-1">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">
            {profile.personal.firstName} {profile.personal.lastName}
          </h1>
          <p className="text-slate-500 font-bold text-lg mt-1">{profile.professional.role} at {profile.professional.societyName}</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Member Since</span>
              <span className="text-sm font-bold text-slate-700">{profile.professional.memberSince}</span>
            </div>
            <div className="w-px h-8 bg-slate-200 hidden md:block" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</span>
              <span className="text-sm font-bold text-slate-700">{profile.professional.experience}</span>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Forms) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <SectionCard>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#8F7CFF]" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="First Name" value={profile.personal.firstName} onChange={(val: string) => setProfile({...profile, personal: {...profile.personal, firstName: val}})} />
              <InputField label="Last Name" value={profile.personal.lastName} onChange={(val: string) => setProfile({...profile, personal: {...profile.personal, lastName: val}})} />
              <InputField label="Email Address" type="email" value={profile.personal.email} onChange={(val: string) => setProfile({...profile, personal: {...profile.personal, email: val}})} />
              <InputField label="Phone Number" value={profile.personal.phone} onChange={(val: string) => setProfile({...profile, personal: {...profile.personal, phone: val}})} />
              <InputField label="Date of Birth" type="date" value={profile.personal.dateOfBirth} onChange={(val: string) => setProfile({...profile, personal: {...profile.personal, dateOfBirth: val}})} />
              <div className="md:col-span-2 flex flex-col gap-1.5 w-full">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Address</label>
                <textarea 
                  value={profile.personal.address} 
                  onChange={(e) => setProfile({...profile, personal: {...profile.personal, address: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all min-h-[100px]"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#72F1D1]" /> Security & Recovery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Recovery Email" type="email" value={profile.security.recoveryEmail} onChange={(val: string) => setProfile({...profile, security: {...profile.security, recoveryEmail: val}})} />
              <InputField label="Recovery Phone" value={profile.security.recoveryPhone} onChange={(val: string) => setProfile({...profile, security: {...profile.security, recoveryPhone: val}})} />
              <div className="md:col-span-2 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700">Two-Factor Authentication</span>
                  <span className="text-xs font-medium text-slate-500 mt-1">Add an extra layer of security to your account.</span>
                </div>
                <button 
                  onClick={() => setProfile({...profile, security: {...profile.security, twoFactorEnabled: !profile.security.twoFactorEnabled}})}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${profile.security.twoFactorEnabled ? 'bg-[#72F1D1]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${profile.security.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="md:col-span-2 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">Last password change: {profile.security.lastPasswordChange}</span>
                <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </SectionCard>
          
        </div>

        {/* Right Column (Side Panels) */}
        <div className="flex flex-col gap-6">
          
          <SectionCard>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#3DD9FF]" /> Preferences
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Language</label>
                <select 
                  value={profile.preferences.language}
                  onChange={(e) => setProfile({...profile, preferences: {...profile.preferences, language: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#8F7CFF]"
                >
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Timezone</label>
                <select 
                  value={profile.preferences.timezone}
                  onChange={(e) => setProfile({...profile, preferences: {...profile.preferences, timezone: e.target.value}})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#8F7CFF]"
                >
                  <option>Asia/Kolkata (IST)</option>
                  <option>UTC</option>
                  <option>America/New_York (EST)</option>
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#8F7CFF]" /> Active Sessions
            </h3>
            <div className="flex flex-col gap-3">
              {profile.sessions.map((session) => (
                <div key={session.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className={`p-2 rounded-lg ${session.isCurrent ? 'bg-[#72F1D1]/20' : 'bg-slate-200'}`}>
                    <Smartphone className={`w-4 h-4 ${session.isCurrent ? 'text-emerald-700' : 'text-slate-500'}`} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      {session.device} 
                      {session.isCurrent && <span className="px-1.5 py-0.5 rounded-md bg-[#72F1D1] text-emerald-950 text-[10px] uppercase tracking-widest">Current</span>}
                    </span>
                    <span className="text-xs font-medium text-slate-500 mt-1">{session.location} • {session.lastActive}</span>
                  </div>
                  {!session.isCurrent && (
                    <button className="text-xs font-bold text-red-500 hover:underline">Log out</button>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors">
              Log Out All Other Devices
            </button>
          </SectionCard>

          <SectionCard className="border-red-100 bg-red-50/50">
            <h3 className="text-sm font-bold text-red-600 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Danger Zone
            </h3>
            <p className="text-xs font-medium text-red-500/80 mb-4">
              Deactivating your account will immediately remove your access to the society admin panel.
            </p>
            <button className="w-full py-2 bg-red-100 text-red-600 hover:bg-red-200 font-bold text-sm rounded-xl transition-colors">
              Deactivate Account
            </button>
          </SectionCard>

        </div>

      </div>
    </div>
  );
}
