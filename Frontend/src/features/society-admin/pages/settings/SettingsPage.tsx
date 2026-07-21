import { useState, useEffect, useRef } from "react";
import { settingsService } from "../../services/settings.service";
import type { SocietySettings } from "../../services/settings.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  Building2, Image as ImageIcon, CheckSquare, Wrench, ShieldCheck, 
  Bell, Lock, Plug, Database, Save, RotateCcw, Activity, 
  Search, Info, Link as LinkIcon, CheckCircle2, Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "general", label: "General", icon: Building2 },
  { id: "branding", label: "Branding", icon: ImageIcon },
  { id: "amenities", label: "Amenities", icon: CheckSquare },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "visitorRules", label: "Visitor Rules", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "backups", label: "Backups", icon: Database },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SocietySettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    settingsService.getSettings().then(data => {
      setSettings(data);
      setIsLoading(false);
    });
  }, []);

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await settingsService.updateSettings(settings!);
    setIsSaving(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Custom Input Component
  const InputField = ({ label, value, type = "text", placeholder = "", onChange }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all"
      />
    </div>
  );

  // Custom Toggle Component
  const Toggle = ({ label, description, enabled, onChange }: any) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#8F7CFF]/30 transition-colors">
      <div className="flex flex-col pr-4">
        <span className="text-sm font-bold text-slate-700">{label}</span>
        {description && <span className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{description}</span>}
      </div>
      <button 
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#72F1D1]' : 'bg-slate-200'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  if (isLoading || !settings) {
    return (
      <div className="w-full h-full flex p-6 gap-6 animate-pulse">
        <div className="w-64 h-full bg-slate-100 rounded-3xl" />
        <div className="flex-1 h-full bg-slate-100 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 pb-12 relative">
      
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
            Settings saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-2">
            <span>Settings</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#8F7CFF]">Society</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-[#8F7CFF]" />
            Society Settings
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage society information, branding, policies and communication preferences.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<RotateCcw className="w-4 h-4" />}>Discard Changes</ActionButton>
          <ActionButton 
            variant="primary" 
            leftIcon={isSaving ? <Activity className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </ActionButton>
        </div>
      </div>

      {/* Main OS Layout */}
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        
        {/* Left Sidebar (Categories) */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-2">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search settings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-[16px] pl-10 pr-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#8F7CFF] transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2 lg:pb-0 sticky top-24">
            {CATEGORIES.filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase())).map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap lg:whitespace-normal ${
                    isActive 
                      ? 'bg-white text-[#8F7CFF] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white' 
                      : 'text-slate-500 hover:bg-white/40 hover:text-slate-700 border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#8F7CFF]' : 'text-slate-400'}`} />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Workspace (Forms) */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* GENERAL */}
          <div ref={el => { sectionRefs.current['general'] = el; }} className="scroll-mt-32">
            <SectionCard>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#8F7CFF]" /> General Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputField label="Society Name" value={settings.general.name} onChange={(val: string) => setSettings({...settings, general: {...settings.general, name: val}})} />
                </div>
                <InputField label="Registration Number" value={settings.general.registrationNumber} onChange={(val: string) => setSettings({...settings, general: {...settings.general, registrationNumber: val}})} />
                <InputField label="Email Address" type="email" value={settings.general.email} onChange={(val: string) => setSettings({...settings, general: {...settings.general, email: val}})} />
                <InputField label="Phone Number" value={settings.general.phone} onChange={(val: string) => setSettings({...settings, general: {...settings.general, phone: val}})} />
                <InputField label="Website" value={settings.general.website} onChange={(val: string) => setSettings({...settings, general: {...settings.general, website: val}})} />
                <div className="md:col-span-2">
                  <InputField label="Complete Address" value={settings.general.address} onChange={(val: string) => setSettings({...settings, general: {...settings.general, address: val}})} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1.5 w-full">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                  <textarea 
                    value={settings.general.description} 
                    onChange={(e) => setSettings({...settings, general: {...settings.general, description: e.target.value}})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all min-h-[100px]"
                  />
                </div>
              </div>
            </SectionCard>
          </div>

          {/* BRANDING */}
          <div ref={el => { sectionRefs.current['branding'] = el; }} className="scroll-mt-32">
            <SectionCard>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#3DD9FF]" /> Branding
              </h3>
              <div className="flex flex-col gap-8">
                
                <div className="flex items-center gap-6">
                  <img src={settings.branding.logoUrl} alt="Logo" className="w-24 h-24 rounded-2xl shadow-sm border-2 border-white object-cover bg-slate-100" />
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-slate-700">Society Logo</span>
                    <span className="text-xs text-slate-500">Recommended size: 256x256px. PNG or SVG.</span>
                    <button className="w-fit px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors mt-2">
                      Change Logo
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-slate-700">Cover Image</span>
                  <div className="w-full h-40 rounded-2xl overflow-hidden relative group">
                    <img src={settings.branding.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-4 py-2 bg-white text-slate-800 text-sm font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                        Change Cover
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <InputField label="Primary Color (Hex)" type="color" value={settings.branding.primaryColor} onChange={(val: string) => setSettings({...settings, branding: {...settings.branding, primaryColor: val}})} />
                  <InputField label="Secondary Color (Hex)" type="color" value={settings.branding.secondaryColor} onChange={(val: string) => setSettings({...settings, branding: {...settings.branding, secondaryColor: val}})} />
                </div>
              </div>
            </SectionCard>
          </div>

          {/* AMENITIES */}
          <div ref={el => { sectionRefs.current['amenities'] = el; }} className="scroll-mt-32">
            <SectionCard>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[#FFD166]" /> Amenities
              </h3>
              <p className="text-sm text-slate-500 mb-6 font-medium">Enable or disable amenities available in your society. This controls what residents can book.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settings.amenities.map((amenity, index) => (
                  <Toggle 
                    key={amenity.id} 
                    label={amenity.name} 
                    description={amenity.description} 
                    enabled={amenity.enabled} 
                    onChange={(val: boolean) => {
                      const newAmenities = [...settings.amenities];
                      newAmenities[index].enabled = val;
                      setSettings({...settings, amenities: newAmenities});
                    }}
                  />
                ))}
              </div>
            </SectionCard>
          </div>

          {/* MAINTENANCE */}
          <div ref={el => { sectionRefs.current['maintenance'] = el; }} className="scroll-mt-32">
            <SectionCard>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#FF7A7A]" /> Maintenance Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Due Date (Day of Month)" type="number" value={settings.maintenance.dueDate} onChange={(val: string) => setSettings({...settings, maintenance: {...settings.maintenance, dueDate: parseInt(val)}})} />
                <InputField label="Reminder Days Before Due" type="number" value={settings.maintenance.reminderDays} onChange={(val: string) => setSettings({...settings, maintenance: {...settings.maintenance, reminderDays: parseInt(val)}})} />
                <InputField label="Late Fee (Fixed ₹)" type="number" value={settings.maintenance.lateFee} onChange={(val: string) => setSettings({...settings, maintenance: {...settings.maintenance, lateFee: parseInt(val)}})} />
                <InputField label="Penalty % (per month)" type="number" value={settings.maintenance.penaltyPercentage} onChange={(val: string) => setSettings({...settings, maintenance: {...settings.maintenance, penaltyPercentage: parseFloat(val)}})} />
                <div className="md:col-span-2">
                  <InputField label="Invoice Number Prefix" value={settings.maintenance.invoicePrefix} onChange={(val: string) => setSettings({...settings, maintenance: {...settings.maintenance, invoicePrefix: val}})} />
                </div>
              </div>
            </SectionCard>
          </div>

          {/* SECURITY & INTEGRATIONS */}
          <div ref={el => { sectionRefs.current['security'] = el; }} className="scroll-mt-32">
            <SectionCard>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-500" /> Security
              </h3>
              
              <div className="flex flex-col gap-4">
                <Toggle 
                  label="Enforce Two-Factor Authentication (2FA)" 
                  description="Require all admins and guards to use 2FA." 
                  enabled={settings.security.twoFactorAuth} 
                  onChange={(val: boolean) => setSettings({...settings, security: {...settings.security, twoFactorAuth: val}})}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <InputField label="Session Timeout (Minutes)" type="number" value={settings.security.sessionTimeout} onChange={(val: string) => setSettings({...settings, security: {...settings.security, sessionTimeout: parseInt(val)}})} />
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password Policy</label>
                    <select 
                      value={settings.security.passwordPolicy}
                      onChange={(e) => setSettings({...settings, security: {...settings.security, passwordPolicy: e.target.value}})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:border-[#8F7CFF] transition-all"
                    >
                      <option value="BASIC">Basic (8+ chars)</option>
                      <option value="STRICT">Strict (12+ chars, special char, numbers)</option>
                    </select>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

        </div>

        {/* Right Panel (Insights) */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
          <SectionCard className="bg-gradient-to-br from-[#8F7CFF] to-[#6C63FF] border-none text-white p-6 shadow-glow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Info className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-lg">System Status</span>
            </div>
            <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
              All services are operational. Latest backup was completed 2 hours ago.
            </p>
            <button className="w-full py-3 bg-white text-[#8F7CFF] rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">
              View Status Logs
            </button>
          </SectionCard>

          <SectionCard>
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-[#3DD9FF]" /> Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {['View Audit Logs', 'Manage API Keys', 'Download Society Data', 'Contact Support'].map((link, i) => (
                <button key={i} className="text-left px-3 py-2 text-sm font-bold text-slate-600 hover:text-[#8F7CFF] hover:bg-slate-50 rounded-lg transition-colors">
                  {link}
                </button>
              ))}
            </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
}

// Temporary icon mapping for Hero Header until lucide is imported
const SettingsIcon = Settings;
