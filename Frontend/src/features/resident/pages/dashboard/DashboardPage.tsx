import { useQuery } from "@tanstack/react-query";
import { residentDashboardService } from "../../services/dashboard.service";
import { DashboardHeader } from "./components/DashboardHeader";
import { WelcomeHero } from "./components/WelcomeHero";
import { KPICards } from "./components/KPICards";
import { PaymentWidgets } from "./components/PaymentWidgets";
import { ActivityWidgets } from "./components/ActivityWidgets";
import { CommunityWidgets } from "./components/CommunityWidgets";
import { InformationPanel } from "./components/InformationPanel";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  
  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ['residentDashboardSummary'],
    queryFn: () => residentDashboardService.getDashboardSummary()
  });

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load dashboard</h2>
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
      <DashboardHeader />
      
      <WelcomeHero profile={summary.profile} />
      
      <KPICards kpis={summary.kpis} />
      
      <div className="w-full h-px bg-slate-200/60 my-2" />
      
      {/* Main Grid Layout for Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column (Main Content) - 8/12 on XL */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <PaymentWidgets 
            recentPayments={summary.recentPayments} 
            outstanding={summary.kpis.outstandingMaintenance} 
          />
          
          <ActivityWidgets 
            complaints={summary.activeComplaints}
            visitors={summary.todayVisitors}
            bookings={summary.upcomingBookings}
          />
          
          <CommunityWidgets 
            notices={summary.latestNotices}
            events={summary.upcomingEvents}
          />
        </div>
        
        {/* Right Column (Sidebar Content) - 4/12 on XL */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6">
            <InformationPanel />
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
