import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Resident } from "../../services/resident.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { residentService } from "../../services/resident.service";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  ArrowLeft, Phone, Mail, Building2, 
  Car, Users, ShieldAlert, History, Edit2, 
  Download, FileText, Ban 
} from "lucide-react";
export default function ResidentDetailsPage() {
  const { residentId } = useParams<{ residentId: string }>();
  const [resident, setResident] = useState<Resident | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (residentId) {
      residentService.getResident(residentId).then(data => {
        if (data) setResident(data);
        setIsLoading(false);
      });
    }
  }, [residentId]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 animate-pulse">
        <div className="h-64 bg-slate-100 rounded-[32px] w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-96 bg-slate-100 rounded-[32px] lg:col-span-2" />
          <div className="h-96 bg-slate-100 rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Resident Not Found</h2>
        <Link to="/admin/residents" className="mt-4 text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Residents
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/admin/residents" className="flex items-center gap-2 text-slate-500 hover:text-[#8F7CFF] transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white">
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>
        <div className="flex items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Edit2 className="w-4 h-4" />}>Edit Profile</ActionButton>
          <ActionButton variant="primary" leftIcon={<Download className="w-4 h-4" />}>Download PDF</ActionButton>
        </div>
      </div>

      {/* Hero Profile Card */}
      <SectionCard className="relative overflow-hidden bg-white/60 p-0 border-none shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className={`absolute top-0 inset-x-0 h-32 ${resident.type === 'OWNER' ? 'bg-gradient-to-br from-[#3DD9FF]/30 to-[#8F7CFF]/10' : 'bg-gradient-to-br from-[#8F7CFF]/30 to-[#FF5DA2]/10'}`} />
        
        <div className="relative z-10 px-8 pb-8 pt-20 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 text-center md:text-left">
          <div className="relative">
            <img src={resident.avatar || `https://ui-avatars.com/api/?name=${resident.firstName}+${resident.lastName}&background=f1f5f9&color=64748b`} alt={resident.firstName} className="w-32 h-32 rounded-3xl shadow-xl ring-8 ring-white object-cover bg-white" />
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${resident.status === 'ACTIVE' ? 'bg-[#72F1D1]' : 'bg-slate-300'}`} />
          </div>
          
          <div className="flex flex-col flex-1 pb-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-tight">
                {resident.firstName} {resident.lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <StatusBadge variant={resident.type === 'OWNER' ? 'info' : 'success'}>{resident.type}</StatusBadge>
                <StatusBadge variant={resident.status === 'ACTIVE' ? 'success' : 'neutral'}>{resident.status}</StatusBadge>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm text-slate-700 font-bold">
                <Building2 className="w-4 h-4 text-[#8F7CFF]" />
                {resident.building} - Flat {resident.flat}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-slate-400" />
                {resident.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                {resident.email}
              </span>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#8F7CFF]" /> Family Members
            </h3>
            {resident.familyMembersCount > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Relation</th>
                      <th className="pb-3">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50 last:border-0">
                      <td className="py-3 font-bold text-slate-700">Neha Reddy</td>
                      <td className="py-3 text-sm text-slate-500">Wife</td>
                      <td className="py-3 text-sm font-medium text-slate-600">+91 98765 43211</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="w-full p-6 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <span className="text-sm font-bold text-slate-400">No family members registered.</span>
              </div>
            )}
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Car className="w-5 h-5 text-[#FFD166]" /> Registered Vehicles
            </h3>
            {resident.vehiclesCount > 0 ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                      <Car className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">Honda City</span>
                      <span className="text-xs font-bold text-slate-400">4 Wheeler</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 font-black text-sm tracking-wider rounded-lg border border-slate-200">MH 01 AB 1234</span>
                </div>
              </div>
            ) : (
              <div className="w-full p-6 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <span className="text-sm font-bold text-slate-400">No vehicles registered.</span>
              </div>
            )}
          </SectionCard>

        </div>

        {/* Right Column - Sidebar Details */}
        <div className="flex flex-col gap-6">
          
          <SectionCard className="bg-gradient-to-br from-white to-[#FF7A7A]/5 border-[#FF7A7A]/20">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#FF7A7A]" /> Emergency Contact
            </h3>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-slate-700 text-lg">{resident.emergencyContact.name}</span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{resident.emergencyContact.relation}</span>
                <span className="text-sm font-bold text-[#FF7A7A] bg-[#FF7A7A]/10 px-2 py-1 rounded-md">{resident.emergencyContact.phone}</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#3DD9FF]" /> Documents
            </h3>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-[#3DD9FF]/40 hover:bg-[#3DD9FF]/5 transition-all group">
                <span className="text-sm font-bold text-slate-600 group-hover:text-[#3DD9FF]">Aadhar_Card.pdf</span>
                <Download className="w-4 h-4 text-slate-300 group-hover:text-[#3DD9FF]" />
              </button>
              <button className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-[#3DD9FF]/40 hover:bg-[#3DD9FF]/5 transition-all group">
                <span className="text-sm font-bold text-slate-600 group-hover:text-[#3DD9FF]">Sale_Deed.pdf</span>
                <Download className="w-4 h-4 text-slate-300 group-hover:text-[#3DD9FF]" />
              </button>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-transparent hover:border-slate-100">
                <History className="w-4 h-4 text-[#8F7CFF]" /> View Activity History
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#FF7A7A]/10 text-red-600 font-bold text-sm transition-colors border border-transparent hover:border-[#FF7A7A]/20">
                <Ban className="w-4 h-4 text-[#FF7A7A]" /> Deactivate Resident
              </button>
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}
