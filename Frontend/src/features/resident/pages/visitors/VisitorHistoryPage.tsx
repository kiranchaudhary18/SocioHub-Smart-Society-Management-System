import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { visitorService, type VisitorHistoryRecord } from "../../services/visitor.service";
import { HistoryOverviewKPIs } from "./components/history/HistoryOverviewKPIs";
import { HistoryToolbar } from "./components/history/HistoryToolbar";
import { HistoryTable } from "./components/history/HistoryTable";
import { HistoryDetailsDrawer } from "./components/history/HistoryDetailsDrawer";
import { HistoryRightPanel } from "./components/history/HistoryRightPanel";
import { Loader2 } from "lucide-react";

export default function VisitorHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  
  const [selectedRecord, setSelectedRecord] = useState<VisitorHistoryRecord | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['visitorHistoryData'],
    queryFn: async () => {
      const [kpis, history] = await Promise.all([
        visitorService.getVisitorHistoryKPIs(),
        visitorService.getVisitorHistory()
      ]);
      return { kpis, history };
    }
  });

  const filteredHistory = useMemo(() => {
    if (!data?.history) return [];
    return data.history.filter(record => {
      // Search
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = record.visitorName.toLowerCase().includes(searchLower) || 
                            (record.vehicleNumber?.toLowerCase().includes(searchLower) ?? false);
      
      // Type
      const matchesType = typeFilter === "ALL" || record.type === typeFilter;

      // Status
      const matchesStatus = statusFilter === "ALL" || record.status === statusFilter;

      // Date (Simplified mock filter for demonstration)
      let matchesDate = true;
      const today = new Date().toISOString().split("T")[0];
      if (dateFilter === "TODAY") {
        matchesDate = record.visitDate === today;
      }

      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });
  }, [data?.history, searchTerm, typeFilter, statusFilter, dateFilter]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
    setDateFilter("ALL");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading visitor history...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load visitor history</h2>
        <p className="text-sm text-slate-500 max-w-md">There was a problem connecting to the server. Please check your connection and try again.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Visitor History</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">View comprehensive security logs of all previous visitors to your flat.</p>
      </div>

      <HistoryOverviewKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          <HistoryToolbar 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            typeFilter={typeFilter} setTypeFilter={setTypeFilter}
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            dateFilter={dateFilter} setDateFilter={setDateFilter}
            onReset={handleResetFilters}
          />
          <HistoryTable 
            records={filteredHistory} 
            onViewDetails={(record) => setSelectedRecord(record)} 
          />
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-3 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <HistoryRightPanel />
          </div>
        </div>

      </div>

      <HistoryDetailsDrawer 
        record={selectedRecord} 
        isOpen={!!selectedRecord} 
        onClose={() => setSelectedRecord(null)} 
      />

    </div>
  );
}
