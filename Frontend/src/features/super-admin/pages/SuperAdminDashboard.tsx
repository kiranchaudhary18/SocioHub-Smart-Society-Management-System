import { WelcomeSection } from "../components/widgets/WelcomeSection";
import { QuickActions } from "../components/widgets/QuickActions";
import { KPICards } from "../components/widgets/KPICards";
import { AnalyticsSection } from "../components/widgets/AnalyticsSection";
import { RecentActivity } from "../components/widgets/RecentActivity";
import { PendingApprovals } from "../components/widgets/PendingApprovals";
import { PlatformStatus } from "../components/widgets/PlatformStatus";
import { HighlightsPanel } from "../components/widgets/HighlightsPanel";

export default function SuperAdminDashboard() {
  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8">
      <WelcomeSection />
      <QuickActions />
      <KPICards />
      <AnalyticsSection />
      
      {/* 
        Bottom Section Layout 
        Left side takes 2/3 space, Right side takes 1/3 space on large screens
      */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Approvals) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <PendingApprovals />
        </div>
        
        {/* Right Column (Activity, Status, Highlights) */}
        <div className="flex flex-col gap-6">
          <HighlightsPanel />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
            <PlatformStatus />
            <RecentActivity />
          </div>
        </div>

      </div>
    </div>
  );
}
