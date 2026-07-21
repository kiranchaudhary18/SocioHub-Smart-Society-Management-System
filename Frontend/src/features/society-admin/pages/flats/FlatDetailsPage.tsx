import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionCard } from "../../components/ui/SectionCard";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { societyService } from "../../services/society.service";
import type { Flat, Building } from "../../services/society.service";
import { ArrowLeft, Home, User, Users, Car, FileText, AlertTriangle, Wallet, CheckCircle2, Plus } from "lucide-react";

export default function FlatDetailsPage() {
  const { flatId } = useParams();
  const navigate = useNavigate();
  const [flat, setFlat] = useState<Flat | null>(null);
  const [building, setBuilding] = useState<Building | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!flatId) return;
    societyService.getFlatById(flatId).then(fData => {
      setFlat(fData);
      if (fData) {
        societyService.getBuildingById(fData.buildingId).then(bData => {
          setBuilding(bData);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, [flatId]);

  if (isLoading) {
    return <div className="p-8 animate-pulse flex flex-col gap-6"><div className="h-20 bg-slate-100 rounded-2xl w-full" /><div className="h-64 bg-slate-100 rounded-2xl w-full" /></div>;
  }

  if (!flat || !building) {
    return <div className="p-8">Flat not found</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#3DD9FF] transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Flats
      </button>

      <PageHeader 
        title={`Flat ${flat.number}`}
        description={`${building.name} • ${flat.type} • Floor ${flat.floor}`}
        icon={<Home className="w-6 h-6 text-[#3DD9FF]" />}
        actions={
          <>
            <ActionButton variant="outline" leftIcon={<FileText className="w-4 h-4" />}>Documents</ActionButton>
            <ActionButton variant="primary">Edit Details</ActionButton>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: People & Overview */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <SectionCard>
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] rounded-[24px] p-0.5 shadow-lg mb-4">
                <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                  <span className="text-3xl font-heading font-black text-slate-800 tracking-tight">{flat.number}</span>
                </div>
              </div>
              <StatusBadge 
                variant={flat.status === 'Vacant' ? 'neutral' : (flat.status === 'Rented' ? 'info' : 'success')}
                className="mb-2"
              >
                {flat.status}
              </StatusBadge>
              <h3 className="text-lg font-bold text-slate-800">{flat.status === "Rented" ? flat.tenantName : (flat.ownerName || "Vacant")}</h3>
              <p className="text-sm text-slate-500 font-medium">{flat.status === "Rented" ? "Current Tenant" : "Owner"}</p>
            </div>

            <div className="py-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 flex items-center gap-2"><User className="w-4 h-4" /> Owner</span>
                <span className="text-sm font-bold text-slate-800">{flat.ownerName || "Not Assigned"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 flex items-center gap-2"><Users className="w-4 h-4" /> Family Members</span>
                <span className="text-sm font-bold text-slate-800">{flat.status === "Vacant" ? "0" : "4"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 flex items-center gap-2"><Car className="w-4 h-4" /> Parking Slots</span>
                <span className="text-sm font-bold text-slate-800">{flat.hasParking ? "1 Allotted" : "None"}</span>
              </div>
            </div>

            <ActionButton variant="secondary" className="w-full" size="sm">View Full Profile</ActionButton>
          </SectionCard>

          {flat.maintenanceDues > 0 && (
            <SectionCard className="bg-gradient-to-br from-[#FF7A7A]/10 to-[#FF5DA2]/10 border-[#FF7A7A]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 text-[#FF7A7A] shadow-sm">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-800">Maintenance Due</h4>
                  <span className="text-2xl font-heading font-black text-slate-800 mt-1 tracking-tight">₹{flat.maintenanceDues.toLocaleString()}</span>
                  <p className="text-sm text-slate-500 font-medium mt-1">Due since last month</p>
                  <ActionButton variant="danger" size="sm" className="mt-4 w-fit">Send Reminder</ActionButton>
                </div>
              </div>
            </SectionCard>
          )}
        </div>

        {/* Right Column: Workspaces */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SectionCard noPadding>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Financial Overview</h3>
              <button className="text-sm font-bold text-[#8F7CFF] hover:underline">View Invoices</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#72F1D1]/20 flex items-center justify-center text-emerald-700">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Paid (YTD)</p>
                  <p className="text-xl font-bold text-slate-800 tracking-tight">₹25,000</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3DD9FF]/20 flex items-center justify-center text-sky-700">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Last Payment</p>
                  <p className="text-xl font-bold text-slate-800 tracking-tight">Jul 05, 2026</p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard noPadding className="flex-1">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Recent Activity & Logs</h3>
              <ActionButton variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Log</ActionButton>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {[
                { title: "Maintenance Paid", date: "Jul 05, 2026", type: "success" as const, desc: "₹2500 received via UPI." },
                { title: "Complaint Raised", date: "Jun 20, 2026", type: "warning" as const, desc: "Water leakage in washroom. (Resolved)" },
                { title: "Visitor Passed", date: "Jun 15, 2026", type: "info" as const, desc: "Swiggy Delivery (Entry: 14:30, Exit: 14:45)" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                    {i !== 2 && <div className="w-px h-12 bg-slate-200 my-1" />}
                  </div>
                  <div className="flex-1 flex flex-col pb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-sm">{log.title}</span>
                      <span className="text-xs font-medium text-slate-400">{log.date}</span>
                    </div>
                    <span className="text-sm text-slate-500 mt-1">{log.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

      </div>
    </div>
  );
}
