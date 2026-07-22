import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { visitorService, type VisitorPass } from "../../services/visitor.service";
import { VisitorPassesKPIs } from "./components/passes/VisitorPassesKPIs";
import { GeneratePassForm } from "./components/passes/GeneratePassForm";
import { UpcomingVisitors } from "./components/passes/UpcomingVisitors";
import { RecentPassesTable } from "./components/passes/RecentPassesTable";
import { PassDetailsDrawer } from "./components/passes/PassDetailsDrawer";
import { VisitorGuidelines } from "./components/passes/VisitorGuidelines";
import { Loader2 } from "lucide-react";

export default function VisitorPassesPage() {
  const [selectedPass, setSelectedPass] = useState<VisitorPass | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['visitorPassesData'],
    queryFn: async () => {
      const [kpis, upcoming, recent] = await Promise.all([
        visitorService.getVisitorPassesKPIs(),
        visitorService.getUpcomingVisitors(),
        visitorService.getRecentPasses()
      ]);
      return { kpis, upcoming, recent };
    }
  });

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading passes data...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load visitor data</h2>
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
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Visitor Passes</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Create visitor passes and invite guests to your residence.</p>
      </div>

      <VisitorPassesKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <GeneratePassForm />
          <RecentPassesTable 
            passes={data.recent} 
            onView={(pass) => setSelectedPass(pass)} 
          />
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <UpcomingVisitors visitors={data.upcoming} />
          <VisitorGuidelines />
        </div>

      </div>

      <PassDetailsDrawer 
        pass={selectedPass} 
        isOpen={!!selectedPass} 
        onClose={() => setSelectedPass(null)} 
      />

    </div>
  );
}
