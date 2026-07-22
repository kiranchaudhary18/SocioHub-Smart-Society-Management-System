import { Bell } from "lucide-react";
import type { NotificationPreferences as PrefsType } from "../../../services/profile.service";

interface Props {
  preferences: PrefsType;
  onToggle: (key: keyof PrefsType, value: boolean) => void;
}

export function NotificationPreferences({ preferences, onToggle }: Props) {
  
  const ToggleRow = ({ label, desc, stateKey }: { label: string, desc: string, stateKey: keyof PrefsType }) => {
    const isEnabled = preferences[stateKey];
    
    return (
      <div className="flex items-center justify-between py-4">
        <div className="flex flex-col pr-8">
          <span className="text-sm font-bold text-slate-800">{label}</span>
          <span className="text-xs font-medium text-slate-500 mt-0.5">{desc}</span>
        </div>
        
        <button 
          onClick={() => onToggle(stateKey, !isEnabled)}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 ease-in-out shrink-0 ${isEnabled ? 'bg-[#8F7CFF]' : 'bg-slate-200'}`}
        >
          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ease-in-out ${isEnabled ? 'translate-x-6.5 left-0.5' : 'translate-x-0 left-0.5'}`} />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3 bg-white/40">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-black text-slate-800">Notification Preferences</h2>
          <p className="text-sm font-medium text-slate-500 mt-0.5">Control how you receive updates and alerts.</p>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-12">
        <div className="flex-1 flex flex-col divide-y divide-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Alert Types</h3>
          <ToggleRow label="Maintenance Updates" desc="Notices about repairs, water cuts, and power outages." stateKey="maintenanceUpdates" />
          <ToggleRow label="Visitor Notifications" desc="Alerts when a visitor arrives at the gate." stateKey="visitorNotifications" />
          <ToggleRow label="Complaint Updates" desc="Status changes to your submitted helpdesk tickets." stateKey="complaintUpdates" />
          <ToggleRow label="Payment Reminders" desc="Due date reminders for society maintenance bills." stateKey="paymentReminders" />
          <ToggleRow label="Event Notifications" desc="Invitations and reminders for society events." stateKey="eventNotifications" />
          <ToggleRow label="Emergency Alerts" desc="Critical security and emergency broadcasts." stateKey="emergencyAlerts" />
        </div>

        <div className="w-full md:w-72 flex flex-col divide-y divide-slate-100 bg-slate-50/50 p-6 rounded-2xl border border-slate-100 h-fit">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Delivery Methods</h3>
          <ToggleRow label="Email Notifications" desc="Receive alerts via email." stateKey="emailNotifications" />
          <ToggleRow label="SMS Notifications" desc="Receive SMS on your registered mobile." stateKey="smsNotifications" />
          <ToggleRow label="Push Notifications" desc="In-app browser push notifications." stateKey="pushNotifications" />
        </div>
      </div>
    </div>
  );
}
