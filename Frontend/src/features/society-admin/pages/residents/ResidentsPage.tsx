import { useState, useEffect } from "react";
import type { Resident } from "../../services/resident.service";
import { residentService } from "../../services/resident.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { ResidentCardView } from "./components/ResidentCardView";
import { ResidentTableView } from "./components/ResidentTableView";
import { 
  Users, Building2, UserSquare2, ClipboardCheck, 
  Search, Filter, 
  LayoutGrid, List, Plus, Download, Upload 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResidentsPage() {
  const [view, setView] = useState<'card' | 'table'>('card');
  const [residents, setResidents] = useState<Resident[]>([]);
  const [kpis, setKpis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [resData, kpiData] = await Promise.all([
        residentService.getResidents(),
        residentService.getResidentKPIs()
      ]);
      setResidents(resData.data);
      setKpis(kpiData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredResidents = residents.filter(r => 
    `${r.firstName} ${r.lastName} ${r.flat} ${r.building}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Residents</h1>
          <p className="text-slate-500 font-medium mt-1">Manage all residents, owners and tenants living in the society.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Upload className="w-4 h-4" />}>Import</ActionButton>
          <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</ActionButton>
          <ActionButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Add Resident</ActionButton>
        </div>
      </div>

      {/* KPI Cards */}
      {kpis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Residents" value={kpis.total} icon={<Users className="w-5 h-5 text-[#8F7CFF]" />} delay={0.1} />
          <StatCard title="Owners" value={kpis.owners} icon={<Building2 className="w-5 h-5 text-[#3DD9FF]" />} delay={0.2} />
          <StatCard title="Tenants" value={kpis.tenants} icon={<UserSquare2 className="w-5 h-5 text-[#FFD166]" />} delay={0.3} />
          <StatCard title="Pending Approvals" value={kpis.pendingApprovals} icon={<ClipboardCheck className="w-5 h-5 text-[#FF7A7A]" />} delay={0.4} trend={{ value: 2, isPositive: false }} />
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2 relative z-20">
        
        {/* Search */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by name, flat, or building..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto px-2">
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="w-px h-8 bg-slate-200 hidden md:block mx-2" />

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-[16px]">
            <button 
              onClick={() => setView('card')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'card' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('table')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'table' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'card' ? (
            <ResidentCardView residents={filteredResidents} isLoading={isLoading} />
          ) : (
            <ResidentTableView residents={filteredResidents} isLoading={isLoading} />
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
