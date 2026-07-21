import { useState, useEffect } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { societyService } from "../../services/society.service";
import type { Flat, Building } from "../../services/society.service";
import { Search, Plus, ListFilter, Grid, Home, Car, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function FlatsPage() {
  const navigate = useNavigate();
  const [flats, setFlats] = useState<Flat[]>([]);
  const [buildings, setBuildings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("All");

  useEffect(() => {
    Promise.all([
      societyService.getFlats(),
      societyService.getBuildings()
    ]).then(([fData, bData]) => {
      setFlats(fData);
      
      const bMap: Record<string, string> = {};
      bData.forEach(b => { bMap[b.id] = b.name; });
      setBuildings(bMap);
      
      setIsLoading(false);
    });
  }, []);

  const filteredFlats = flats.filter(flat => {
    if (statusFilter !== "All" && flat.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <PageHeader 
        title="Flats Directory"
        description="Manage all residential units and occupancy."
        icon={<Grid className="w-6 h-6 text-[#3DD9FF]" />}
        actions={
          <ActionButton leftIcon={<Plus className="w-4 h-4" />}>
            Add Flat
          </ActionButton>
        }
      />

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white/60 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-sm">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by flat number..." 
            className="w-full h-10 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#72F1D1]/50 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
          {["All", "Occupied", "Vacant", "Rented"].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                statusFilter === status 
                  ? "bg-slate-800 text-white shadow-md" 
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
          <div className="w-px h-6 bg-slate-200 mx-2" />
          <ActionButton variant="secondary" size="sm" leftIcon={<ListFilter className="w-4 h-4" />}>
            More Filters
          </ActionButton>
        </div>
      </div>

      {/* Flats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredFlats.map((flat, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={flat.id}
                onClick={() => navigate(`/admin/flats/${flat.id}`)}
                className="group flex flex-col p-5 rounded-[24px] border border-slate-200/60 bg-white/60 backdrop-blur-sm hover:border-[#72F1D1]/50 hover:bg-white hover:shadow-[0_12px_40px_rgba(114,241,209,0.15)] transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Accent Top Border */}
                <div className={`absolute top-0 left-0 w-full h-1.5 ${
                  flat.status === 'Vacant' ? 'bg-slate-300' : 
                  (flat.status === 'Rented' ? 'bg-[#8F7CFF]' : 'bg-[#72F1D1]')
                }`} />

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-2xl font-heading font-black text-slate-800 group-hover:text-[#72F1D1] transition-colors tracking-tight">{flat.number}</span>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">{buildings[flat.buildingId]} • {flat.type}</p>
                  </div>
                  <StatusBadge 
                    variant={flat.status === 'Vacant' ? 'neutral' : (flat.status === 'Rented' ? 'info' : 'success')}
                  >
                    {flat.status}
                  </StatusBadge>
                </div>

                <div className="flex-1 flex flex-col justify-end gap-3 pt-4 mt-2 border-t border-slate-100">
                  {flat.status !== 'Vacant' ? (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{flat.status === 'Rented' ? 'Tenant' : 'Owner'}</span>
                      <span className="text-sm font-bold text-slate-700 truncate">{flat.status === 'Rented' ? flat.tenantName : flat.ownerName}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Home className="w-4 h-4" />
                      <span className="text-sm font-medium">Ready to move</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-1">
                    {flat.hasParking && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500" title="Has Parking">
                        <Car className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">YES</span>
                      </div>
                    )}
                    {flat.maintenanceDues > 0 && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FF7A7A]/10 text-red-600 border border-[#FF7A7A]/20" title="Maintenance Due">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">DUE</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
