import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, ShieldCheck, Mail, Database, 
  Key, AlertTriangle, CheckCircle2, Activity, HardDrive, Server,
  Bell, Paintbrush
} from "lucide-react";
import { usePlatformSettings, useSystemHealth } from "../hooks/useSettings";
import * as Switch from "@radix-ui/react-switch";

type TabId = "General" | "SMTP" | "Storage" | "Security" | "Authentication" | "Email Templates" | "Notifications" | "Branding" | "API Keys" | "Backup" | "Maintenance Mode";

const TABS: { id: TabId; icon: any }[] = [
  { id: "General", icon: SettingsIcon },
  { id: "Security", icon: ShieldCheck },
  { id: "SMTP", icon: Mail },
  { id: "Authentication", icon: Key },
  { id: "Storage", icon: HardDrive },
  { id: "Notifications", icon: Bell },
  { id: "Branding", icon: Paintbrush },
  { id: "API Keys", icon: Database },
  { id: "Backup", icon: Server },
  { id: "Maintenance Mode", icon: AlertTriangle },
];

export default function SettingsPage() {
  const { data: settings } = usePlatformSettings();
  const { data: health } = useSystemHealth();
  const [activeTab, setActiveTab] = useState<TabId>("General");

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8 flex flex-col h-[calc(100vh-100px)] gap-6">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
            Platform Settings
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Global configurations and system administration for ResiCore.
          </p>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0">
        
        {/* LEFT: Tabs Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full xl:w-[280px] shrink-0 flex flex-col bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white shadow-[0_4px_20px_rgba(143,124,255,0.08)] text-[#8F7CFF] font-bold border border-[#8F7CFF]/20' 
                    : 'text-slate-600 hover:bg-white/40 hover:text-slate-900 font-medium border border-transparent'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#8F7CFF]' : 'text-slate-400'}`} />
                {tab.id}
              </button>
            ))}
          </div>
        </motion.div>

        {/* CENTER: Settings Content */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-[2] flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6 pb-20">
            
            {activeTab === "General" && (
              <>
                <SettingsCard title="Platform Identity" description="Core identifying information for the platform.">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Platform Name</label>
                        <input type="text" defaultValue={settings?.general.platformName} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-colors shadow-sm text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Timezone</label>
                        <select className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-colors shadow-sm text-slate-700">
                          <option>{settings?.general.timezone}</option>
                          <option>UTC+0:00</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </SettingsCard>
                
                <SettingsCard title="Contact Information" description="Where users should direct their inquiries.">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Support Email</label>
                        <input type="email" defaultValue={settings?.general.contactEmail} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-colors shadow-sm text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Support Phone</label>
                        <input type="text" defaultValue={settings?.general.supportPhone} className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-colors shadow-sm text-slate-700" />
                      </div>
                    </div>
                  </div>
                </SettingsCard>
              </>
            )}

            {activeTab === "Security" && (
              <>
                <SettingsCard title="Authentication Requirements" description="Enforce global security standards for all users.">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Require Multi-Factor Authentication</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1">Force all society admins and staff to use MFA.</p>
                      </div>
                      <Switch.Root defaultChecked={settings?.security.mfaRequired} className="w-11 h-6 rounded-full relative transition-colors bg-slate-200 data-[state=checked]:bg-[#8F7CFF]">
                        <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform transform shadow-sm translate-x-[4px] data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                    </div>
                    <div className="w-full h-px bg-slate-100" />
                    <div className="flex items-center justify-between">
                      <div className="max-w-[70%]">
                        <h4 className="text-sm font-bold text-slate-800">Password Expiry (Days)</h4>
                        <p className="text-xs font-medium text-slate-500 mt-1">Number of days before a user is forced to change their password.</p>
                      </div>
                      <input type="number" defaultValue={settings?.security.passwordExpiryDays} className="w-24 px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#8F7CFF] text-center shadow-sm text-slate-700" />
                    </div>
                  </div>
                </SettingsCard>
              </>
            )}

            {activeTab === "Maintenance Mode" && (
              <SettingsCard title="Maintenance Mode" description="Temporarily take the platform offline for upgrades." danger>
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#FF7A7A]/5 p-4 rounded-xl border border-[#FF7A7A]/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-[#FF7A7A] mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Enable Maintenance Mode</h4>
                        <p className="text-xs font-medium text-slate-600 mt-1 max-w-md">When active, only Super Admins will be able to access the platform. All other users will see the maintenance message.</p>
                      </div>
                    </div>
                    <Switch.Root defaultChecked={settings?.maintenance.isMaintenanceMode} className="w-11 h-6 rounded-full relative transition-colors bg-slate-200 data-[state=checked]:bg-[#FF7A7A]">
                      <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform transform shadow-sm translate-x-[4px] data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Maintenance Message</label>
                    <textarea rows={3} defaultValue={settings?.maintenance.message} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#FF7A7A] transition-colors shadow-sm text-slate-700 resize-none" />
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* Placeholder for other tabs */}
            {!["General", "Security", "Maintenance Mode"].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center bg-white/40 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-12 text-center h-[400px]">
                <SettingsIcon className="w-16 h-16 text-slate-200 mb-4 animate-spin-slow" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">{activeTab} Settings</h3>
                <p className="text-slate-500 max-w-sm">Configuration options for {activeTab.toLowerCase()} will appear here.</p>
              </div>
            )}
            
          </div>
        </motion.div>

        {/* RIGHT: System Health & Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full xl:w-[350px] shrink-0 flex flex-col gap-6"
        >
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#72F1D1]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#72F1D1]" /> System Health
            </h4>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
                  <span className="text-sm font-bold text-teal-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {health?.status}
                  </span>
                </div>
              </div>
              
              <div className="w-full h-px bg-slate-100" />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Uptime</span>
                  <span className="text-lg font-black text-slate-700">{health?.uptime}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">DB Load</span>
                  <span className="text-lg font-black text-slate-700">{health?.databaseLoad}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#3DD9FF]" /> Storage & Backups
            </h4>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-500">Storage Used</span>
                  <span className="text-xs font-bold text-slate-700">{health?.storageUsed} / {health?.storageTotal}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3DD9FF] to-[#8F7CFF] w-[45%]" />
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <Server className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Last Backup</p>
                  <p className="text-sm font-bold text-slate-700">{health?.lastBackup}</p>
                </div>
              </div>
              
              <button className="w-full py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600">
                Trigger Manual Backup
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SettingsCard({ title, description, children, danger = false }: { title: string, description: string, children: React.ReactNode, danger?: boolean }) {
  return (
    <div className={`bg-white/60 backdrop-blur-2xl border ${danger ? 'border-[#FF7A7A]/30' : 'border-white/80'} rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden`}>
      <div className={`p-6 border-b ${danger ? 'border-[#FF7A7A]/10 bg-[#FF7A7A]/5' : 'border-white bg-white/40'}`}>
        <h3 className={`text-lg font-bold mb-1 ${danger ? 'text-[#FF7A7A]' : 'text-slate-900'}`}>{title}</h3>
        <p className={`text-sm font-medium ${danger ? 'text-[#FF7A7A]/70' : 'text-slate-500'}`}>{description}</p>
      </div>
      <div className="p-6">
        {children}
      </div>
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
        <button className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
          Reset
        </button>
        <button className="px-5 py-2 rounded-xl bg-[#8F7CFF] hover:bg-[#7b68ee] text-white text-sm font-bold shadow-md shadow-[#8F7CFF]/20 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}
