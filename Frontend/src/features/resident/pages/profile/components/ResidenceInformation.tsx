import { Home, Key, Users, Calendar, Info, Building2, MapPin } from "lucide-react";
import type { ResidenceInfo } from "../../../services/profile.service";

interface Props {
  residence: ResidenceInfo;
}

export function ResidenceInformation({ residence }: Props) {
  const DataCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start gap-4 hover:border-slate-200 transition-colors">
      <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-${color}-500 shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-bold text-slate-800 mt-1">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-black text-slate-800">Residence Information</h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Verified society records.</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold">
          <Info className="w-4 h-4" /> Non-editable
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DataCard label="Society Name" value={residence.societyName} icon={Building2} color="indigo" />
        <DataCard label="Building & Wing" value={`${residence.building}, Wing ${residence.wing}`} icon={MapPin} color="rose" />
        <DataCard label="Flat Details" value={`Flat ${residence.flatNumber} (${residence.floor} Floor)`} icon={Home} color="blue" />
        <DataCard label="Ownership Status" value={residence.ownershipStatus} icon={Key} color="amber" />
        <DataCard label="Move-in Date" value={new Date(residence.moveInDate).toLocaleDateString()} icon={Calendar} color="emerald" />
        <DataCard label="Family Members" value={`${residence.familyMembersCount} Members Registered`} icon={Users} color="purple" />
      </div>
    </div>
  );
}
