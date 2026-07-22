import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { paymentService, type UtilityBill } from "../../services/payment.service";
import { UtilityKPIs } from "./components/utility/UtilityKPIs";
import { UtilityUsageCards } from "./components/utility/UtilityUsageCards";
import { UtilityBillsTable } from "./components/utility/UtilityBillsTable";
import { UtilityDetailsDrawer } from "./components/utility/UtilityDetailsDrawer";
import { UtilityAnalyticsCharts } from "./components/utility/UtilityAnalyticsCharts";
import { Loader2 } from "lucide-react";

export default function UtilityBillsPage() {
  const [selectedBill, setSelectedBill] = useState<UtilityBill | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['utilityBillsData'],
    queryFn: async () => {
      const [kpis, bills] = await Promise.all([
        paymentService.getUtilityKPIs(),
        paymentService.getUtilityBills()
      ]);
      return { kpis, bills };
    }
  });

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading utility data...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load bills</h2>
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
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Utility Bills</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Track all utility charges and consumption associated with your residence.</p>
      </div>

      <UtilityKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <UtilityUsageCards />
          <UtilityBillsTable 
            bills={data.bills} 
            onViewDetails={setSelectedBill} 
          />
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <UtilityAnalyticsCharts />
        </div>

      </div>

      <UtilityDetailsDrawer 
        bill={selectedBill} 
        isOpen={!!selectedBill} 
        onClose={() => setSelectedBill(null)} 
      />

    </div>
  );
}
