import { ShieldCheck, KeyRound, Smartphone, History, LogOut } from "lucide-react";
import type { SecurityDetails } from "../../../services/profile.service";

interface Props {
  security: SecurityDetails;
}

export function SecuritySettings({ security }: Props) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3 bg-white/40">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-black text-slate-800">Security Settings</h2>
          <p className="text-sm font-medium text-slate-500 mt-0.5">Protect your account and manage active sessions.</p>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col gap-6">
        
        {/* Password */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">Account Password</span>
              <span className="text-xs font-medium text-slate-500 mt-0.5">Last changed: {new Date(security.lastPasswordChange).toLocaleDateString()}</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold text-sm shadow-sm transition-colors">
            Change Password
          </button>
        </div>

        {/* 2FA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">Two-Factor Authentication (2FA)</span>
                {security.twoFactorEnabled 
                  ? <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[9px] font-black uppercase tracking-wider">Enabled</span>
                  : <span className="px-2 py-0.5 bg-slate-200 text-slate-500 rounded text-[9px] font-black uppercase tracking-wider">Disabled</span>
                }
              </div>
              <span className="text-xs font-medium text-slate-500 mt-0.5">Adds an extra layer of security to your account.</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold text-sm shadow-sm transition-colors">
            {security.twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
          </button>
        </div>

        {/* Devices */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">Active Sessions</span>
              <span className="text-xs font-medium text-slate-500 mt-0.5">You are currently logged in on {security.activeDevices} devices.</span>
              <span className="text-xs font-bold text-emerald-500 mt-1">Current: {security.loginLocation}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold text-sm shadow-sm transition-colors">
              View History
            </button>
            <button className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout All
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
