import { useState, useEffect } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionCard } from "../../components/ui/SectionCard";
import { ActionButton } from "../../components/ui/ActionButton";
import { GridListToggle } from "../../components/ui/GridListToggle";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { societyService } from "../../services/society.service";
import type { Building } from "../../services/society.service";
import { Building2, Search, Plus, ListFilter, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function BuildingsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    societyService.getBuildings().then(data => {
      setBuildings(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <PageHeader 
        title="Buildings"
        description="Manage all towers and buildings in the society."
        icon={<Building2 className="w-6 h-6 text-[#8F7CFF]" />}
        actions={
          <ActionButton leftIcon={<Plus className="w-4 h-4" />}>
            Add Building
          </ActionButton>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search buildings..." 
            className="w-full h-11 bg-white/60 backdrop-blur-xl border border-slate-200 rounded-2xl pl-10 pr-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#72F1D1]/10 focus:border-[#72F1D1]/40 transition-all placeholder:text-slate-400"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <ActionButton variant="secondary" leftIcon={<ListFilter className="w-4 h-4" />}>
            Filters
          </ActionButton>
          <GridListToggle view={view} onChange={setView} />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-100 rounded-[24px] animate-pulse" />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout 
            className={view === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
            }
          >
            {buildings.map((building, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={building.id}
              >
                <Link to={`/admin/buildings/${building.id}`}>
                  <SectionCard 
                    noPadding 
                    className="hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 cursor-pointer transition-all h-full"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8F7CFF]/10 to-[#3DD9FF]/10 flex items-center justify-center border border-[#8F7CFF]/20">
                          <Building2 className="w-6 h-6 text-[#8F7CFF]" />
                        </div>
                        <StatusBadge variant={building.status === "Active" ? "success" : "warning"}>
                          {building.status}
                        </StatusBadge>
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-1">{building.name}</h3>
                      <p className="text-sm font-medium text-slate-500 mb-6 flex items-center gap-1.5">
                        <Users className="w-4 h-4" /> Manager: {building.managerName}
                      </p>

                      <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-slate-400 uppercase">Floors</span>
                          <span className="text-lg font-black text-slate-700">{building.floors}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase">Occupancy</span>
                            <span className="text-xs font-bold text-slate-700">{building.occupiedFlats}/{building.totalFlats}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#72F1D1] to-[#3DD9FF] rounded-full"
                              style={{ width: `${(building.occupiedFlats / building.totalFlats) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
