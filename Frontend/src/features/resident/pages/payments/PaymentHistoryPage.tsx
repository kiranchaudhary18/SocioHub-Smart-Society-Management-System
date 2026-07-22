import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { paymentService, type PaymentTransaction } from "../../services/payment.service";
import { HistoryKPIs } from "./components/history/HistoryKPIs";
import { HistoryToolbar } from "./components/history/HistoryToolbar";
import { PaymentHistoryTable } from "./components/history/PaymentHistoryTable";
import { TransactionDetailsDrawer } from "./components/history/TransactionDetailsDrawer";
import { HistoryRightPanel } from "./components/history/HistoryRightPanel";
import { ActivityTimeline } from "./components/history/ActivityTimeline";
import { Loader2 } from "lucide-react";

export default function PaymentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedTx, setSelectedTx] = useState<PaymentTransaction | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['paymentHistoryData'],
    queryFn: async () => {
      const [kpis, history] = await Promise.all([
        paymentService.getHistoryKPIs(),
        paymentService.getPaymentHistory()
      ]);
      return { kpis, history };
    }
  });

  const filteredHistory = useMemo(() => {
    if (!data?.history) return [];
    return data.history.filter(tx => {
      // Search
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = tx.transactionId.toLowerCase().includes(searchLower) || 
                            (tx.receiptNumber?.toLowerCase().includes(searchLower) ?? false);
      
      // Type
      const matchesType = typeFilter === "ALL" || tx.paymentType === typeFilter;

      // Status
      const matchesStatus = statusFilter === "ALL" || tx.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [data?.history, searchTerm, typeFilter, statusFilter]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading transaction history...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load history</h2>
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
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Payment History</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Review all completed and pending payment transactions.</p>
      </div>

      <HistoryKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <HistoryToolbar 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            typeFilter={typeFilter} setTypeFilter={setTypeFilter}
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            onReset={handleResetFilters}
          />
          <PaymentHistoryTable 
            transactions={filteredHistory} 
            onViewDetails={setSelectedTx} 
          />
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <HistoryRightPanel />
            <ActivityTimeline />
          </div>
        </div>

      </div>

      <TransactionDetailsDrawer 
        transaction={selectedTx} 
        isOpen={!!selectedTx} 
        onClose={() => setSelectedTx(null)} 
      />

    </div>
  );
}
