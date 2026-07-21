import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionCard } from "../../components/ui/SectionCard";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { societyService } from "../../services/society.service";
import type { Building, Flat } from "../../services/society.service";
import { ArrowLeft, Building2, Users, FileText, Settings, Activity, ArrowRight, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function BuildingDetailsPage() {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [building, setBuilding] = useState<Building | null>(null);
  const [flats, setFlats] = useState<Flat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!buildingId) return;
    Promise.all([
      societyService.getBuildingById(buildingId),
      societyService.getFlats(buildingId)
    ]).then(([bData, fData]) => {
      setBuilding(bData);
      setFlats(fData);
      setIsLoading(false);
    });
  }, [buildingId]);

  if (isLoading) {
    return <div className="p-8 animate-pulse flex flex-col gap-6"><div className="h-20 bg-slate-100 rounded-2xl w-full" /><div className="h-64 bg-slate-100 rounded-2xl w-full" /></div>;
  }

  if (!building) {
    return <div className="p-8">Building not found</div>;
  }

  const occupancyRate = Math.round((building.occupiedFlats / building.totalFlats) * 100);

  return (
    <div className="w-full flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#8F7CFF] transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Buildings
      </button>

      <PageHeader 
        title={building.name}
        description={`Managed by ${building.managerName}`}
        icon={<Building2 className="w-6 h-6 text-[#8F7CFF]" />}
        actions={
          <>
            <ActionButton variant="outline" leftIcon={<Settings className="w-4 h-4" />}>Settings</ActionButton>
            <ActionButton variant="primary">Edit Building</ActionButton>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col - Overview */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6">Building Overview</h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Status</span>
                <StatusBadge variant={building.status === "Active" ? "success" : "warning"}>{building.status}</StatusBadge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Total Floors</span>
                <span className="text-sm font-bold text-slate-800">{building.floors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Total Flats</span>
                <span className="text-sm font-bold text-slate-800">{building.totalFlats}</span>
              </div>
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Occupancy Rate</span>
                  <span className="text-sm font-black text-[#72F1D1]">{occupancyRate}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${occupancyRate}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#72F1D1] to-[#3DD9FF] rounded-full"
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#FF5DA2]" /> Recent Activity
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#72F1D1]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Lift 1 Servicing Complete</p>
                  <p className="text-xs text-slate-500 mt-0.5">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#8F7CFF]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">New Tenant in Flat 402</p>
                  <p className="text-xs text-slate-500 mt-0.5">Yesterday</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 text-sm font-bold text-[#8F7CFF] hover:underline flex items-center justify-center gap-1">
              View All Activity <ArrowRight className="w-4 h-4" />
            </button>
          </SectionCard>
        </div>

        {/* Right Col - Flats Workspace */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SectionCard noPadding className="h-full flex flex-col min-h-[500px]">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Flats Directory</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Manage all {building.totalFlats} flats in {building.name}</p>
              </div>
              <ActionButton variant="secondary" size="sm" leftIcon={<Home className="w-4 h-4" />}>View All Flats</ActionButton>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {flats.map((flat, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={flat.id}
                    onClick={() => navigate(`/admin/flats/${flat.id}`)}
                    className="group flex flex-col p-4 rounded-2xl border border-slate-100 bg-white hover:border-[#72F1D1]/40 hover:shadow-[0_8px_30px_rgba(114,241,209,0.15)] transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${flat.status === 'Vacant' ? 'bg-slate-300' : (flat.status === 'Rented' ? 'bg-[#8F7CFF]' : 'bg-[#72F1D1]')}`} />
                    <span className="text-2xl font-heading font-black text-slate-800 group-hover:text-[#72F1D1] transition-colors">{flat.number}</span>
                    <span className="text-xs font-bold text-slate-400 mt-1">{flat.type}</span>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${flat.status === 'Vacant' ? 'bg-slate-100 text-slate-500' : 'bg-[#72F1D1]/10 text-emerald-700'}`}>
                        {flat.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
