import { useState, useEffect } from "react";
import { complaintService } from "../../services/complaint.service";
import type { Complaint, ComplaintStats } from "../../services/complaint.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { ComplaintKanbanView } from "./components/ComplaintKanbanView";
import { ComplaintTableView } from "./components/ComplaintTableView";
import { 
  AlertCircle, Columns, List, Plus, Download, Edit3, 
  Clock, CheckCircle2, TrendingUp, Search, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComplaintsPage() {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState<ComplaintStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [complaintsData, statsData] = await Promise.all([
        complaintService.getComplaints(),
        complaintService.getStats()
      ]);
      setComplaints(complaintsData);
      setStats(statsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredComplaints = complaints.filter(c => 
    `${c.title} ${c.residentName} ${c.flat} ${c.id}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Complaint Management</h1>
          <p className="text-slate-500 font-medium mt-1">Track, assign and resolve society complaints efficiently.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Edit3 className="w-4 h-4" />}>Bulk Update</ActionButton>
          <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</ActionButton>
          <ActionButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Register Complaint</ActionButton>
        </div>
      </div>

      {/* Overview Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Open Complaints" value={stats.openComplaints} icon={<AlertCircle className="w-5 h-5 text-[#FF7A7A]" />} delay={0.1} />
          <StatCard title="Assigned" value={stats.assigned} icon={<Clock className="w-5 h-5 text-[#FFD166]" />} delay={0.15} />
          <StatCard title="In Progress" value={stats.inProgress} icon={<TrendingUp className="w-5 h-5 text-[#3DD9FF]" />} delay={0.2} />
          <StatCard title="Resolved" value={stats.resolved} icon={<CheckCircle2 className="w-5 h-5 text-[#72F1D1]" />} delay={0.25} trend={{ value: 12, isPositive: true }} />
          <StatCard title="High Priority" value={stats.highPriority} icon={<AlertCircle className="w-5 h-5 text-[#8F7CFF]" />} delay={0.3} />
          <StatCard title="Avg Resolution" value={`${stats.avgResolutionHours}h`} icon={<Clock className="w-5 h-5 text-slate-400" />} delay={0.35} />
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2 relative z-20">
        
        {/* Search */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by ID, title, resident or flat..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 w-full md:w-auto px-2">
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="w-px h-8 bg-slate-200 hidden md:block mx-2" />

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-[16px]">
            <button 
              onClick={() => setView('kanban')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'kanban' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Kanban View"
            >
              <Columns className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('table')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'table' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Table View"
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
          {view === 'kanban' ? (
            <ComplaintKanbanView complaints={filteredComplaints} isLoading={isLoading} />
          ) : (
            <ComplaintTableView complaints={filteredComplaints} isLoading={isLoading} />
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
